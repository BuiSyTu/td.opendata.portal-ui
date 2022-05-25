/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, {FC} from 'react'

import MasterLayout from 'src/components/Layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import { Switch } from 'react-router-dom'

const Routes: FC = () => {
  return (
    <Switch>
      <MasterLayout>
        <PrivateRoutes />
      </MasterLayout>
    </Switch>
  )
}

export {Routes}
