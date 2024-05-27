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


const Instructions = () => {
  return (
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

      <Typography level="body-sm" my={ 2 }>
        Selecting a cell presents a scatterplot ilustrating the relationship
        between the analytes defined by the selected cell.
      </Typography>

      <Divider />

      <Typography variant="caption" level="body-xs" my={ 2 }>
        * This means correlation in terms of
        the <Link to="https://en.wikipedia.org/wiki/Pearson_correlation_coefficient">Pearson
        correlation coefficient <InlineMath math="r" /></Link>.
      </Typography>
    </Fragment>
  )
}

export const CompareView = () => {
  const { chemicalIds, podmTable: { table } } = useData()
  const [analytes, setAnalytes] = useState([null, null])

  const handleClickClearSelection = () => {
    setAnalytes([null, null])
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
    if (!analytes[0] || !analytes[1]) {
      return <Instructions />
    }

    if (analytes[0] === analytes[1]) {
      return (
        <Fragment>
          <Typography>distribution</Typography>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <Typography
          level="h4"
          justifyContent="space-between"
          endDecorator={ <IconButton variant="soft" size="sm" onClick={ handleClickClearSelection }><CloseIcon /></IconButton> }
        ><span>{ analytes[0] } <InlineMath math="\times" /> { analytes[1] }</span></Typography>

        <Divider />
        
        <ul style={{ margin: '1rem 0 0 0' }}>
          <li>
            <Typography>
              { correlationCount(...analytes) } samples contain both { analytes[0] } and { analytes[1] }.
            </Typography>
          </li>

          <li>
            <InlineMath math={ `r = ${
              pearsonsR(
                table.getPrePaginationRowModel().rows.map(row => Number(row.original[`${ analytes[0] }_concentration`])),
                table.getPrePaginationRowModel().rows.map(row => Number(row.original[`${ analytes[1] }_concentration`])),
              )
            }` } />
          </li>          
        </ul>
        <AnalyteCorrelationScatterplot
          data={ table.getPrePaginationRowModel().rows }
          analytes={ analytes }
        />
      </Fragment>
    )
  }, [analytes[0], analytes[1]])

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="stretch"
      gap={ 2 }
      sx={{ flex: 1, }}
    >
      <Card variant="soft">
        <Typography level="h2">
          Comparing { chemicalIds.length } analytes across { table.getPrePaginationRowModel().rows.length } samples
        </Typography>

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
  )
}

