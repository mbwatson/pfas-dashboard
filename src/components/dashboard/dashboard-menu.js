import {
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
} from '@mui/joy'
import {
  DonutSmall as ChartIcon,
  TableRows as TableIcon,
} from '@mui/icons-material'
import { Link } from '@components/link'

const menuItems = [
  { id: 'table', path: 'table', label: 'Table', Icon: TableIcon },
  { id: 'chart', path: 'chart', label: 'Chart', Icon: ChartIcon },
]

export const DashboardMenu = () => {

  return (
    <List
      role="menubar"
      orientation="horizontal"
      color="primary"
      variant="plain"
      sx={{
        '--List-radius': '8px',
        '--List-padding': '4px',
        '--List-gap': '8px',
        '--ListItem-gap': '0px',
        justifyContent: 'flex-end',
        gap: 0,
        p: 0,
        '.MuiListItemButton-root': {
          transition: 'background-color 250ms',
          borderRadius: 'sm',
          '&[aria-current="page"]': {
            pointerEvents: 'none',
            backgroundColor: 'var(--joy-palette-primary-solidActiveBg)',
          },
        },
      }}
    >
      {
        menuItems.map(({ Icon, label, path }) => (
          <ListItem role="none" key={ path }>
            <ListItemButton
              variant={"solid"}
              role="menuitem"
              component={ Link }
              nav to={ path }
              aria-label={ label }
            >
              <ListItemDecorator>
                <Icon />
              </ListItemDecorator>
              { label }
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
  )
}
