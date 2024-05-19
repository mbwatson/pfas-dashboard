import PropTypes from 'prop-types'
import { Button } from '@mui/joy'
import {
  FileDownload as ExportIcon,
} from '@mui/icons-material'
import { mkConfig, generateCsv, download } from 'export-to-csv'

const csvConfig = mkConfig({ useKeysAsHeaders: true })

export const ExportButton = ({ table }) => {
  const handleClickDownload = () => {
    const rows = table.getFilteredRowModel().rows.map(r => r.original)
    const csv = generateCsv(csvConfig)(rows)
    download(csvConfig)(csv)
  }

  return (
    <Button
      onClick={ handleClickDownload }
      size="sm"
      variant="outlined"
      color="neutral"
      startDecorator={ <ExportIcon fontSize="sm" /> }
    >CSV</Button>
  )
}

ExportButton.propTypes = {
  table: PropTypes.object.isRequired,
}
