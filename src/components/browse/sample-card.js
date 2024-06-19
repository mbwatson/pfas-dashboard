import { memo } from 'react'
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

const DetectionIndicator = memo(
  function detectionIndicator({ flag = '' }) {
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
)

DetectionIndicator.propTypes = {
  flag: PropTypes.oneOf(['ND', 'Detect', '<MRL']),
}

export const SampleCard = ({ sample }) => {
  const { analytes } = useData()

  return (
    <Card
      variant="outlined"
      divider={ <Divider /> }
      sx={{
        width: '450px',
        height: '470px',
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
            analytes.map(analyte => (
              <KeyValuePair
                key={ `${ sample.id }-${ analyte.id }` }
                property={ analyte.abbreviation }
                value={ sample[`${ analyte.id }_concentration`] }
                startDecorator={
                  <DetectionIndicator flag={ sample[`${ analyte.id }_flags`] } />
                }
              />
            ))
          }
        </Box>
      </CardContent>

      <Divider />

      <CardContent>
        <Stack
          direction="row"
          justifyContent="center"
          gap={ 2 }
        >
          <Typography
            startDecorator={ <DetectionIndicator flag="ND" /> }
            level="body-xs"
          >ND</Typography>
          <Typography
            startDecorator={ <DetectionIndicator flag="<MRL" /> }
            level="body-xs"
          >{`<`}MRL</Typography>
          <Typography
            startDecorator={ <DetectionIndicator flag="Detect" /> }
            level="body-xs"
          >Detect</Typography>
        </Stack>
      </CardContent>

    </Card>
  )
}

SampleCard.propTypes = {
  sample: PropTypes.object.isRequired,
}
