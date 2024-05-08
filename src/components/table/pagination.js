import PropTypes from 'prop-types'
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Dropdown,
  Input,
  Menu,
  ListItem,
  MenuButton,
  MenuList,
  Option,
  Select,
} from '@mui/joy'
import {
  KeyboardArrowDown as ChevronDownIcon,
  FirstPage as FirstIcon,
  NavigateBefore as PreviousIcon,
  NavigateNext as NextIcon,
  LastPage as LastIcon,
} from '@mui/icons-material'

export const Pagination = ({ table }) => {
  const handleChangePageSize = (event, newPageSize) => {
    table.setPageSize(newPageSize)    
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      gap: 2,
      'span': { alignSelf: 'center' },
      'input': { alignSelf: 'stretch', width: '4rem' },
      'select': { alignSelf: 'stretch' },
    }}>
      {/* page navigation buttons */}
      <ButtonGroup variant="soft">
        <Button
          onClick={ () => table.firstPage() }
          disabled={ !table.getCanPreviousPage() }
        ><FirstIcon /></Button>
        <Button
          onClick={ () => table.previousPage() }
          disabled={ !table.getCanPreviousPage() }
        ><PreviousIcon /></Button>
        <Button
          onClick={ () => table.nextPage() }
          disabled={ !table.getCanNextPage() }
        ><NextIcon /></Button>
        <Button
          onClick={ () => table.lastPage() }
          disabled={ !table.getCanNextPage() }
        ><LastIcon /></Button>
      </ButtonGroup>

      {/* current page & total pages */}
      <span className="summary">
        Page { table.getState().pagination.pageIndex + 1 } {' '}
        of { table.getPageCount() }
      </span>

      <span>|</span>

      {/* jump to page */}
      <span className="page-jump">Go to page</span>
      <Input
        type="number"
        defaultValue={table.getState().pagination.pageIndex + 1}
        onChange={e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          table.setPageIndex(page)
        }}
        variant="soft"
      />

      {/* page size select */}
      <Select
        value={ table.getState().pagination.pageSize }
        onChange={ handleChangePageSize }
        variant="soft"
      >
        {[10, 25, 50, 100].map(size => (
          <Option
            key={ size }
            value={ size }
          >{ size } per page</Option>
        ))}
      </Select>

      {/* column visibility select */}
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
    </Box>
  )
}

Pagination.propTypes = {
  table: PropTypes.object.isRequired,
}

