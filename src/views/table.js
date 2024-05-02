import { useMemo, useState } from 'react'
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
  Sheet,
} from '@mui/joy'
import {
  KeyboardArrowDown as ChevronDownIcon,
} from '@mui/icons-material'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ContentPage } from '@components/layout'
import { useData } from '@context'

const columnHelper = createColumnHelper()

const Pagination = ({ table }) => {
  const handleChangePageSize = (event, newPageSize) => {
    table.setPageSize(newPageSize)    
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      gap: 2,
      py: 2,
      'span': { alignSelf: 'center' },
      'input': { alignSelf: 'stretch', width: '4rem' },
      'select': { alignSelf: 'stretch' },
      position: 'sticky',
      top: 0,
    }}>
      {/* page navigation buttons */}
      <ButtonGroup variant="soft">
        <Button
          onClick={ () => table.firstPage() }
          disabled={ !table.getCanPreviousPage() }
        >FIRST</Button>
        <Button
          onClick={ () => table.previousPage() }
          disabled={ !table.getCanPreviousPage() }
        >PREV</Button>
        <Button
          onClick={ () => table.nextPage() }
          disabled={ !table.getCanNextPage() }
        >NEXT</Button>
        <Button
          onClick={ () => table.lastPage() }
          disabled={ !table.getCanNextPage() }
        >LAST</Button>
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

export const TableView = () => {
  const { pfasData } = useData()
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })

  const sampleProperties = useMemo(() => {
    if (!pfasData?.data?.length) {
      return []
    }
    return Object.keys(pfasData.data[0])
  }, [pfasData.data])

  const columns = sampleProperties.map(
    property => columnHelper.accessor(property, {
      cell: info => info.getValue(),
    })
  )

  const table = useReactTable({
    data: pfasData.data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
    },
  })

  return (
    <ContentPage sx={{ maxWidth: 'unset', minWidth: '100vw', overflow: 'unset' }}>
      <Sheet sx={{
        width: '100%',
        overflow: 'scroll',
        table: {
          width: '100%',
          border: '1px solid #333',
        },
        '.sortable': {
          cursor: 'pointer',
          '&:hover': {
            filter: 'brightness(1.1)',
          },
        },
        tbody: {
          borderBqottom: '1px solid #333',
        },
        th: {
          borderBottom: '1px solid #333',
          borderRight: '1px solid #333',
          p: 1,
        },
        td: {
          borderBottom: '1px solid #333',
          borderRight: '1px solid #333',
          p: 0.5,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        'tr:first-of-type th': { fontSize: '100%' },
        'tr:nth-of-type(2) th': { fontSize: '75%' },
        tfoot: {
          color: '#666',
        },
        'tfoot th': {
          fontWeight: 'normal',
        },
        'tfoot tr:first-of-type th': { fontSize: '75%' },
        'tfoot tr:nth-of-type(2) th': { fontSize: '100%' },
      }}>
        <Pagination table={ table } />
        
        <table className={ pfasData.isLoading ? 'loading' : 'loaded' }>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    {...{
                      className: header.column.getCanSort() ? 'sortable' : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {
                      header.isPlaceholder ? null : (
                        <span>
                          { flexRender(header.column.columnDef.header, header.getContext()) }
                          {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted()] ?? null }
                        </span>
                      )
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )})}
              </tr>
            ))}
          </tbody>
          
          <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>          
        </table>
      </Sheet>
    </ContentPage>
  )
}