import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
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
  CsvExportButton,
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
  const { abbreviate, podmTable: { table } } = useData()
  const [selectedAnalytes, setSelectedAnalytes] = useState([null, null])
  const abbreviations = useMemo(() => [
    abbreviate(selectedAnalytes[0]),
    abbreviate(selectedAnalytes[1]),
  ], [selectedAnalytes[0], selectedAnalytes[1]])
  const max = useRef(0);

  const clearAnalytes = useCallback(() => {
    setSelectedAnalytes([null, null])
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

  const dataForCsv = useMemo(() => {
    return table.getPrePaginationRowModel().rows
      .reduce((acc, row) => {
        const {
          sample_id,
          [`${ selectedAnalytes[0] }_concentration`]: analyte1,
          [`${ selectedAnalytes[1] }_concentration`]: analyte2,
        } = row.original;
        acc.push({ sample_id, [selectedAnalytes[0]]: analyte1, [selectedAnalytes[1]]: analyte2 })
        return acc
      }, [])
  }, [selectedAnalytes[0], selectedAnalytes[1], table.getPrePaginationRowModel().rows])

  const SelectionDetails = useCallback(() => {
    const correlationData = useMemo(() => table.getPrePaginationRowModel().rows
      .filter(row => (
        Number(row.original[`${ selectedAnalytes[0] }_concentration`]) > 0
        && Number(row.original[`${ selectedAnalytes[1] }_concentration`]) > 0
      )), [table.getPrePaginationRowModel().rows])

    const r = useMemo(() => pearsonsR(
      table.getPrePaginationRowModel().rows.map(row => Number(row.original[`${ selectedAnalytes[0] }_concentration`])),
      table.getPrePaginationRowModel().rows.map(row => Number(row.original[`${ selectedAnalytes[1] }_concentration`])),
    ), [table.getPrePaginationRowModel().rows])

    if (selectedAnalytes[0] === selectedAnalytes[1]) {
      return <Distribution analyte={ selectedAnalytes[0] } />
    }

    return (
      <Box>
        <Typography
          level="h4"
          justifyContent="space-between"
          endDecorator={
            <Stack direction="row" gap={ 1 }>
              <CsvExportButton data={ dataForCsv } />
              <PngDownloadButton containerRef={ containerRef } />
              <IconButton variant="soft" size="sm" onClick={ clearAnalytes }><CloseIcon /></IconButton>
            </Stack>
          }
        ><span>{ abbreviations[0] } <Latex>\times</Latex> { abbreviations[1] }</span></Typography>

        <ul style={{ margin: '1rem 0 0 0' }}>
          <li>
            <Typography>
              { correlationCount(...selectedAnalytes) } samples contain both { abbreviations[0] } and { abbreviations[1] }.
            </Typography>
          </li>

          <li>
            <Latex>{ `r = ${ r }` }</Latex>
          </li>          
        </ul>
        
        <Box ref={ containerRef } sx={{ height: '500px' }}>
          <AnalyteCorrelationScatterplot
            analytes={ selectedAnalytes }
            data={ correlationData }
          />
        </Box>
      </Box>
    )
  }, [selectedAnalytes[0], selectedAnalytes[1]])

  return (
    <CompareContext.Provider value={{
      selectedAnalytes,
      setSelectedAnalytes,
      clearAnalytes,
      correlationCount,
    }}>
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
                selectedAnalytes={ selectedAnalytes }
                onClickCell={ setSelectedAnalytes }
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
            { !selectedAnalytes[0] || !selectedAnalytes[1] ? <Instructions /> : <SelectionDetails /> }
            </CardContent>
          </Stack>
        </Card>
      </Stack>
    </CompareContext.Provider>
  )
}

