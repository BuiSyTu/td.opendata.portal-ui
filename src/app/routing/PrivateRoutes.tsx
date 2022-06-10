import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { FallbackView } from '../../_metronic/partials'

import HomePage from 'src/app/pages/Home'
import DataDetailPage from 'src/app/pages/DataDetail'
import DataListPage from 'src/app/pages/DataList'
import ForgotPasswordPage from 'src/app/pages/ForgotPassword'
import ChangePasswordPage from 'src/app/pages/ChangePassword'
import LoginPage from '../pages/Login'
import RegisterPage from '../pages/Register'
import LogoutPage from '../pages/LogOut'
import AccountPage from '../pages/Account'
import ClientServicePage from '../pages/ClientService'

export default function PrivateRoutes() {
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
