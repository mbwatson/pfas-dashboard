import { useCallback } from 'react'
import { Button, FormControl, Option, Select } from '@mui/joy'
import {
  Close as ClearIcon,
} from '@mui/icons-material'
import { useData } from '@context'
import { useCompare } from '@views/dashboard/compare'

export const AnalyteSelect = () => {
  const { chemicalIds } = useData()
  const { analytes, clearAnalytes, setAnalytes } = useCompare()

  const handleChangeAnalyte = useCallback(index => (event, newAnalyte) => {
    const newAnalytes = [...analytes]
    newAnalytes[index] = newAnalyte
    setAnalytes(newAnalytes)
  }, [analytes[0], analytes[1]])

  return (
    <FormControl orientation="horizontal" sx={{ gap: 2 }}>
      <Select value={ analytes[0] ?? '' } variant="outlined" onChange={ handleChangeAnalyte(0) }>
        <Option key="select-null" value="">Select analyte</Option>
        {
          chemicalIds.map(id => (
            <Option key={ `select-0-${ id }` } value={ id }>{ id }</Option>
          ))
        }
      </Select>
      <Select value={ analytes[1] ?? '' } variant="outlined" onChange={ handleChangeAnalyte(1) }>
        <Option key="select-null" value="">Select analyte</Option>
        {
          chemicalIds.map(id => (
            <Option key={ `select-1-${ id }` } value={ id }>{ id }</Option>
          ))
        }
      </Select>
      <Button
        key="clear-selections"
        variant="outlined"
        size="sm"
        color="neutral"
        onClick={ clearAnalytes }
        startDecorator={ <ClearIcon fontSize="sm" /> }
        disabled={ analytes.every(a => !a) }
      >Clear</Button>

    </FormControl>
  )
}
