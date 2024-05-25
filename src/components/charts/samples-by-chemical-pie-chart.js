import { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Typography } from '@mui/joy'
import { useData, usePreferences } from '@context'
import { ResponsivePie } from '@nivo/pie'

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
  const { chemicalIds } = useData();
  const preferences = usePreferences()

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

  const chemicalBuckets = useMemo(() => data
    .reduce((acc, row) => {
      detectedChemicals(row).forEach(chemicalId => {
        acc[chemicalId] += 1
      })
      return acc
  }, { ...emptyChemicalBuckets }), [data])

  const chartData = useMemo(() => {
    if (!chemicalBuckets) {
      return []
    }
    return Object.keys(chemicalBuckets)
      .sort()
      .map(chemicalId => ({
        id: chemicalId,
        value: chemicalBuckets[chemicalId],
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
    />
  )
}

ChemicalDetectionPieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}