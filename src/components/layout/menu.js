import {
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
} from '@mui/joy'
import {
  DonutSmall as ChartIcon,
  Difference as CompareIcon,
  TableRows as TableIcon,
} from '@mui/icons-material'
import { usePreferences } from '@context'
import { Link } from '@components/link'

const menuItems = [
  { id: 'table',   path: '/',       label: 'Table',   Icon: TableIcon },
  { id: 'chart',   path: 'charts',  label: 'Charts',  Icon: ChartIcon },
  { id: 'compare', path: 'compare', label: 'Compare', Icon: CompareIcon },
]

export const DashboardMenu = () => {
  const preferences = usePreferences()

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
            color: preferences.colorMode.dark
              ? 'var(--joy-palette-common-white)'
              : 'var(--joy-palette-primary-700)',
            '.MuiSvgIcon-root': {
              fill: preferences.colorMode.dark
                ? 'var(--joy-palette-common-white)'
                : 'var(--joy-palette-primary-700)',
            },
          },
        },
      }}
    >
      {
        menuItems.map(({ Icon, label, path }) => (
          <ListItem role="none" key={ path }>
            <ListItemButton
              size="lg"
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
