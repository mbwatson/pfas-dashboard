import { useCallback, useMemo, useState } from 'react'
import { Box, Button, ButtonGroup, Checkbox, Dropdown, Input, Menu, List, ListItem, MenuButton, Option, Select, Sheet } from '@mui/joy'
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

const sampleProperties = [
  'id',
  'pfba_concentration',
  'pfba_dl',
  'pfba_flags',
  'pfba_mrl',
  'pfbs_concentration',
  'pfbs_dl',
  'pfbs_flags',
  'pfbs_mrl',
  'pfda_concentration',
  'pfda_dl',
  'pfda_flags',
  'pfda_mrl',
  'pfdoa_concentration',
  'pfdoa_dl',
  'pfdoa_flags',
  'pfdoa_mrl',
  'pfds_concentration',
  'pfds_dl',
  'pfds_flags',
  'pfds_mrl',
  'pfhpa_concentration',
  'pfhpa_dl',
  'pfhpa_flags',
  'pfhpa_mrl',
  'pfhps_concentration',
  'pfhps_dl',
  'pfhps_flags',
  'pfhps_mrl',
  'pfhxa_concentration',
  'pfhxa_dl',
  'pfhxa_flags',
  'pfhxa_mrl',
  'pfhxs_concentration',
  'pfhxs_dl',
  'pfhxs_flags',
  'pfhxs_mrl',
  'pfna_concentration',
  'pfna_dl',
  'pfna_flags',
  'pfna_mrl',
  'pfns_concentration',
  'pfns_dl',
  'pfns_flags',
  'pfns_mrl',
  'pfoa_concentration',
  'pfoa_dl',
  'pfoa_flags',
  'pfoa_mrl',
  'pfos_concentration',
  'pfos_dl',
  'pfos_flags',
  'pfos_mrl',
  'pfpea_concentration',
  'pfpea_dl',
  'pfpea_flags',
  'pfpea_mrl',
  'pfpes_concentration',
  'pfpes_dl',
  'pfpes_flags',
  'pfpes_mrl',
  'pfunda_concentration',
  'pfunda_dl',
  'pfunda_flags',
  'pfunda_mrl',
  'sample',
]

const columns = sampleProperties.map(
  property => columnHelper.accessor(property, {
    cell: info => info.getValue(),
  })
)

export const TableView = () => {
  const data = useData()
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })

  const tableData = useMemo(() => {
    if (!data) {
      return []
    }
    return ['dust', 'water', 'serum',/* 'pfasData'*/]
      .reduce((everything, key) => {
        everything.push(...data[key].data)
        return everything
      }, [])
  }, [data])

  const handleChangePageSize = (event, newPageSize) => {
    table.setPageSize(newPageSize)    
  }

  const table = useReactTable({
    data: tableData,
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

  const Pagination = useCallback(() => (
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
        <MenuButton variant="soft">COLUMNS</MenuButton>
        <Menu>
          <List>
            {
              table.getAllLeafColumns().map(column => {
                return (
                  <ListItem key={ column.id }>
                    <Checkbox
                      label={ column.id }
                      checked={ column.getIsVisible() }
                      onChange={ column.getToggleVisibilityHandler() }
                      variant="soft"
                    />
                  </ListItem>
                )
              })
            }
          </List>
        </Menu>
      </Dropdown>
    </Box>
  ), [pagination])

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
        <Pagination />
        <table className={ !data ? 'loading' : 'loaded' }>
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