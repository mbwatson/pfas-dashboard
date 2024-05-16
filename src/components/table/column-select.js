import PropTypes from 'prop-types'
import {
  Checkbox,
  Dropdown,
  Menu,
  ListItem,
  MenuButton,
  MenuList,
  Stack,
  Typography,
} from '@mui/joy'
import {
  KeyboardArrowDown as ChevronDownIcon,
  ViewColumn as ColumnsIcon,
} from '@mui/icons-material'

export const ColumnSelect = ({ table }) => {
  return (
    <Dropdown>
      <MenuButton
        variant="soft"
        endDecorator={ <ChevronDownIcon /> }
        startDecorator={ <ColumnsIcon /> }
      >Columns</MenuButton>
      <Menu aria-labelledby="column-select" size="sm">
        <MenuList sx={{
          maxWidth: '200px',
          maxHeight: '66vh',
          overflowY: 'auto',
        }}>
          {
            table.getAllColumns().map(columnGroup => {
              return (
                <Stack key={ columnGroup.id }>
                  <Typography
                    level="body-xs"
                    textTransform="uppercase"
                    sx={{ p: 1 }}
                  >{ columnGroup.id.toUpperCase() }</Typography>
                  {
                    columnGroup.columns.map(column => (
                      <ListItem key={ column.id }>
                        <Checkbox
                          label={ column.id }
                          checked={ column.getIsVisible() }
                          onChange={ column.getToggleVisibilityHandler() }
                          variant="soft"
                          size="sm"
                        />
                      </ListItem>
                    ))                    
                  }
                </Stack>
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

