import { useCallback, useMemo } from 'react'
import { useData } from '@context'
import { ResponsivePie } from '@nivo/pie'

export const ChemicalDetectionPieChart = () => {
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

  const chemicalBuckets = useMemo(() => table.getPrePaginationRowModel().rows
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
