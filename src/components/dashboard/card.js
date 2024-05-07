import PropTypes from 'prop-types'
import { Card, CardContent, Divider, Typography } from '@mui/joy'
import { useAppContext } from '@context'

export const DashboardCard = ({ children, title }) => {
  const { preferences } = useAppContext()

  return (
    <Card
      sx={{
        p: 1,
        textAlign: 'center',
        borderRadius: 'sm',
        height: '400px',
        border: '1px solid',
        borderColor: preferences.colorMode.light ? 'primary.200' : 'primaryDark.700',
        backgroundColor: preferences.colorMode.light ? 'primary.100' : 'primaryDark.800',
        transition: 'border-color 250ms',
        '&:hover': {
          borderColor: preferences.colorMode.light ? 'primary.500' : 'primaryDark.400',
          cursor: 'pointer',
        },
        '.MuiCardContent-root': {
          overflowY: 'auto',
        },
      }}
    >
      {
        typeof title === 'string'
          ? <Typography level="title-lg">{ title }</Typography>
          : title
      }
      <Divider />
      <CardContent>
        { children }
      </CardContent>
    </Card>
  )
}

DashboardCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
}
