import PropTypes from 'prop-types'
import { Button } from '@mui/joy'
import {
  FileDownload as ExportIcon,
} from '@mui/icons-material'
import { mkConfig, generateCsv, download } from 'export-to-csv'

const csvConfig = mkConfig({ useKeysAsHeaders: true })

export const CsvExportButton = ({ data }) => {
  const handleClickDownload = () => {
    const csv = generateCsv(csvConfig)(data)
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

CsvExportButton.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
}
