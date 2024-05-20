import { useRef } from 'react'
import {
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/joy'
import {
  FileDownload as DownloadIcon,
} from '@mui/icons-material'
import { useData } from '@context'
import { ChemicalDetectionPieChart } from '@components/dashboard'
import { saveSvgAsPng } from 'save-svg-as-png'

export const ChartView = () => {
  const containerRef = useRef(null)
  const { podmTable: { table } } = useData()
  
  const handleClickDownload = () => {
    if (!containerRef.current) {
      return
    }
    const svg = containerRef.current.querySelector('svg')
    console.log(svg)
    saveSvgAsPng(svg, `pfas-samples--${ new Date().toLocaleString() }`, {
      scale: 2,
      format: 'png',
      quality: '0.5',
      download: true,
    })
  }

  return (
    <Stack direction="column">
      <Typography
        level="h3"
        sx={{ py: 2 }}
        endDecorator={
          <Button
            variant="outlined"
            color="neutral"
            size="sm"
            onClick={ handleClickDownload }
            startDecorator={ <DownloadIcon fontSize="sm" /> }
          >PNG</Button>
      }>
        Samples by PFAS Chemical Detection
      </Typography>
      <Typography>
        { table.getPrePaginationRowModel().rows.length } samples
      </Typography>

      <Box
        ref={ containerRef }
        sx={{
          height: { xs: '260px', sm: '320px', md: '500px', lg: '700px' },
          width: { xs: '340px', sm: '100%' },
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ChemicalDetectionPieChart />
      </Box>
    </Stack>
  )
}

