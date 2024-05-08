import { useCallback, useMemo, useState } from 'react';
import {
  CircularProgress,
  Grid,
  Option,
  Select,
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
} from '@mui/icons-material'
import { DashboardCard } from '@components/dashboard';
import { useData } from '@context';
import { ResponsivePie } from '@nivo/pie'

const substanceIds = [
  'pfna',
  'pfds',
  'pfhxa',
  'pfoa',
  'pfos',
  'pfba',
  'pfdoa',
  'pfpea',
  'pfhps',
  'pfunda',
  'pfbs',
  'pfpes',
  'pfns',
  'pfhpa',
  'pfhxs',
  'pfda',
  'pfuda',
]

const media = [
  {
    id: 'dust',
    name: 'Dust',
  },
  {
    id: 'water', 
    name: 'Water',
  },
  {
    id: 'blood',
    name: 'Blood',
  },
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

const SubstancesInSamplesCard = () => {
  const [selectedMediumId, setSelectedMediumId] = useState('dust')
  const { pfasData } = useData();

  const substanceBuckets = useMemo(() => pfasData.data
    .reduce((acc, sample) => {
      if (sample.medium !== selectedMediumId) {
        return acc
      }
      detectedSubstances(sample).forEach(substanceId => {
        acc[substanceId] += 1
      })
      return acc
  }, { ...emptySubstanceBuckets }), [pfasData.data, selectedMediumId])

  const chartData = useMemo(() => {
    if (!substanceBuckets) {
      return []
    }
    return Object.keys(substanceBuckets).map(substanceId => ({
      id: substanceId,
      value: substanceBuckets[substanceId],
    }))
  }, [substanceBuckets])

  const handleSelectMedium = mediumId => () => {
    setSelectedMediumId(mediumId)
  }

  const selectedMediumName = useMemo(() => {
    const index = media.findIndex(m => m.id === selectedMediumId)
    if (index === -1) {
      console.error(`could not find medium name for ${ selectedMediumId }`)
      return '?'
    }
    return media[index].name
  }, [selectedMediumId])

  const MediumMenu = useCallback(() => {
    return (
      <Dropdown>
        <MenuButton
          variant="outlined"
          color="neutral"
          endDecorator={ <ExpandIcon /> }
        >
          <Typography level="title-lg">{ selectedMediumName }</Typography>
        </MenuButton>

        <Menu>
          {
            media.map(({ id, name }) => (
              <MenuItem
                key={ `option-${ id }` }
                onClick={ handleSelectMedium(id) }
                selected={ id === selectedMediumId }
              >
                <ListItemContent>
                  <Typography level="title-lg">{ name }</Typography>
                </ListItemContent>
              </MenuItem>
            ))
          }
        </Menu>
      </Dropdown>
    );
  }, [selectedMediumId]);

  if (!Object.keys(substanceBuckets).length === 0) {
    return null
  }

  return (
    <DashboardCard title={
      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={ 2 }>
        <Typography level="title-lg">PFAS Chemicals in { selectedMediumName }</Typography>
        <MediumMenu />
      </Stack>
    }>
      <div style={{ minHeight: '400px' }}>
        <ResponsivePie
          height={ 400 }
          data={ chartData }
          margin={{ top: 40, right: 0, bottom: 40, left: 0 }}
          innerRadius={ 0.5 }
          padAngle={ 1 }
        />
      </div>

    </DashboardCard>
  )
}

export const Dashboard = () => {
  const { pfasData } = useData();

  if (pfasData.isLoading) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ mt: '100px' }}
      >
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <Grid container spacing={2} sx={{
      flexGrow: 1,
    }}>
      <Grid xs={ 12 } md={ 8 }>
        <SubstancesInSamplesCard />
      </Grid>
      <Grid xs={ 12 } md={ 4 }>
        <DashboardCard title="Do mollit">
          ... <br /> ... <br /> ...
        </DashboardCard>
      </Grid>
      <Grid xs={ 4 }>
        <DashboardCard title="Lorem ipsum">
          ... <br /> ... <br /> ...
        </DashboardCard>
      </Grid>
      <Grid xs={ 8 }>
        <DashboardCard title="Do mollit">
          ... <br /> ... <br /> ...
        </DashboardCard>
      </Grid>
    </Grid>
  );
};
