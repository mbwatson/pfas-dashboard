import PropTypes from 'prop-types'
import { Card, CardContent, Typography } from '@mui/joy'
import { useAppContext } from '@context'

export const DashboardCard = ({ children, title }) => {
  const { preferences } = useAppContext()

  return (
    <Card
      sx={{
        p: 1,
        textAlign: 'center',
        borderRadius: 'sm',
        height: '600px',
        border: '1px solid',
        borderColor: preferences.colorMode.light ? 'primary.200' : 'primaryDark.700',
        backgroundColor: preferences.colorMode.light ? 'primary.100' : 'primaryDark.800',
        transition: 'border-color 250ms',
        '&:hover': {
          borderColor: preferences.colorMode.light ? 'primary.500' : 'primaryDark.400',
        },
        '.header': {
          height: '50px',
          overflow: 'hidden',
          '.MuiTypography-root': {
            pl: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
        '.content': {
          overflowY: 'auto',
        },
      }}
    >
      {
        typeof title === 'string'
          ? <Typography level="h3">{ title }</Typography>
          : title
      }

      <CardContent className="content">
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
