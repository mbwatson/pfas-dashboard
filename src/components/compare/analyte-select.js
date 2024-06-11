import { useCallback } from 'react'
import { Button, FormControl, FormLabel, Option, Select, Stack } from '@mui/joy'
import {
  Close as ClearIcon,
} from '@mui/icons-material'
import { useData } from '@context'
import { useCompare } from '@views/dashboard/compare'
import { Latex } from '@components/latex'

export const AnalyteSelect = () => {
  const { chemicalIds } = useData()
  const { analytes, clearAnalytes, setAnalytes } = useCompare()

  const handleChangeAnalyte = useCallback(index => (event, newAnalyte) => {
    const newAnalytes = [...analytes]
    newAnalytes[index] = newAnalyte
    setAnalytes(newAnalytes)
  }, [analytes[0], analytes[1]])

  return (
    <Stack direction="row" gap={ 2 } alignItems="center">
      <FormControl orientation="horizontal" size="sm">
        <FormLabel><Latex>x</Latex>-axis:</FormLabel>
        <Select
          size="sm"
          value={ analytes[0] ?? '' }
          variant="outlined"
          color={ analytes[0] ? 'primary' : 'neutral' }
          onChange={ handleChangeAnalyte(0) }
        >
          <Option key="select-null" value="">Select analyte</Option>
          {
            chemicalIds.map(id => (
              <Option key={ `select-0-${ id }` } value={ id }>{ id }</Option>
            ))
          }
        </Select>
      </FormControl>
      <Latex>\times</Latex>
      <FormControl orientation="horizontal" size="sm">
        <FormLabel><Latex>y</Latex>-axis:</FormLabel>
        <Select
          size="sm"
          value={ analytes[1] ?? '' }
          variant="outlined"
          color={ analytes[1] ? 'primary' : 'neutral' }
          onChange={ handleChangeAnalyte(1) }
        >
          <Option key="select-null" value="">Select analyte</Option>
          {
            chemicalIds.map(id => (
              <Option key={ `select-1-${ id }` } value={ id }>{ id }</Option>
            ))
          }
        </Select>
      </FormControl>
      <Button
        key="clear-selections"
        variant="outlined"
        size="sm"
        color="neutral"
        onClick={ clearAnalytes }
        startDecorator={ <ClearIcon fontSize="sm" /> }
        disabled={ analytes.every(a => !a) }
      >Clear</Button>
    </Stack>
  )
}
