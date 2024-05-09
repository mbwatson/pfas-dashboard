import { useCallback, useMemo, useState } from 'react';
import {
  Avatar,
  Dropdown,
  ListItemDecorator,
  ListItemContent,
  MenuButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/joy';
import {
  KeyboardArrowDown as ExpandIcon,
  BlurOn as DustIcon,
  Waves as WaterIcon,
  Bloodtype as BloodIcon,
} from '@mui/icons-material'
import { DashboardCard } from '@components/dashboard';
import { useAppContext, useData } from '@context';
import { ResponsivePie } from '@nivo/pie'

const media = [
  { id: 'dust',    name: 'Dust',      icon: <DustIcon /> },
  { id: 'water',   name: 'Water',     icon: <WaterIcon /> },
  { id: 'blood',   name: 'Blood',     icon: <BloodIcon /> },
]

export const ChemicalsByMediumCard = () => {
  const { preferences } = useAppContext()
  const [selectedMediumId, setSelectedMediumId] = useState('dust')
  const { chemicals, chemicalIds, pfasData } = useData();

  const selectedMedium = useMemo(() => {
    const index = media.findIndex(m => m.id === selectedMediumId)
    if (index === -1) {
      console.error(`could not find medium name for ${ selectedMediumId }`)
      return '?'
    }
    return media[index]
  }, [selectedMediumId])

  const emptySubstanceBuckets = chemicalIds
    .reduce((acc, id) => {
      acc[id] = 0;
      return acc;
    }, {});

  const detectedChemicals = sample => {
    return chemicalIds.reduce((acc, chemicalId) => {
      if (sample[`${ chemicalId }_concentration`] > 0) {
        acc.push(chemicalId)
      }
      return acc
    }, [])
  }

  const chartData = useMemo(() => {
    const chemicalBuckets = pfasData.data
      .reduce((acc, sample) => {
        if (sample.medium !== selectedMediumId) {
          return acc
        }
        detectedChemicals(sample).forEach(chemicalId => {
          acc[chemicalId] += 1
        })
        return acc
    }, { ...emptySubstanceBuckets })

    return Object.keys(chemicalBuckets).map(chemicalId => ({
      id: chemicalId,
      value: chemicalBuckets[chemicalId],
    }))
  }, [selectedMediumId, pfasData.data])

  const handleSelectMedium = mediumId => () => {
    setSelectedMediumId(mediumId)
  }

  const MediumSelect = useCallback(() => {
    return (
      <Dropdown>
        <MenuButton
          variant="soft"
          color="primary"
          endDecorator={ <ExpandIcon /> }
          sx={{ px: 1, mx: 1 }}
        >
          <Typography
            level="h3"
            color="primary.text"
          >{ selectedMedium.name }</Typography>
        </MenuButton>

        <Menu variant="soft">
          {
            media.map(({ icon, id, name }) => (
              <MenuItem
                key={ `option-${ id }` }
                onClick={ handleSelectMedium(id) }
                selected={ id === selectedMedium.id }
                color="neutral"
              >
                <ListItemDecorator>{ icon }</ListItemDecorator>
                <ListItemContent>
                  <Typography level="title-lg">{ name }</Typography>
                </ListItemContent>
              </MenuItem>
            ))
          }
        </Menu>
      </Dropdown>
    );
  }, [selectedMedium]);

  const pieStyle = useMemo(() => {
    if (preferences.colorMode.dark) {
      return {
        arcLinkLabelsColor: { from: 'color' },
        arcLinkLabelsTextColor: { from: 'color' },
      }
    }
    return {
      arcLinkLabelsColor: 'black',
      arcLinkLabelsTextColor: 'black',
    }
  }, [preferences.colorMode.current])

  return (
    <DashboardCard
      title={
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          gap={ 1 }
        >
          <Avatar variant="plain" color="primary">{ selectedMedium.icon }</Avatar>
          <Typography level="h3">
            <span>PFAS Chemicals in</span>
            <MediumSelect />
            <span>Samples</span>
          </Typography>
        </Stack>
      }
    >
      {
        chartData.length > 0 ? (
          <div style={{ minHeight: '500px' }}>
            <ResponsivePie
              height={ 500 }
              data={ chartData }
              margin={{ top: 40, right: 0, bottom: 40, left: 0 }}
              innerRadius={ 0.5 }
              padAngle={ 0.5 }
              { ...pieStyle }
            />
          </div>
        ) : 'Loading...'
      }
    </DashboardCard>
  )
}
