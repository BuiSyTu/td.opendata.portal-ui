import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { FallbackView } from '../../_metronic/partials'

export default function PrivateRoutes() {
  const HomePage = lazy(() => import('src/app/pages/Home'))
  const DataDetailPage = lazy(() => import('src/app/pages/DataList'))
  const DataListPage = lazy(() => import('src/app/pages/DataList'))
  const ForgotPasswordPage = lazy(() => import('src/app/pages/ForgotPassword'))
  const ChangePasswordPage = lazy(() => import('src/app/pages/ChangePassword'))
  const LoginPage = lazy(() => import('../pages/Login'))
  const RegisterPage = lazy(() => import('../pages/Register'))
  const LogoutPage = lazy(() => import('../pages/LogOut'))
  const AccountPage = lazy(() => import('../pages/Account'))
  const ClientServicePage = lazy(() => import('../pages/ClientService'))



  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route path='/du-lieu/:id?' component={DataListPage} />
        <Route path='/du-lieu-chi-tiet/:id' component={DataDetailPage} />
        <Route path='/dang-ky' component={RegisterPage} />
        <Route path='/dang-nhap' component={LoginPage} />
        <Route path='/dang-xuat' component={LogoutPage} />
        <Route path='/quen-mat-khau' component={ForgotPasswordPage} />
        <Route path='/doi-mat-khau' component={ChangePasswordPage} />
        <Route path='/tai-khoan' component={AccountPage} />
        <Route path='/quan-ly-dich-vu' component={ClientServicePage} />
        <Redirect exact from='/' to='/home' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
