import { Badge, IconButton } from '@mui/joy'
import PropTypes from 'prop-types'
import {
  MenuOpen as DrawerIcon,
} from '@mui/icons-material'
import { useData } from '@context'

export const FiltersDrawerToggle = ({ active = false, onClick }) => {
  const { filterCount } = useData()
  
  return (
    <IconButton
      size="lg"
      variant="soft"
      color="primary"
      onClick={ onClick }
    >
      <Badge
        badgeContent={ filterCount }
        size="sm"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <DrawerIcon
          fontSize="lg"
          sx={{
            transform: active ? 'scale(1, 1)' : 'scale(-1, 1)',
            transition: 'transform 150ms',
          }}
        />
      </Badge>
    </IconButton>
  )
}

FiltersDrawerToggle.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}
