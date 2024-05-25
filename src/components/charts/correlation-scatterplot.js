import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'

//

const Tooltip = ({ node }) => (
  <div style={{
    color: node.color,
    background: '#333',
    padding: '12px 16px'
  }}>
    <strong>{ node.id }</strong> <br />
    {`x: ${ node.formattedX }`} <br />
    {`y: ${ node.formattedY }`}
  </div>
)

Tooltip.propTypes = {
  node: PropTypes.object.isRequired,
}

//

export const AnalyteCorrelationScatterplot = ({
  data = [],
  analytes = [],
}) => {
  const chartData = useMemo(() => [{
    id: `${ analytes[0] } x ${ analytes[1] }`,
    data: data.reduce((acc, d) => {
      acc.push({
        x: d.original[`${ analytes[0] }_concentration`],
        y: d.original[`${ analytes[1] }_concentration`],
      })
      return acc
    }, [])
  }], [analytes, data])

  return (
    <ResponsiveScatterPlot
      data={ chartData }
      height={ 500 }
      width={ 500 }
      margin={{ top: 30, right: 30, bottom: 70, left: 70 }}
      xScale={{ type: 'linear', min: 0, max: 'auto' }}
      yScale={{ type: 'linear', min: 0, max: 'auto' }}
      colors={{ scheme: 'paired' }}
      axisTop={ null }
      axisRight={ null }
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: analytes[0],
        legendPosition: 'middle',
        legendOffset: 46,
        truncateTickAt: 0
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: analytes[1],
        legendPosition: 'middle',
        legendOffset: -60,
        truncateTickAt: 0
      }}
      tooltip={ Tooltip }
    />
  )
}

AnalyteCorrelationScatterplot.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  analytes: PropTypes.arrayOf(PropTypes.string).isRequired,
}
