import { useCallback } from 'react'
import {
  Divider, Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem,
} from '@mui/joy'
import {
  Room as LocationMarker,
  LocationSearching as CrosshairsIcon,
} from '@mui/icons-material'
import { useMap } from '@context'

export const LocationSelect = () => {
  const { mapRef, locationPresets } = useMap()

  const navigateTo = useCallback(({ latitude, longitude }) => {
    if (!mapRef.current){
      return
    }
    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 12,
      duration: 2000,
    })
  }, [mapRef.current])

  const handleSelect = useCallback(({ longitude, latitude }) => () => {
    navigateTo({ longitude, latitude })
  }, [mapRef.current])

  const handleClickMyLocation = () => {
    if (navigator.geolocation) {
      // get the user's current location
      navigator.geolocation.getCurrentPosition(
        // save the geolocation coordinates in two variables
        position => {
          const { latitude, longitude } = position.coords
          navigateTo({ latitude, longitude })
        },
        // if there was an error getting the user's location
        error => {
          console.error('Error getting user location:', error);
        }
      )
    }
    // if geolocation is not supported by the users browser
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  return (
    <Dropdown>
      <MenuButton>
        <CrosshairsIcon />
      </MenuButton>
      <Menu>
        {
          locationPresets.map(({ latitude, longitude, label }) => (
            <MenuItem
              key={ label }
              onClick={ handleSelect({ latitude, longitude }) }
            >
              <ListItemDecorator><LocationMarker /></ListItemDecorator>
              { label }
            </MenuItem>
          ))
        }
        <Divider />
        <MenuItem
          key="my-location"
          onClick={ handleClickMyLocation }
        >
          <ListItemDecorator><CrosshairsIcon /></ListItemDecorator>
          My Location
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
