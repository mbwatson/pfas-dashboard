import { useCallback } from 'react'
import { FormControl, FormLabel, Option, Select, Stack } from '@mui/joy'
import { useCompare } from '@views/dashboard/compare'

export const CorrelationCoefficientSelect = () => {
  const { correlationCoefficient } = useCompare()

  const handleChangeValue = useCallback((event, newValue) => {
    correlationCoefficient.set(newValue)
  }, [])

  return (
    <Stack direction="row" gap={ 2 } alignItems="center">
      <FormControl orientation="horizontal" size="sm">
        <FormLabel>Correlation Coefficient</FormLabel>
        <Select
          size="sm"
          value={ correlationCoefficient.current }
          variant="outlined"
          color={ correlationCoefficient.current ? 'primary' : 'neutral' }
          onChange={ handleChangeValue }
        >
          <Option value="pearson">Pearson</Option>
          <Option value="spearman">Spearman</Option>
        </Select>
      </FormControl>
    </Stack>
  )
}
