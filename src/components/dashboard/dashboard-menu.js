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
      sx={{
        '--List-gap': '8px',
        '--List-flex': 1,
        justifyContent: 'flex-end',
        p: 0,
        '.MuiListItemButton-root': {
          transition: 'background-color 250ms',
          borderRadius: 'sm',
          '&[aria-current="page"]': {
            pointerEvents: 'none',
            backgroundColor: 'var(--joy-palette-primary-outlinedActiveBg)',
            color: 'var(--joy-palette-common-white)',
            '.MuiSvgIcon-root': {
              fill: 'var(--joy-palette-common-white)',
            },
          },
        },
      }}
    >
      {
        menuItems.map(({ Icon, label, path }) => (
          <ListItem role="none" key={ path }>
            <ListItemButton
              variant="soft"
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
