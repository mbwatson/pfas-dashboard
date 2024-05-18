import PropTypes from 'prop-types'
import {
  Button,
  ButtonGroup,
  Divider,
  Input,
  Option,
  Select,
  Stack,
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
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      gap={ 2 }
      divider={ <Divider orientation="vertical" /> }
      sx={{
        'span': { alignSelf: 'center' },
        'input': { alignSelf: 'stretch', width: '4rem' },
      }}
    >
      {/* current page & total pages */}
      <Stack direction="row" alignItems="center" gap={ 0.5 }>
        <Typography level="body-sm">Page</Typography>
        <Input
          size="sm"
          type="number"
          value={ table.getState().pagination.pageIndex + 1 }
          onChange={ e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          } }
          variant="outlined"
          slotProps={{
            input: {
              min: 1,
              max: table.getPageCount(),
              step: 1,
              style: {
                width: '40px',
              },
            },
          }}
        /> {' '}
        <Typography level="body-sm">of { table.getPageCount() }</Typography>
      </Stack>

      {/* page navigation buttons */}
      <ButtonGroup variant="outlined" size="sm">
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

      {/* page size select */}
      <Select
        value={ table.getState().pagination.pageSize }
        onChange={ handleChangePageSize }
        variant="outlined"
        size="sm"
      >
        {[10, 25, 50, 100].map(size => (
          <Option
            key={ size }
            value={ size }
          >{ size } / page</Option>
        ))}
      </Select>
    </Stack>
  )
}

Pagination.propTypes = {
  table: PropTypes.object.isRequired,
}

