import { createContext, useCallback, useContext, useRef, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/joy'
import { Close as CloseIcon } from '@mui/icons-material'
import { useData } from '@context'
import {
  AnalyteCorrelationGrid,
  AnalyteCorrelationScatterplot,
  AnalyteSelect,
  Distribution,
  Instructions,
} from '@components/compare'
import { Latex } from '@components/latex'
import { pearsonsR } from '@util'
import { PngDownloadButton } from '@components/dashboard'

const CompareContext = createContext({ })
export const useCompare = () => useContext(CompareContext)

export const CompareView = () => {
  const containerRef = useRef(null)
  const { podmTable: { table } } = useData()
  const [analytes, setAnalytes] = useState([null, null])
  const max = useRef(0);

  const clearAnalytes = useCallback(() => {
    setAnalytes([null, null])
  }, [])

  const correlationCount = useCallback((id1, id2) => {
    if (id1 === id2) {
      return 0
    }
    return table.getPrePaginationRowModel().rows
      .reduce((count, row) => {
        if (Number(row.original[`${ id1 }_concentration`]) > 0
            && Number(row.original[`${ id2 }_concentration`]) > 0
        ) { count += 1 }
        if (count > max.current) {
          max.current += 1
        }
        return count
      }, 0)
  }, [table.getPrePaginationRowModel().rows]);

  const SelectionDetails = useCallback(() => {
    if (!analytes[0] || !analytes[1]) {
      return <Instructions />
    }

    const correlationData = table.getPrePaginationRowModel().rows
      .filter(row => (
        Number(row.original[`${ analytes[0] }_concentration`]) > 0
        && Number(row.original[`${ analytes[1] }_concentration`]) > 0
      ))

    if (analytes[0] === analytes[1]) {
      return <Distribution analyte={ analytes[0] } />
    }

    return (
      <Box ref={ containerRef }>
        <Typography
          level="h4"
          justifyContent="space-between"
          endDecorator={
            <Stack direction="row" gap={ 1 }>
              <PngDownloadButton containerRef={ containerRef } />
              <IconButton variant="soft" size="sm" onClick={ clearAnalytes }><CloseIcon /></IconButton>
            </Stack>
          }
        ><span>{ analytes[0] } <Latex>\times</Latex> { analytes[1] }</span></Typography>

        <ul style={{ margin: '1rem 0 0 0' }}>
          <li>
            <Typography>
              { correlationCount(...analytes) } samples contain both { analytes[0] } and { analytes[1] }.
            </Typography>
          </li>

          <li>
            <Latex>{ `r = ${
              pearsonsR(
                table.getPrePaginationRowModel().rows.map(row => Number(row.original[`${ analytes[0] }_concentration`])),
                table.getPrePaginationRowModel().rows.map(row => Number(row.original[`${ analytes[1] }_concentration`])),
              )
            }` }</Latex>
          </li>          
        </ul>
        
        <AnalyteCorrelationScatterplot
          analytes={ analytes }
          data={ correlationData }
        />
      </Box>
    )
  }, [analytes[0], analytes[1]])

  return (
    <CompareContext.Provider value={{ analytes, setAnalytes, clearAnalytes, correlationCount }}>
      <Stack
        justifyContent="flex-start"
        alignItems="stretch"
        gap={ 2 }
        sx={{ flex: 1 }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          gap={ 2 }
          divider={ <Divider orientation="vertical" /> }
          sx={{ display: 'inline-flex' }}
        >
          <Typography level="body-md" sx={{ whiteSpace: 'nowrap' }}>
            { table.getPrePaginationRowModel().rows.length } samples
          </Typography>
          <AnalyteSelect />
        </Stack>
        <Card variant="soft">
          <Typography level="h3">Correlation Matrix</Typography>

          <Divider />

          <Stack flexDirection={{ xs: 'column', md: 'row' }}>
            <CardContent sx={{ flex: '0 1 400px' }}>
              <AnalyteCorrelationGrid
                data={ table.getPrePaginationRowModel().rows }
                selectedAnalytes={ analytes }
                onClickCell={ setAnalytes }
              />
            </CardContent>
            <CardContent sx={{
              flex: 1,
              mt: 1,
              p: 2,
              backgroundImage: 'linear-gradient(120deg, var(--joy-palette-background-surface) 50%, transparent 100%)',
              borderBottomLeftRadius: '6px',
              borderTopLeftRadius: '6px',
            }}>
              <SelectionDetails />
            </CardContent>
          </Stack>
        </Card>
      </Stack>
    </CompareContext.Provider>
  )
}

