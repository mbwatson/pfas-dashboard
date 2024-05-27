import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useData, usePreferences } from '@context'
import { ResponsiveRadar } from '@nivo/radar'
import { theme } from './theme'

//

const GridLabel = ({ id, x, y }) => {
  const preferences = usePreferences()

  return (
    <g transform={ `translate(${ x }, ${ y })` }>
      <g transform={ `translate(0, 0)` }>
        <text style={{
          textAlign: 'center',
          fontSize: 10,
          fontFamily: 'Inter',
          fill: preferences.colorMode.light ? '#333' : '#ddd',
        }}>
          { id }
        </text>
      </g>
    </g>
  )
}

GridLabel.propTypes = {
  id: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export const ChemicalsByMediumRadarChart = ({ data }) => {
  const preferences = usePreferences()
  const { chemicalIds } = useData();

  // generate array of sampled media from data
  const sampledMedia = useMemo(() => {
    return data
      .reduce((acc, row) => {
        if (!acc.includes(row.original.medium)) {
          acc.push(row.original.medium)
        }
        return acc
      }, [])
      .sort()
  }, [data.length])
  
  const mediaBuckets = useMemo(() => sampledMedia
    .reduce((acc, medium) => {
      acc[medium] = 0
      return acc
    }, []
  ), [sampledMedia])

  // our goal is counting detections in media in an array like
  //   [
  //      { chemicalId: 'pfod', dust: 20, water: 130, ... }
  //      { chemicalId: 'pfna', dust: 120, water: 450, ... }
  //      ...
  //   ]
  // for the chart's source data, which we'll index on chemicalId.
  const chartData = useMemo(() => {
    if (!chemicalIds) {
      return []
    }
    const chemicalBuckets = chemicalIds
      .reduce((acc, chemicalId) => {
        acc[chemicalId] = { chemicalId, ...mediaBuckets }
        return acc
      }, {})
    const buckets = data
      .reduce((acc, row) => {
        const medium = row.original.medium
        // for each detected chemical
        Object.keys(chemicalBuckets).filter(
          // that is, where concentration > 0,
          chemicalId => Number(row.original[`${ chemicalId }_concentration`]) > 0
          // increase that chemical's count in that medium.
        ).forEach(chemicalId => acc[chemicalId][medium] += 1)
      return acc
      }, { ...chemicalBuckets })
    return Object.values(buckets)
  }, [chemicalIds, data])

  return (
    <ResponsiveRadar
      data={ chartData }
      keys={ sampledMedia }
      indexBy="chemicalId"
      margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
      colors={{ scheme: 'pastel1' }}
      gridLabelOffset={ 25 }
      gridLevels={ 10 }
      gridLabel={ GridLabel }
      dotSize={ 8 }
      dotColor={{ from: 'color' }}
      dotBorderWidth={ 2 }
      blendMode="multiply"
      motionConfig="wobbly"
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          justify: false,
          translateX: -40,
          translateY: 0,
          itemsSpacing: 4,
          itemWidth: 100,
          itemHeight: 16,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
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
      theme={ theme }
    />
  )
}

ChemicalsByMediumRadarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
