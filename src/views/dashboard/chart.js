import {
  Grid,
  Stack,
  Typography,
} from '@mui/joy'
import { useData } from '@context'
import {
  ChemicalDetectionPieChart,
  ChemicalsByMediumRadarChart,
} from '@components/charts'
import { ChartCard } from '@components/dashboard'

export const ChartView = () => {
  const { podmTable: { table } } = useData()

  return (
    <Stack direction="column">
      <Typography>
        { table.getPrePaginationRowModel().rows.length } samples
      </Typography>

      <Grid container spacing={ 2 } sx={{ pr: 2 }}>
        <Grid xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 6 }>
          <ChartCard title="Analytes Detection Counts">
            <ChemicalDetectionPieChart data={ table.getPrePaginationRowModel().rows } />
          </ChartCard>
        </Grid>
        <Grid xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 6 }>
          <ChartCard title="Analyte Counts in Various Media">
            <ChemicalsByMediumRadarChart data={ table.getPrePaginationRowModel().rows } />
          </ChartCard>
        </Grid>
      </Grid>
    </Stack>
  )
}

