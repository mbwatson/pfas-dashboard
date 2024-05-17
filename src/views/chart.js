import { useCallback, useMemo } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  ListItemContent,
  Stack,
  Typography,
} from '@mui/joy'
import {
  Circle as IndicatorIcon,
} from '@mui/icons-material'
import { ContentPage } from '@components/layout'
import { ColumnFilter } from '@components/table'
import { useData } from '@context'
import { ResponsivePie } from '@nivo/pie'

const ColumnFilters = () => {
  const { podmTable: { table } } = useData()

  return (
    <AccordionGroup>
      {
        table.getAllColumns().map(columnGroup => {
          const activeFilterInGroup = columnGroup.columns.some(col => col.getIsFiltered())
          return (
            <Accordion key={ `col-group-${ columnGroup.id }` }>
              <AccordionSummary>
                <IndicatorIcon
                  color="primary"
                  sx={{
                    transform: 'scale(0.75)',
                    filter: activeFilterInGroup ? 'opacity(1.0)' : 'opacity(0.1)'
                  }}
                />
                <ListItemContent>
                  { columnGroup.id.toUpperCase() }
                </ListItemContent>
              </AccordionSummary>
              <AccordionDetails>
                {
                  columnGroup.columns
                    .filter(column => column.getCanFilter())
                    .map(column => (
                      <div key={ `column-filter-${ column.id }` }>
                        { column.id }
                        <ColumnFilter column={ column } />
                      </div>
                    ))
                }
              </AccordionDetails>
            </Accordion>
          )
        })
      }
    </AccordionGroup>
  )
}

export const ChartView = () => {
  const { podmTable } = useData()
  const { table } = podmTable

  return (
    <ContentPage sx={{ minWidth: '100%' }}>
      <Stack
        direction={{ md: 'column', lg: 'row' }}
        gap={ 2 }
        sx={{
          height: '100%',
          '.filters-card': {
            flex: { sm: '0 1 300px', md: '0 0 400px' },
            display: 'flex',
            justifyContent: 'flex-start',
          },
        }}
      >
        <Card variant="soft" className="filters-card">
          <CardContent>
            <Typography level="h2">Filters</Typography>
            <Typography level="body-md">{ Object.keys(table.getRowModel().rowsById).length } samples</Typography>
          </CardContent>

          <ColumnFilters />
        </Card>

        <Box sx={{ flex: 1 }} className="chart-container">
          <Typography level="h3">
            Samples by PFAS Chemical Detection
          </Typography>
          <Box sx={{
            height: { xs: '260px', sm: '320px', md: '500px', lg: '700px' },
            width: { xs: '360px', sm: '600px', md: '100%', lg: '100%', xl: '100%' },
          }}>
            <ChemicalDetectionPieChart />
          </Box>
        </Box>
      </Stack>
    </ContentPage>
  )
}

const ChemicalDetectionPieChart = () => {
  const { chemicalIds, podmTable } = useData();
  const { table } = podmTable

  const emptyChemicalBuckets = useMemo(() => chemicalIds
    .reduce((acc, id) => {
      acc[id] = 0;
      return acc;
    }, {}), [chemicalIds]);

  const detectedChemicals = useCallback(row => {
    return chemicalIds.reduce((acc, chemicalId) => {
      if (row.original[`${ chemicalId }_concentration`] > 0) {
        acc.push(chemicalId)
      }
      return acc
    }, [])
  }, [chemicalIds])

  const chemicalBuckets = useMemo(() => table.getRowModel().rows
    .reduce((acc, row) => {
      detectedChemicals(row).forEach(chemicalId => {
        acc[chemicalId] += 1
      })
      return acc
  }, { ...emptyChemicalBuckets }), [table.getRowModel().rows])

  const chartData = useMemo(() => {
    if (!chemicalBuckets) {
      return []
    }
    return Object.keys(chemicalBuckets).map(chemicalId => ({
      id: chemicalId,
      value: chemicalBuckets[chemicalId],
    }))
  }, [chemicalBuckets])


  if (!Object.keys(chemicalBuckets).length === 0) {
    return null
  }

  return (
    <ResponsivePie
      data={ chartData }
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      innerRadius={ 0.5 }
      padAngle={ 1 }
    />
  )
}
