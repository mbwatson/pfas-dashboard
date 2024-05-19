import { Fragment, useMemo } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { Sheet } from '@mui/joy'
import { AuthMenu } from '@components/auth'
import {
  DashboardHeader,
  DashboardMenu,
  FiltersDrawer,
} from '@components/dashboard'
import { useToggleState } from '@hooks'
import { ChartView } from './chart'
import { TableView } from './table'
import { FiltersDrawerToggle } from '@components/dashboard'

//

export const DashboardView = () => {
  const filtersDrawer = useToggleState(false)

  const headerStartAction = useMemo(() => (
    <FiltersDrawerToggle
      active={ filtersDrawer.enabled }
      onClick={ filtersDrawer.toggle }
    />
  ), [filtersDrawer.enabled])

  const headerEndActions = useMemo(() => [
    <DashboardMenu key="dashboard-menu" />,
    <AuthMenu key="auth-action-button" />,
  ], [])

  return (
    <Fragment>
      <DashboardHeader
        startAction={ headerStartAction }
        endActions={ headerEndActions }
      />
      <Sheet component="main" sx={{
        width: filtersDrawer.enabled ? 'calc(100vw - 360px)' : '100vw',
        marginLeft: filtersDrawer.enabled ? '360px' : '0',
        transition: 'margin-left 250ms ease-out, min-width 250ms ease-out',
        overflow: 'auto',
        position: 'relative',
        pl: '1rem',
        pt: '48px',
      }}>
        <Routes>
          <Route path="table" element={ <TableView /> } />
          <Route path="chart" element={ <ChartView /> } />
          <Route path="*" element={ <Navigate to="table" /> } />
        </Routes>
      </Sheet>
      <FiltersDrawer
        open={ filtersDrawer.enabled }
        onClose={ filtersDrawer.unset }
      />
    </Fragment>
  )
}
