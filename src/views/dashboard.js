import { 
  Grid,
} from '@mui/joy';
import { ContentPage } from '@components/layout';
import { ChemicalsByMediumCard } from '@components/dashboard';

export const DashboardView = () => {
  return (
    <ContentPage sx={{ maxWidth: '100vw', minWidth: '100vw' }}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={ 0 } sm={ 0 } md={ 0 } lg={ 6 } xl={ 6 }>
          controls
        </Grid>
        <Grid xs={ 12 } sm={ 12 } md={ 12 } lg={ 6 } xl={ 6 }>
          <ChemicalsByMediumCard />
        </Grid>
      </Grid>
    </ContentPage>
  )
}
