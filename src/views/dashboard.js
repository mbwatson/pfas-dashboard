import { useCallback, useState } from 'react'
import { Button, CircularProgress, Divider, Stack } from '@mui/joy'
import {
  FilterList as FilterIcon,
  Close as ClearFiltersIcon,
} from '@mui/icons-material'
import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useData } from '@context'
import { ContentPage } from '@components/layout'
import { ColumnSelect, DataTable, Pagination, podmColumns } from '@components/table'

export const TableView = () => {
  const { pfasData } = useData()
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [columnFilters, setColumnFilters] = useState([])
  const [filtersVisibility, setFiltersVisibility] = useState(false)

  const handleToggleFiltersVisibility = () => setFiltersVisibility(!filtersVisibility)

  const FilterControls = useCallback(() => [
    <Button
      key="visibility-toggle"
      variant={ filtersVisibility ? 'soft' : 'outlined' }
      onClick={ handleToggleFiltersVisibility }
      startDecorator={ <FilterIcon /> }
    >{ filtersVisibility ? 'Hide' : 'Show' } Filters</Button>,
    <Button
      key="clear-selections"
      variant="outlined"
      onClick={ () => table.resetColumnFilters() }
      startDecorator={ <ClearFiltersIcon /> }
    >Clear Filters</Button>,
  ], [columnFilters, filtersVisibility])

  const table = useReactTable({
    data: pfasData.data,
    columns: podmColumns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    state: {
      columnFilters,
      pagination,
      sorting,
    },
  })

  if (pfasData.isLoading) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 'calc(100px + 5rem)' }}
      >
        <CircularProgress />
      </Stack>
    )
  }

  return (
    <ContentPage sx={{
      maxWidth: 'unset',
      minWidth: '100vw',
      overflow: 'unset',
      '.filter': {
        maxHeight: filtersVisibility ? '48px' : 0,
        overflow: 'hidden',
        transition: 'max-height 250ms',
      }
    }}>
      <Stack
        variant="outlined"
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={ 2 }
        sx={{
          position: 'sticky',
          left: '1rem',
          my: 1,
          py: 1,
          display: 'inline-flex'
        }}
      >
        <Pagination table={ table } />

        <Divider orientation="vertical" />

        <ColumnSelect table={ table } />

        <Divider orientation="vertical" />

        <FilterControls />

      </Stack>

      <DataTable table={ table } />

      <Stack py={ 2 }>
        <Pagination table={ table } />
      </Stack>
    </ContentPage>
  )
}
