import { 
  Grid,
} from '@mui/joy'
import { ContentPage } from '@components/layout'
import { DashboardCard, SubstancesByMediumCard } from '@components/dashboard';

export const DashboardView = () => {
  return (
    <ContentPage sx={{
      maxWidth: '100vw',
      minWidth: '100vw',
    }}>
      <Grid container spacing={2} sx={{
        flexGrow: 1,
      }}>
        <Grid xs={ 12 } sm={ 12 } md={ 8 } lg={ 7 } xl={ 5 }>
          <SubstancesByMediumCard />
        </Grid>
        <Grid xs={ 12 } sm={ 12 } md={ 4 } lg={ 5 } xl={ 7 }>
          <DashboardCard title="Tempor duis">
            ... <br /> ... <br /> ...
          </DashboardCard>
        </Grid>
        <Grid xs={ 12 } sm={ 12 } md={ 4 } lg={ 6 } xl={ 4 }>
          <DashboardCard title="Lorem ipsum">
            ... <br /> ... <br /> ...
          </DashboardCard>
        </Grid>
        <Grid xs={ 12 } sm={ 12 } md={ 8 } lg={ 6 } xl={ 4 }>
          <DashboardCard title="Do mollit">
            ... <br /> ... <br /> ...
          </DashboardCard>
        </Grid>
      </Grid>
    </ContentPage>
  )
}
