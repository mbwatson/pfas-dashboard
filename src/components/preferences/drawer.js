import { Fragment } from 'react'
import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  ModalClose,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy'
import {
  Logout as LogoutIcon,
  Tune as MenuIcon,
} from '@mui/icons-material'
import TimeAgo from 'react-timeago'
import { useAppContext } from '@context'
import { ColorModeToggle } from './color-mode-toggle'

export const PreferencesDrawer = () => {
  const { auth, preferences } = useAppContext()

  return (
    <Drawer
      anchor="right"
      size="md"
      open={ preferences.visibility }
      onClose={ preferences.hide }
      slotProps={{
        content: {
          sx: {
            bgcolor: 'transparent',
            p: { lg: 4, md: 2, sm: 1, xs: 0 },
            boxShadow: 'none',
          },
        },
      }}
    >
      <Sheet sx={{
        borderRadius: { xs: 0, sm: 'md' },
        p: 2,
        height: '100%',
        overflow: 'auto',
      }}>
        <Stack
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          gap={ 2 }
        >
          <ModalClose size="lg" />

          {
            auth.isAuthenticated && (
              <Fragment>
                <DialogTitle>Profile</DialogTitle>
                <Stack>
                  <Typography level="title-lg">{ auth.user.name }</Typography>
                  <Typography>Logged in: <TimeAgo date={ auth.user.updated_at } /></Typography>
                </Stack>
                <Stack direction="row" justifyContent="center">
                  <Button
                    variant="soft"
                    onClick={ () => auth.logout() }
                    startDecorator={ <LogoutIcon /> }
                  >LOGOUT</Button>
                </Stack>
              </Fragment>
            )
          }

          <Divider />

          <DialogTitle>Preferences</DialogTitle>

          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography level="title-lg">Color mode:</Typography>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              gap={ 1 }
            >
              <ColorModeToggle />
              <div>
                <Typography level="title-md">
                  Current: <strong>{ preferences.colorMode.current[0].toUpperCase() + preferences.colorMode.current.slice(1) }</strong>
                </Typography>
                <Typography level="body-xs">
                  Switch to <strong>{ preferences.colorMode.other[0].toUpperCase() + preferences.colorMode.other.slice(1) }</strong> mode
                </Typography>
              </div>
            </Stack>
          </DialogContent>

          <Divider />
          
        </Stack>
      </Sheet>
    </Drawer>
  )
}

export const PreferencesToggle = () => {
  const { preferences } = useAppContext()

  return (
    <IconButton
      size="lg"
      color="neutral"
      onClick={ preferences.toggle }
    >
      <MenuIcon />
    </IconButton>
  )
}


// all-in-one button and drawer.
// use this for an ever-present toggle button.
export const Preferences = () => {
  return (
    <Fragment>
      <PreferencesToggle />
      <PreferencesDrawer />
    </Fragment>
  )
}
