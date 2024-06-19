import PropTypes from 'prop-types'
import { Button } from '@mui/joy'
import { FileDownload as DownloadIcon } from '@mui/icons-material'
import { saveSvgAsPng } from 'save-svg-as-png'

export const PngDownloadButton = ({ containerRef }) => {
  const handleClickDownload = () => {
    if (!containerRef.current) {
      return
    }
    const svg = containerRef.current.querySelector('svg')
    saveSvgAsPng(svg, new Date().toLocaleString(), {
      scale: 2,
      format: 'png',
      quality: '0.5',
      download: true,
      backgroundColor: '#ffffff',
    })
  }
  
  return (
    <Button
      variant="outlined"
      color="neutral"
      size="sm"
      onClick={ handleClickDownload }
      startDecorator={ <DownloadIcon fontSize="sm" /> }
    >PNG</Button>
  )
}

PngDownloadButton.propTypes = {
  containerRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func, 
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ])
}