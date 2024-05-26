import { Fragment, useCallback, useState } from 'react'
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
} from '@components/charts'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { pearsonsR } from '@util'
import { Link } from '@components/link'

export const CompareView = () => {
  const { podmTable: { table } } = useData()
  const [pair, setPair] = useState([null, null])

  const handleClickClearSelection = () => {
    setPair([null, null])
  }

  const correlationCount = useCallback((id1, id2) => {
    if (id1 === id2) {
      return 0
    }
    const count = table.getPrePaginationRowModel().rows
      .reduce((count, row) => {
        if (Number(row.original[`${ id1 }_concentration`]) > 0
            && Number(row.original[`${ id2 }_concentration`]) > 0
        ) { count += 1 }
        return count
      }, 0)
    
    return count
  }, [table.getPrePaginationRowModel().rows]);

  const SelectionDetails = useCallback(() => {
    return (
      <Box sx={{
        p: 2,
        mr: 3,
        mt: 2,
        backgroundImage: 'linear-gradient(120deg, var(--joy-palette-background-surface) 50%, transparent 100%)',
      }}>
        {
          pair[0] && pair[1] ? (
            <Fragment>
              <Typography
                level="h4"
                justifyContent="space-between"
                endDecorator={ <IconButton variant="outlined" size="sm" onClick={ handleClickClearSelection }><CloseIcon /></IconButton> }
              ><span>{ pair[0] } <InlineMath math="\times" /> { pair[1] }</span></Typography>
              
              <ul>
                <li>
                  <Typography>
                    { correlationCount(...pair) } samples contain both { pair[0] } and { pair[1] }.
                  </Typography>
                </li>

                <li>
                  <InlineMath math={ `r = ${
                    pearsonsR(
                      table.getPrePaginationRowModel().rows.map(row => Number(row.original[`${ pair[0] }_concentration`])),
                      table.getPrePaginationRowModel().rows.map(row => Number(row.original[`${ pair[1] }_concentration`])),
                    )
                  }` } />
                </li>          
              </ul>
            </Fragment>
          ) : (
            <Fragment>
              <Typography level="h4">Instructions</Typography>

              <Divider />

              <Typography level="body-sm" my={ 2 }>
                Choose a pair of analytes for comparison by selecting a cell in the grid above.
              </Typography>
              <Typography level="body-sm" my={ 2 }>
                Each of the non-diagonal cells in the grid contains a square describing
                the samples in which <em>both</em> selected analytes were detected.
                The <em>size</em> of the square indicates the number of such samples
                (as a part of the whole of currently filtered samples).
                The <em>opacity</em> of the square indicates how strong the correlation
                is between those two analytes<sup>*</sup>.
              </Typography>

              <Divider />

              <Typography variant="caption" level="body-xs">
                * Correlation in terms of the <Link to="https://en.wikipedia.org/wiki/Pearson_correlation_coefficient">Pearson correlation coefficient <InlineMath math="r" /></Link>.
              </Typography>
            </Fragment>
          )
        }
      </Box>
    )
  }, [pair[0], pair[1]])

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="stretch"
      gap={ 2 }
      sx={{ flex: 1, }}
    >
      <Card variant="soft">
        <Typography level="h2">
          Comparing { table.getPrePaginationRowModel().rows.length } samples
        </Typography>

        <Divider />

        <Stack flexDirection={{ xs: 'column', md: 'row' }}>
          <CardContent sx={{ flex: '0 1 400px' }}>
            <AnalyteCorrelationGrid
              data={ table.getPrePaginationRowModel().rows }
              selectedAnalytes={ pair }
              onClickCell={ setPair }
            />
            <SelectionDetails />
          </CardContent>
            {
              pair[0] && pair[1] ? (
                <CardContent sx={{
                  flex: 1,
                  backgroundImage: 'linear-gradient(120deg, var(--joy-palette-background-surface) 50%, transparent 100%)',
                  mt: 1,
                  p: 2,
                }}>
                  <Card variant="plain" sx={{ height: '532px', backgroundColor: 'transparent' }}>
                    <AnalyteCorrelationScatterplot
                      data={ table.getPrePaginationRowModel().rows }
                      analytes={ pair }
                    />
                  </Card>
                </CardContent>
              ) : null
            }
        </Stack>
      </Card>

    </Stack>
  )
}

