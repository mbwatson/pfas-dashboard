import { IconButton } from '@mui/joy'
import {
  MenuOpen as DrawerIcon,
} from '@mui/icons-material'
import PropTypes from 'prop-types'

export const FiltersDrawerToggle = ({ active = false, onClick }) => {
  return (
    <IconButton
      size="sm"
      variant="soft"
      color={ active ? 'primary' : 'neutral' }
      onClick={ onClick }
    ><DrawerIcon fontSize="sm" /></IconButton>
  )
}

FiltersDrawerToggle.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}
