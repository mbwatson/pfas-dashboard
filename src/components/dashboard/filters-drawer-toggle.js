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
      color="primary"
      onClick={ onClick }
    >
      <DrawerIcon
        fontSize="sm"
        sx={{
          transform: active ? 'scale(1, 1)' : 'scale(-1, 1)',
          transition: 'transform 150ms',
        }}
      />
    </IconButton>
  )
}

FiltersDrawerToggle.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}
