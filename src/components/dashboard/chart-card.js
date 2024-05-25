import { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/joy'
import {
  FileDownload as DownloadIcon,
} from '@mui/icons-material'
import { saveSvgAsPng } from 'save-svg-as-png'

export const ChartCard = ({ children, title }) => {
  const containerRef = useRef(null)

  const handleClickDownload = () => {
    if (!containerRef.current) {
      return
    }
    const svg = containerRef.current.querySelector('svg')
    saveSvgAsPng(svg, `pfas-samples-${ new Date().toLocaleString() }`, {
      scale: 2,
      format: 'png',
      quality: '0.5',
      download: true,
    })
  }

  return (
    <Card variant="soft">
      <Typography
        level="h3"
        color="primary"
      >{ title }</Typography>

      <Divider />

      <CardContent
        ref={ containerRef }
        sx={{
          position: 'relative',
          minHeight: '500px',
          aspectRatio: '1 / 1',
          maxWidth: '100%',
          '& > div': {
            position: 'absolute',
            height: '100%',
            width: '100%',
          }
        }}
      >{ children }</CardContent>

      <Divider />

      <CardActions buttonFlex="0 1 120px" sx={{ justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={ handleClickDownload }
          startDecorator={ <DownloadIcon fontSize="sm" /> }
        >PNG</Button>
      </CardActions>
    </Card>
  )
}

ChartCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}
