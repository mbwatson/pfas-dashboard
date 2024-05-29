import PropTypes from 'prop-types'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/joy'
import { Circle as DetectionIcon } from '@mui/icons-material'
import { useData } from '@context'
import { KeyValuePair } from './key-value-pair'

const DetectionIndicator = ({ flag = '' }) => {
  let color = '#99999966'
  switch (flag) {
    case '<MRL':
      color = '#EBC49F'
      break;
    case 'Detect':
      color = '#D37676'
      break;
    default:
      color = '#99999966'
  }
  return (
    <DetectionIcon
      fontSize="sm"
      sx={{ color }}
    />
  )
}

DetectionIndicator.propTypes = {
  flag: PropTypes.oneOf(['ND', 'Detect', '<MRL']),
}

export const SampleCard = ({ sample }) => {
  const { chemicalIds } = useData()

  return (
    <Card
      variant="outlined"
      divider={ <Divider /> }
      sx={{
        width: '450px',
        height: '450px',
        overflow: 'hidden',
      }}
    >
      <Typography
        level="h3"
        endDecorator={ <Chip>{ sample.id }</Chip> }
        justifyContent="space-between"
      >
        { sample.sample_id }
      </Typography>

      <Divider />

      <CardContent sx={{ p: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <KeyValuePair
            property="Location"
            value={ `${ sample.city }, ${ sample.state }  ${ sample.zipcode }` }
          />
          <KeyValuePair property="Group" value={ sample.group_id } />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <KeyValuePair property="Study" value={ sample.study } />
          <KeyValuePair property="Medium" value={ sample.medium } />
        </Stack>
      </CardContent>

      <Divider />

      <CardContent sx={{ p: 0, }}>
        <Typography level="title-lg">
          Analyte concentrations ({ sample.units })
        </Typography>
        <Box sx={{
          mt: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '24px',
        }}>
          {
            chemicalIds.map(analyte => (
              <KeyValuePair
                key={ `${ sample.id }-${ analyte }` }
                property={ analyte }
                value={ sample[`${ analyte }_concentration`] }
                startDecorator={
                  <DetectionIndicator flag={ sample[`${ analyte }_flags`] } />
                }
              />
            ))
          }
        </Box>
      </CardContent>
    </Card>
  )
}

SampleCard.propTypes = {
  sample: PropTypes.object.isRequired,
}
