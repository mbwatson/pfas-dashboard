import { useCallback, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/joy'
import {
  FilterList as FilterIcon,
} from '@mui/icons-material'
import { useData } from '@context'
import {
  ClearFiltersButton,
  ColumnSelect,
  DataTable,
  Pagination,
} from '@components/dashboard'

export const TableView = () => {
  const { pfasData, podmTable } = useData()
  const [filtersVisibility, setFiltersVisibility] = useState(false)
  const { table, columnFilters } = podmTable

  const handleToggleFiltersVisibility = () => setFiltersVisibility(!filtersVisibility)

  const FilterControls = useCallback(() => [
    <Button
      key="visibility-toggle"
      variant={ filtersVisibility ? 'soft' : 'outlined' }
      size="sm"
      onClick={ handleToggleFiltersVisibility }
      startDecorator={ <FilterIcon fontSize="sm" /> }
    >{ filtersVisibility ? 'Hide' : 'Show' } Filters</Button>,
    <ClearFiltersButton key="clear-selections" />,
  ], [columnFilters, filtersVisibility])

  if (pfasData.isLoading) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 'calc(100px + 5rem)' }}
      >
        <CircularProgress size="lg" />
      </Stack>
    )
  }

  const SampleCount = useCallback(() => (
    <Typography>
      { table.getPrePaginationRowModel().rows.length } samples
    </Typography>
  ), [table.getPrePaginationRowModel().rows.length])

  return (
    <Box sx={{
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
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={ 2 }
        divider={ <Divider orientation="vertical" /> }
        sx={{
          position: 'sticky',
          left: '1rem',
          my: 1,
          py: 1,
          display: 'inline-flex'
        }}
      >
        <SampleCount />
        <Pagination table={ table } />
        <ColumnSelect table={ table } />
        <FilterControls />
      </Stack>

      <DataTable table={ table } />

      <Stack
        direction="row"
        py={ 2 }
        gap={ 2 }
        divider={ <Divider orientation="vertical" /> }
      >
        <SampleCount />
        <Pagination table={ table } />
      </Stack>
    </Box>
  )
}
