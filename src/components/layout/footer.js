import { Sheet, Typography } from '@mui/joy'
import { usePreferences } from '@context'

//

export const Footer = () => {
  const preferences = usePreferences()

  return (
    <Sheet
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        height: '200px',
        borderColor: preferences.colorMode.light ? 'primary.100' : 'primaryDark.800',
        backgroundColor: preferences.colorMode.light ? 'primary.50' : 'primaryDark.900',
      }}
    >
      <Typography>
        &copy; { new Date().getFullYear() }
      </Typography>
    </Sheet>
  )
}
