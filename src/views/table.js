import { useState } from 'react'
import { Button, CircularProgress, Divider, Stack } from '@mui/joy'
import {
  FilterList as FilterIcon,
  Close as ClearFiltersIcon,
} from '@mui/icons-material'
import {
  createColumnHelper,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ContentPage } from '@components/layout'
import { useData } from '@context'
import { DataTable, Pagination } from '@components/table'

const columnHelper = createColumnHelper()

//

const columnHeader = ({ column }) => column.id
const columnFooter = ({ column }) => column.id

const columns = [
  columnHelper.accessor('sample_id', {           cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('sample', {              cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'text' } }),
  columnHelper.accessor('study', {               cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pi', {                  cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('units', {               cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('medium', {              cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('city', {                cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'text' } }),
  columnHelper.accessor('state', {               cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'text' } }),
  columnHelper.accessor('zipcode', {             cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'text' } }),
  columnHelper.accessor('pfna_concentration', {  cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfna_mrl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfna_dl', {             cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfna_flags', {          cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfds_concentration', {  cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfds_mrl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfds_dl', {             cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfds_flags', {          cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfhxa_concentration', { cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfhxa_mrl', {           cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfhxa_dl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfhxa_flags', {         cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfoa_concentration', {  cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfoa_mrl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfoa_dl', {             cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfoa_flags', {          cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfos_concentration', {  cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfos_mrl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfos_dl', {             cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfos_flags', {          cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfba_concentration', {  cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfba_mrl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfba_dl', {             cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfba_flags', {          cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfdoa_concentration', { cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfdoa_mrl', {           cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfdoa_dl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfdoa_flags', {         cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfpea_concentration', { cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfpea_mrl', {           cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfpea_dl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfpea_flags', {         cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfhps_concentration', { cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfhps_mrl', {           cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfhps_dl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfhps_flags', {         cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfunda_concentration', {cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfunda_mrl', {          cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfunda_dl', {           cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfunda_flags', {        cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfbs_concentration', {  cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfbs_mrl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfbs_dl', {             cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfbs_flags', {          cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfpes_concentration', { cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfpes_mrl', {           cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfpes_dl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfpes_flags', {         cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfns_concentration', {  cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfns_mrl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfns_dl', {             cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfns_flags', {          cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfhpa_concentration', { cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfhpa_mrl', {           cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfhpa_dl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfhpa_flags', {         cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfhxs_concentration', { cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfhxs_mrl', {           cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfhxs_dl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfhxs_flags', {         cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfda_concentration', {  cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfda_mrl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfda_dl', {             cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'range' } }),
  columnHelper.accessor('pfda_flags', {          cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
  columnHelper.accessor('pfuda_concentration', { cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'none' } }), // bug
  columnHelper.accessor('pfuda_mrl', {           cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'none' } }), // bug
  columnHelper.accessor('pfuda_dl', {            cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'none' } }), // bug
  columnHelper.accessor('pfuda_flags', {         cell: info => info.getValue(), header: columnHeader, footer: columnFooter, meta: { filterVariant: 'select' } }),
]

export const TableView = () => {
  const { pfasData } = useData()
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 25 })
  const [columnFilters, setColumnFilters] = useState([])
  const [filtersVisibility, setFiltersVisibility] = useState(false)

  const handleToggleFiltersVisibility = () => setFiltersVisibility(!filtersVisibility)

  const table = useReactTable({
    data: pfasData.data,
    columns,
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

        <Button
          variant={ filtersVisibility ? 'soft' : 'outlined' }
          onClick={ handleToggleFiltersVisibility }
          startDecorator={ <FilterIcon /> }
        >{ filtersVisibility ? 'Hide' : 'Show' } Filters</Button>
        <Button
          variant="outlined"
          onClick={ () => table.resetColumnFilters() }
          startDecorator={ <ClearFiltersIcon /> }
        >Clear Filters</Button>
      </Stack>

      <DataTable table={ table } />

      <Stack py={ 2 }>
        <Pagination table={ table } />
      </Stack>
    </ContentPage>
  )
}
