import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Typography } from '@mui/joy'
import { useData, usePreferences } from '@context'
import { ResponsivePie } from '@nivo/pie'
import { chartTheme } from '../../theme'

const Tooltip = ({ datum }) => {
  return (
    <Box sx={{
      backgroundColor: datum.color,
      color: 'var(--joy-palette-grey-800)',
      border: `1px solid var(--joy-palette-common-black)`,
      filter: 'brightness(1.1)',
    }}>
      <Typography level="title-sm" sx={{ p: 1 }}>{ datum.label }</Typography>
      <Divider />
      <Typography level="body-sm" sx={{ p: 1 }}>{ datum.value }</Typography>
    </Box>
  )
}

Tooltip.propTypes = {
  datum: PropTypes.object.isRequired,
}

//

export const ChemicalDetectionPieChart = ({ data }) => {
  const { analyteIds } = useData();
  const preferences = usePreferences()

  const emptyChemicalBuckets = useMemo(() => analyteIds
    .reduce((acc, id) => {
      acc[id] = 0;
      return acc;
    }, {}), [analyteIds]);

  const detectedChemicals = useCallback(row => {
    return analyteIds.reduce((acc, analyteId) => {
      if (row.original[`${ analyteId }_concentration`] > 0) {
        acc.push(analyteId)
      }
      return acc
    }, [])
  }, [analyteIds])

  const chemicalBuckets = useMemo(() => data
    .reduce((acc, row) => {
      detectedChemicals(row).forEach(analyteId => {
        acc[analyteId] += 1
      })
      return acc
  }, { ...emptyChemicalBuckets }), [data])

  const chartData = useMemo(() => {
    if (!chemicalBuckets) {
      return []
    }
    return Object.keys(chemicalBuckets)
      .sort()
      .map(analyteId => ({
        id: analyteId,
        value: chemicalBuckets[analyteId],
      }))
  }, [chemicalBuckets, data])


  if (!Object.keys(chemicalBuckets).length === 0) {
    return null
  }

  return (
    <ResponsivePie
      key={ chartData.length }
      data={ chartData }
      margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
      innerRadius={ 0.5 }
      padAngle={ 1 }
      arcLabelsSkipAngle={ 10 }
      arcLinkLabelsTextColor={ preferences.colorMode.light ? '#333' : '#ddd' }
      colors={{ scheme: 'pastel1' }}
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          justify: false,
          translateX: -60,
          translateY: 0,
          itemsSpacing: 4,
          itemWidth: 50,
          itemHeight: 16,
          itemTextColor: '#999',
          itemOpacity: 1,
          symbolSize: 16,
          symbolShape: 'square',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: preferences.colorMode.light ? '#000' : '#fff',
              }
            }
          ]
        }
      ]}
      theme={ chartTheme }
    />
  )
}

ChemicalDetectionPieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}