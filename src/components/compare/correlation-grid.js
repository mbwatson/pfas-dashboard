import { Fragment, useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/joy'
import { useData, usePreferences } from '@context'
import { pearsonsR } from '@util'
import { IndicatorBox } from './correlation-indicator-box'

//

export const AnalyteCorrelationGrid = ({ data, onClickCell, selectedAnalytes = [null, null] }) => {
  const { analyteIds } = useData();
  const { colorMode } = usePreferences();
  const max = useRef(0);

  useEffect(() => {
    max.current = 0;
  }, [data])

  const correlationCount = useCallback((id1, id2) => {
    if (id1 === id2) {
      return 0
    }
    const count = data.reduce((count, row) => {
      if (Number(row.original[`${ id1 }_concentration`]) > 0
          && Number(row.original[`${ id2 }_concentration`]) > 0
      ) { count += 1 }
      return count
    }, 0)
    
    if (count > max.current) { max.current = count; }

    return count
  }, [data]);

  const CorrelationIndicator = useCallback((id1, id2) => {
    if (id1 === id2) {
      return (
        <Box sx={{
          background: colorMode.light ? '#cde6' : '#2346',
          height: '50%',
          width: '50%',
          borderRadius: '50%',
        }} />
      )
    }

    const count = correlationCount(id1, id2)
    const r = pearsonsR(
      data.map(row => Number(row.original[`${ id1 }_concentration`])),
      data.map(row => Number(row.original[`${ id2 }_concentration`])),
    )

    return (
      <IndicatorBox
        alpha={ r }
        size={ count / max.current }
      />
    );
  }, [data]);

  const handleClickCell = (id1, id2) => () => {
    onClickCell([id1, id2]);
  }

  return (
    <Box sx={{
      display: 'grid',
      width: '500px',
      height: '500px',
      aspectRatio: '1 / 1',
      gridTemplateColumns: `50px repeat(${ analyteIds.length }, 25px)`,
      gridTemplateRows: `55px repeat(${ analyteIds.length }, 25px)`,
      pr: 2, pt: 2,
      '.body.cell': {
        aspectRatio: '1 / 1',
        border: '1px solid var(--joy-palette-primary-outlinedBorder)',
        height: '25px',
        width: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '75%',
        cursor: 'pointer',
        filter: 'saturate(0.5)',
        '&.highlight': {
          filter: 'saturate(1.0)',
        },
        '&:hover': {
          filter: 'saturate(1.0)',
          border: '1px solid crimson',
        },
      },
      '.header.cell': {
        fontSize: '65%',
        textTransform: 'uppercase',
        '&.selected': {
          color: 'var(--joy-palette-primary-main)',
          fontWeight: 'bold',
        }
      },
      '.col-header.cell': {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transform: 'rotate(-90deg)',
      },
      '.row-header.cell': {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        pr: 1,
      },
    }}>
      <Box className="corner cell" />
      {
        analyteIds.map(analyteIdOuter => (
          <Box
            key={ `col-header-${ analyteIdOuter }` }
            className={ `header col-header cell ${ analyteIdOuter } ${ selectedAnalytes[0] === analyteIdOuter ? 'selected' : '' }` }
          >{ analyteIdOuter }</Box>
        ))
      }
      {
        analyteIds.map(analyteIdOuter => (
          <Fragment key={ `row-${ analyteIdOuter }` }>
            <Box className={ `header row-header cell ${ analyteIdOuter } ${ selectedAnalytes[1] === analyteIdOuter ? 'selected' : '' }` }>{ analyteIdOuter }</Box>
            {
              analyteIds.map(analyteIdInner => {
                const highlightClass = analyteIdInner === selectedAnalytes[0]
                  || analyteIdOuter === selectedAnalytes[1] ? 'highlight' : ''
                return (
                  <Box
                    key={ `cell ${ analyteIdOuter }-${ analyteIdInner }` }
                    className={ `body cell row-${ analyteIdOuter } col-${ analyteIdInner } ${ highlightClass }` }
                    onClick={ handleClickCell(analyteIdInner, analyteIdOuter) }
                  >{ CorrelationIndicator(analyteIdInner, analyteIdOuter) }</Box>
                )
              })
            }
          </Fragment>
        ))
      }
    </Box>
  )
}

AnalyteCorrelationGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickCell: PropTypes.func.isRequired,
  selectedAnalytes: PropTypes.arrayOf(PropTypes.string),
}
