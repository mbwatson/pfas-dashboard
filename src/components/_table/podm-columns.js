import {
  createColumnHelper,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

//

export const podmColumns = [
  columnHelper.group({
    id: 'sample',
    header: 'Sample',
    footer: 'Sample',
    columns: [
      columnHelper.accessor('sample_id', {            cell: info => info.getValue(), header: 'Sample ID',      footer: 'Sample ID',       meta: { filterVariant: 'range' },    size: 100 }),
      columnHelper.accessor('sample', {               cell: info => info.getValue(), header: 'Sample',         footer: 'Sample',          meta: { filterVariant: 'text' } }),
      columnHelper.accessor('study', {                cell: info => info.getValue(), header: 'Study',          footer: 'Study',           meta: { filterVariant: 'select' } }),
      columnHelper.accessor('pi', {                   cell: info => info.getValue(), header: 'PI',             footer: 'PI',              meta: { filterVariant: 'select' } }),
      columnHelper.accessor('units', {                cell: info => info.getValue(), header: 'Units',          footer: 'Units',           meta: { filterVariant: 'select' } }),
      columnHelper.accessor('medium', {               cell: info => info.getValue(), header: 'Medium',         footer: 'Medium',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'location',
    header: 'Location',
    footer: 'Location',
    columns: [
      columnHelper.accessor('city', {                 cell: info => info.getValue(), header: 'City',          footer: 'City',             meta: { filterVariant: 'text' }  }),
      columnHelper.accessor('state', {                cell: info => info.getValue(), header: 'State',         footer: 'State',            meta: { filterVariant: 'text' },    size: 45  }),
      columnHelper.accessor('zipcode', {              cell: info => info.getValue(), header: 'ZIP Code',      footer: 'ZIP Code',         meta: { filterVariant: 'text' },    size: 75  }),
    ],
  }),
  columnHelper.group({
    id: 'pfna',
    header: 'PFNA',
    footer: 'PFNA',
    columns: [
      columnHelper.accessor('pfna_concentration', {   cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfna_mrl', {             cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfna_dl', {              cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfna_flags', {           cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfds',
    header: 'PFDS',
    footer: 'PFDS',
    columns: [
      columnHelper.accessor('pfds_concentration', {   cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfds_mrl', {             cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfds_dl', {              cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfds_flags', {           cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfhxa',
    header: 'PFHXA',
    footer: 'PFHXA',
    columns: [
      columnHelper.accessor('pfhxa_concentration', {  cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxa_mrl', {            cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxa_dl', {             cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxa_flags', {          cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfoa',
    header: 'PFOA',
    footer: 'PFOA',
    columns: [
      columnHelper.accessor('pfoa_concentration', {   cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfoa_mrl', {             cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfoa_dl', {              cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfoa_flags', {           cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfos',
    header: 'PFOS',
    footer: 'PFOS',
    columns: [
      columnHelper.accessor('pfos_concentration', {   cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfos_mrl', {             cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfos_dl', {              cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfos_flags', {           cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfba',
    header: 'PFBA',
    footer: 'PFBA',
    columns: [
      columnHelper.accessor('pfba_concentration', {   cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfba_mrl', {             cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfba_dl', {              cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfba_flags', {           cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfdoa',
    header: 'PFDOA',
    footer: 'PFDOA',
    columns: [
      columnHelper.accessor('pfdoa_concentration', {  cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfdoa_mrl', {            cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfdoa_dl', {             cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfdoa_flags', {          cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfpea',
    header: 'PFPEA',
    footer: 'PFPEA',
    columns: [
      columnHelper.accessor('pfpea_concentration', {  cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpea_mrl', {            cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpea_dl', {             cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpea_flags', {          cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfhps',
    header: 'PFHPS',
    footer: 'PFHPS',
    columns: [
      columnHelper.accessor('pfhps_concentration', {  cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhps_mrl', {            cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhps_dl', {             cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhps_flags', {          cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfunda',
    header: 'PFUNDA',
    footer: 'PFUNDA',
    columns: [
      columnHelper.accessor('pfunda_concentration', { cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfunda_mrl', {           cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfunda_dl', {            cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfunda_flags', {         cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfbs',
    header: 'PFBS',
    footer: 'PFBS',
    columns: [
      columnHelper.accessor('pfbs_concentration', {   cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfbs_mrl', {             cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfbs_dl', {              cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfbs_flags', {           cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfpes',
    header: 'PFPES',
    footer: 'PFPES',
    columns: [
      columnHelper.accessor('pfpes_concentration', {  cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpes_mrl', {            cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpes_dl', {             cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfpes_flags', {          cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfns',
    header: 'PFNS',
    footer: 'PFNS',
    columns: [
      columnHelper.accessor('pfns_concentration', {   cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfns_mrl', {             cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfns_dl', {              cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfns_flags', {           cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfhpa',
    header: 'PFHPA',
    footer: 'PFHPA',
    columns: [
      columnHelper.accessor('pfhpa_concentration', {  cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhpa_mrl', {            cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhpa_dl', {             cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhpa_flags', {          cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfhxs',
    header: 'PFHXS',
    footer: 'PFHXS',
    columns: [
      columnHelper.accessor('pfhxs_concentration', {  cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxs_mrl', {            cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxs_dl', {             cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfhxs_flags', {          cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfda',
    header: 'PFDA',
    footer: 'PFDA',
    columns: [
      columnHelper.accessor('pfda_concentration', {   cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfda_mrl', {             cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfda_dl', {              cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'range' } }),
      columnHelper.accessor('pfda_flags', {           cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
  columnHelper.group({
    id: 'pfuda',
    header: 'PFUDA',
    footer: 'PFUDA',
    columns: [
      columnHelper.accessor('pfuda_concentration', {  cell: info => info.getValue(), header: 'Concentration',  footer: 'Concentration',  meta: { filterVariant: 'none' } }), // bug
      columnHelper.accessor('pfuda_mrl', {            cell: info => info.getValue(), header: 'MRL',            footer: 'MRL',            meta: { filterVariant: 'none' } }), // bug
      columnHelper.accessor('pfuda_dl', {             cell: info => info.getValue(), header: 'DL',             footer: 'DL',             meta: { filterVariant: 'none' } }), // bug
      columnHelper.accessor('pfuda_flags', {          cell: info => info.getValue(), header: 'Flags',          footer: 'Flags',          meta: { filterVariant: 'select' } }),
    ],
  }),
]

