import {
  Box,
  Stack,
  Typography,
} from '@mui/joy'
import { useData } from '@context'
import { ChemicalDetectionPieChart } from '@components/dashboard'

export const ChartView = () => {
  const { podmTable: { table } } = useData()
  
  return (
    <Stack direction="column">
      <Typography level="h3" sx={{ py: 2 }}>
        Samples by PFAS Chemical Detection
      </Typography>
      <Typography>
        { table.getPrePaginationRowModel().rows.length } samples
      </Typography>

      <Box sx={{
        height: { xs: '260px', sm: '320px', md: '500px', lg: '700px' },
        width: { xs: '360px', sm: '600px', md: '100%', lg: '100%', xl: '100%' },
      }}>
        <ChemicalDetectionPieChart />
      </Box>
    </Stack>
  )
}

