import { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/joy'
import { PngDownloadButton } from './png-download-button'

export const ChartCard = ({ children, title }) => {
  const containerRef = useRef(null)
  
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
        <PngDownloadButton containerRef={ containerRef } />
      </CardActions>
    </Card>
  )
}

ChartCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}
