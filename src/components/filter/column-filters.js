import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  ListItemContent,
  Stack,
} from '@mui/joy'
import {
  Circle as IndicatorIcon,
} from '@mui/icons-material'
import { ColumnFilter } from '@components/table'
import { useData } from '@context'

export const ColumnFilters = () => {
  const { podmTable: { table } } = useData()

  return (
    <AccordionGroup>
      {
        table.getAllColumns()
          .map(columnGroup => {
            const activeFilterInGroup = columnGroup.columns.some(col => col.getIsFiltered())

            return (
              <Accordion key={ `col-group-${ columnGroup.id }` }>
                <AccordionSummary>
                  <IndicatorIcon
                    color="primary"
                    sx={{
                      transform: 'scale(0.75)',
                      filter: activeFilterInGroup ? 'opacity(1.0)' : 'opacity(0.1)'
                    }}
                  />
                  <ListItemContent>
                    { columnGroup.id.toUpperCase() }
                  </ListItemContent>
                </AccordionSummary>
                <AccordionDetails sx={{
                  '.column-row': {
                    backgroundColor: 'transparent',
                    transition: 'background-color 250ms',
                    '&:hover': {
                      backgroundColor: 'rgba(var(--joy-palette-primary-mainChannel) / 0.1)',
                    },
                  },
                  '.column-name': {
                    flex: 1,
                  },
                  '.column-filter': {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: 1,
                  },
                }}>
                  {
                    columnGroup.columns
                      .filter(column => column.getCanFilter())
                      .map(column => (
                        <Stack
                          key={ `column-filter-${ column.id }` }
                          className="column-row"
                          direction="row"
                          justifyContent="space-between"
                          gap={ 1 }
                          flex={ 1 }
                          sx={{ p: 1 }}
                        >
                          <div className="column-name">{ column.id.replace(`${ columnGroup.id }_`, ``) }</div>
                          <div className="column-filter">
                            <ColumnFilter column={ column } />
                          </div>
                        </Stack>
                      ))
                  }
                </AccordionDetails>
              </Accordion>
            )
          })
      }
    </AccordionGroup>
  )
}
