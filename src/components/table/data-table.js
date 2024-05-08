import { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Sheet } from '@mui/joy'
import {
  flexRender,
} from '@tanstack/react-table'
import { DebouncedInput } from './debounced-input'

export const DataTable = ({ table }) => {
  return (
    <Sheet
      variant="soft"
      component="table"
      sx={{
        overflow: 'scroll',
        border: '1px solid #333',
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
      }}
    >
      <thead>
        { table.getHeaderGroups().map(headerGroup => (
          <tr key={ headerGroup.id }>
            { headerGroup.headers.map(header => (
              <th
                key={ header.id }
                colSpan={header.colSpan}
              >
                { header.isPlaceholder ? null : (
                  <span className="sortable" { ...{
                    onClick: header.column.getToggleSortingHandler(),
                  } }>
                    { flexRender(header.column.columnDef.header, header.getContext()) }
                    {{ asc: ' 🔼', desc: ' 🔽' }[header.column.getIsSorted()] ?? null }
                  </span>
                ) }
                { header.column.getCanFilter() ? (
                  <div className="filter">
                    <Filter column={ header.column } />
                  </div>
                ) : null }
              </th>
            )) }
          </tr>
        )) }
      </thead>

      <tbody>
        { table.getRowModel().rows.map(row => (
          <tr key={ row.id }>
            { row.getVisibleCells().map(cell => {
              return (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              )}) }
          </tr>
        )) }
      </tbody>
      
      <tfoot>
        { table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            { footerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                { header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                ) }
              </th>
            )) }
          </tr>
        )) }
      </tfoot>          
    </Sheet>
  )
}

DataTable.propTypes = {
  table: PropTypes.object.isRequired,
}

//

function Filter({ column }) {
  const { filterVariant } = column.columnDef.meta ?? {}

  const columnFilterValue = column.getFilterValue()
  
  const sortedUniqueValues = useMemo(() => filterVariant === 'range'
    ? []
    : Array.from(column.getFacetedUniqueValues().keys())
      .sort()
      .slice(0, 5_000),
  [column.getFacetedUniqueValues(), filterVariant])

  return filterVariant === 'range' ? (
    <div>
      <DebouncedInput
        type="number"
        min={ Number(column.getFacetedMinMaxValues()?.[0] ?? '') }
        max={ Number(column.getFacetedMinMaxValues()?.[1] ?? '') }
        value={ columnFilterValue?.[0] ?? '' }
        onChange={ value => column.setFilterValue(old => [value, old?.[1]]) }
        placeholder={`Min ${
          column.getFacetedMinMaxValues()?.[0] !== undefined
            ? `(${ column.getFacetedMinMaxValues()?.[0] })`
            : ''
        }`}
      />
      <DebouncedInput
        type="number"
        min={ Number(column.getFacetedMinMaxValues()?.[0] ?? '') }
        max={ Number(column.getFacetedMinMaxValues()?.[1] ?? '') }
        value={ columnFilterValue?.[1] ?? '' }
        onChange={ value => column.setFilterValue(old => [old?.[0], value]) }
        placeholder={ `Max ${
          column.getFacetedMinMaxValues()?.[1]
            ? `(${ column.getFacetedMinMaxValues()?.[1] })`
            : ''
        }` }
      />
    </div>
  ) : filterVariant === 'select' ? (
    <select
      onChange={ e => column.setFilterValue(e.target.value) }
      value={ columnFilterValue }
    >
      <option value="">All</option>
      {
        sortedUniqueValues.map(value => (
          <option value={ value } key={ value }>{ value }</option>
        ))
      }
    </select>
  ) : filterVariant === 'text' ? (
    <Fragment>
      {/* autocomplete suggestions from faceted selections */}
      <datalist id={ column.id + 'list' }>
        { sortedUniqueValues.map(value => <option value={ value } key={ value } />) }
      </datalist>
      <DebouncedInput
        type="text"
        value={ columnFilterValue ?? '' }
        onChange={ value => column.setFilterValue(value) }
        placeholder={ `Search... (${ column.getFacetedUniqueValues().size })` }
        list={ column.id + 'list' }
      />
      <div />
    </Fragment>
  ) : (
    <div>NONE</div>
  )
}

Filter.propTypes = {
  column: PropTypes.object.isRequired,
}

//

