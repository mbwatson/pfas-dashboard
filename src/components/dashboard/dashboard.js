import { useCallback, useMemo, useState } from 'react';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Option,
  Select,
  Stack,
  Typography,
} from '@mui/joy';
import { DashboardCard } from '@components/dashboard';
import { useData } from '@context';

const MediumByFieldCard = () => {
  const { pfasData } = useData();
  const fields = useMemo(() => Object.keys(pfasData.data[0]), [pfasData]);
  const [field, setField] = useState('medium')

  const FieldSelect = useCallback(() => {
    return (
      <Select value={ field } onChange={ (event, newValue) => setField(newValue) }>
        {
          fields.map(field => (
            <Option
              key={ `option-${ field }` }
              value={ field }
            >{ field }</Option>
          ))
        }
      </Select>
    );
  }, [field, fields]);

  const buckets = useMemo(() => pfasData.data
    .reduce((acc, d) => {
      const bucket = d[field]
      if (bucket in acc) {
        acc[bucket].push(d)
        return acc
      }
      acc[bucket] = [d]
      return acc
    }, []), [field, pfasData.data])


  return (
    <DashboardCard title={
      <Stack direction="row" justifyContent="flex-start" alignItems="center" gap={ 2 }>
        <Typography level="title-lg">Samples by</Typography> <FieldSelect />
      </Stack>
    }>
      <List>
        {
          Object.keys(buckets)
            .sort((b, c) => buckets[b].length < buckets[c].length ? 1 : -1)
            .map(bucket => (
              <ListItem key={ `count-${ bucket }` }>
                { bucket }: { buckets[bucket].length }
              </ListItem>
            ))
        }
      </List>
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
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={ 8 }>
        <MediumByFieldCard />
      </Grid>
      <Grid xs={ 4 }>
        <DashboardCard title="Dolor laborum">
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
