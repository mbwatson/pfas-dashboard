import { Button } from '@mui/joy'
import PropTypes from 'prop-types'
import {
  Close as ClearFiltersIcon,
} from '@mui/icons-material'
import { useData } from '@context'

export const ClearFiltersButton = ({ sx = {}, ...props }) => {
  const { podmTable: { table } } = useData()

  const noActiveFilters = !table.getAllLeafColumns().some(col => col.getIsFiltered() )

  return (
    <Button
      key="clear-selections"
      variant="outlined"
      size="sm"
      onClick={ () => table.resetColumnFilters() }
      startDecorator={ <ClearFiltersIcon fontSize="sm" /> }
      { ...props }
      sx={{ ...sx }}
      disabled={ noActiveFilters }
    >Clear Filters</Button>
  )
}

ClearFiltersButton.propTypes = {
  sx: PropTypes.object,
}
