import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/joy'
import { Footer } from '@components/layout'

const SIZES = {
  sm: '600px',
  md: '800px',
  lg: '1200px',
  xl: '1600px',
}

export const ContentPage = ({ children, maxWidth = 'md', sx }) => {
  return (
    <Fragment>
      <Box sx={{
        flex: 1,
        mt: '5.5rem',
        mb: '4rem',
        px: 2,
        minWidth: SIZES[maxWidth],
        maxWidth: SIZES[maxWidth],
        mx: 'auto',
        ...sx
      }}>
        { children }
      </Box>

      <Footer />
    </Fragment>
  )
}

ContentPage.propTypes = {
  children: PropTypes.node,
  maxWidth: PropTypes.oneOf(Object.keys(SIZES)),
  sx: PropTypes.object,
}
