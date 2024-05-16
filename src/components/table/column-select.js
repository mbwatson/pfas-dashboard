import PropTypes from 'prop-types'
import {
  Checkbox,
  Dropdown,
  Menu,
  ListItem,
  MenuButton,
  MenuList,
} from '@mui/joy'
import {
  KeyboardArrowDown as ChevronDownIcon,
} from '@mui/icons-material'

export const ColumnSelect = ({ table }) => {
  return (
    <Dropdown>
      <MenuButton
        variant="soft"
        endDecorator={ <ChevronDownIcon /> }
      >COLUMNS</MenuButton>
      <Menu aria-labelledby="column-select" size="sm">
        <MenuList sx={{
          maxWidth: '800px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {
            table.getAllLeafColumns().map(column => {
              return (
                <ListItem key={ column.id }>
                  <Checkbox
                    label={ column.id }
                    checked={ column.getIsVisible() }
                    onChange={ column.getToggleVisibilityHandler() }
                    variant="soft"
                    size="sm"
                  />
                </ListItem>
              )
            })
          }
        </MenuList>
      </Menu>
    </Dropdown>
  )
}

ColumnSelect.propTypes = {
  table: PropTypes.object.isRequired,
}

