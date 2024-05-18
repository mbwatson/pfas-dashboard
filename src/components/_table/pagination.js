import PropTypes from 'prop-types'
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Input,
  Option,
  Select,
  Typography,
} from '@mui/joy'
import {
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
      alignItems: 'center',
      gap: 1,
      'span': { alignSelf: 'center' },
      'input': { alignSelf: 'stretch', width: '4rem' },
      'select': { alignSelf: 'stretch' },
    }}>
      {/* page navigation buttons */}
      <ButtonGroup variant="soft" size="small">
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
      <Typography level="body-sm">
        Page { table.getState().pagination.pageIndex + 1 } {' '}
        of { table.getPageCount() }
      </Typography>

      <Divider orientation="vertical" />

      {/* jump to page */}
      <Typography level="body-sm">Jump to page</Typography>
      <Input
        size="sm"
        type="number"
        defaultValue={table.getState().pagination.pageIndex + 1}
        onChange={ e => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          table.setPageIndex(page)
        } }
        variant="soft"
      />

      {/* page size select */}
      <Select
        value={ table.getState().pagination.pageSize }
        onChange={ handleChangePageSize }
        variant="soft"
        size="sm"
      >
        {[10, 25, 50, 100].map(size => (
          <Option
            key={ size }
            value={ size }
          >{ size } per page</Option>
        ))}
      </Select>
    </Box>
  )
}

Pagination.propTypes = {
  table: PropTypes.object.isRequired,
}

