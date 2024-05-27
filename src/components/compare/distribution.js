import { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Typography,
} from '@mui/joy'

export const Distribution = ({ analyte }) => {
  return (
    <Fragment>
      <Typography level="h4">Distribution of { analyte }</Typography>
    </Fragment>
  )
}

Distribution.propTypes = {
  analyte: PropTypes.string.isRequired,
}
