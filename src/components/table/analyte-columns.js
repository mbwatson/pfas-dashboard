import {
  createColumnHelper,
} from '@tanstack/react-table'
import { Latex } from '@components/latex'
import { ExternalLinkIcon } from '@components/link'

const columnHelper = createColumnHelper()


//

export const analyteColumns = [
  columnHelper.accessor('chemical_name', {
    id: 'chemical_name',
    header: 'Name',
    footer: 'Name',
  }),
  columnHelper.accessor('abbreviation', {
    id: 'abbreviation',
    footer: 'Abbreviation',
    header: 'Abbreviation',
  }),
  {
    id: 'formula',
    accessorFn: row => row.formula_latex,
    cell: props => <Latex>{ props.row.original.formula_latex }</Latex>,
    header: 'Formula',
    footer: 'Formula',
  },
  {
    id: 'dtxsid',
    accessorKey: 'dtxsid',
    cell: ({ row }) => <span>
      { row.original.dtxsid }
      <a
        href={ `https://comptox.epa.gov/dashboard/chemical/details/${ row.original.dtxsid }` }
        target="_blank"
        rel="noopener noreferrer"
      ><ExternalLinkIcon /></a>
    </span>,
    header: 'DTXSID',
    footer: 'DTXSID',
  },
]
