import { Fragment } from 'react'
import {
  Box,
  Divider,
  Typography,
} from '@mui/joy'
import { Link } from '@components/link'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { IndicatorBox } from './correlation-indicator-box'

export const Instructions = () => {
  return (
    <Fragment>
      <Typography level="h4">Instructions</Typography>

      <Divider />

      <Typography level="body-sm" my={ 2 }>
        Choose a pair of analytes for comparison with the select boxes above
        or by selecting a cell in the grid.
      </Typography>
      <Typography level="body-sm" my={ 2 }>
        Each of the non-diagonal cells in the grid contains a square describing
        the samples in which <em>both</em> selected analytes are detected.
        The <em>size</em> of the square indicates the number of such samples
        (as a part of the whole of currently filtered samples).
        The <em>opacity</em> of the square indicates how strong the correlation
        is between those two analytes<sup>*</sup>.
      </Typography>

      <Box sx={{
        margin: '0 auto',
        display: 'grid',
        gridTemplateRows: `repeat(2, 25px)`,
        gridTemplateColumns: `150px repeat(10, 25px) 150px`,
        filter: 'saturate(0.5)',
        alignItems: 'center',
        gap: 0.5,
      }}>
        <Typography level="body-xs" textAlign="right">No samples</Typography>
        {
          [...Array(10).keys()].map(i => (
            <Box key={ `box-size-${ i }` } sx={{
              aspectRatio: '1 / 1',
              border: '1px solid var(--joy-palette-primary-outlinedBorder)',
              height: '25px',
              width: '25px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <IndicatorBox size={ 0.1 * (i + 1) } alpha={ 0.5 } />
            </Box>
          ))
        }
        <Typography level="body-xs" textAlign="left">All samples</Typography>
        <Typography level="body-xs" textAlign="right"><InlineMath math="r = 1" /></Typography>
        {
          [...Array(10).keys()].map(i => (
            <Box key={ `box-alpha-${ i }` } sx={{
              aspectRatio: '1 / 1',
              border: '1px solid var(--joy-palette-primary-outlinedBorder)',
              height: '25px',
              width: '25px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <IndicatorBox size={ 0.8 } alpha={ 0.1 * (i + 1) } />
            </Box>
          ))
        }
        <Typography level="body-xs" textAlign="left"><InlineMath math="r = 1" /></Typography>
      </Box>

      <Typography level="body-sm" my={ 2 }>
        Selecting a cell presents a scatterplot illustrating the relationship
        between the analytes defined by the selected cell.
      </Typography>

      <Divider />

      <Typography variant="caption" level="body-xs" my={ 2 }>
        * This is correlation in terms of
        the <Link to="https://en.wikipedia.org/wiki/Pearson_correlation_coefficient">Pearson
        correlation coefficient <InlineMath math="r" /></Link>.
      </Typography>
    </Fragment>
  )
}

