import { useCallback, useMemo, useState } from 'react';
import {
  Avatar,
  Stack,
  Typography,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  ListItemDecorator,
  ListItemContent,
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

const substances = [
  { id: 'pfna',   name: 'pfna name' },
  { id: 'pfds',   name: 'pfds name' },
  { id: 'pfhxa',  name: 'pfhxa name' },
  { id: 'pfoa',   name: 'pfoa name' },
  { id: 'pfos',   name: 'pfos name' },
  { id: 'pfba',   name: 'pfba name' },
  { id: 'pfdoa',  name: 'pfdoa name' },
  { id: 'pfpea',  name: 'pfpea name' },
  { id: 'pfhps',  name: 'pfhps name' },
  { id: 'pfunda', name: 'pfunda name' },
  { id: 'pfbs',   name: 'pfbs name' },
  { id: 'pfpes',  name: 'pfpes name' },
  { id: 'pfns',   name: 'pfns name' },
  { id: 'pfhpa',  name: 'pfhpa name' },
  { id: 'pfhxs',  name: 'pfhxs name' },
  { id: 'pfda',   name: 'pfda name' },
  { id: 'pfuda',  name: 'pfuda name' },
]

const substanceIds = substances.map(s => s.id)

const media = [
  { id: 'dust',    name: 'Dust',      icon: <DustIcon /> },
  { id: 'water',   name: 'Water',     icon: <WaterIcon /> },
  { id: 'blood',   name: 'Blood',     icon: <BloodIcon /> },
]

const emptySubstanceBuckets = substanceIds
  .reduce((acc, id) => {
    acc[id] = 0;
    return acc;
  }, {});

const detectedSubstances = sample => {
  return substanceIds.reduce((acc, substanceId) => {
    if (sample[`${ substanceId }_concentration`] > 0) {
      acc.push(substanceId)
    }
    return acc
  }, [])
}

export const SubstancesByMediumCard = () => {
  const { preferences } = useAppContext()
  const [selectedMediumId, setSelectedMediumId] = useState('dust')
  const { pfasData } = useData();

  const selectedMedium = useMemo(() => {
    const index = media.findIndex(m => m.id === selectedMediumId)
    if (index === -1) {
      console.error(`could not find medium name for ${ selectedMediumId }`)
      return '?'
    }
    return media[index]
  }, [selectedMediumId])


  const chartData = useMemo(() => {
    const substanceBuckets = pfasData.data
      .reduce((acc, sample) => {
        if (sample.medium !== selectedMediumId) {
          return acc
        }
        detectedSubstances(sample).forEach(substanceId => {
          acc[substanceId] += 1
        })
        return acc
    }, { ...emptySubstanceBuckets })

    return Object.keys(substanceBuckets).map(substanceId => ({
      id: substanceId,
      value: substanceBuckets[substanceId],
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
          sx={{ px: 1 }}
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
          <Typography level="h3">PFAS Chemicals in</Typography>
          <MediumSelect />
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
