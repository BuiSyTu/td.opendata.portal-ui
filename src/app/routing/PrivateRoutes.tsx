import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { AboutWrapper } from '../pages/about/AboutWrapper'
import { BanDoWrapper } from '../pages/ban-do/BanDoWrapper'
import { FallbackView } from '../../_metronic/partials'
import { FaqDetailWrapper } from '../pages/thong-tin-phan-anh/FaqDetailWrapper'
import { GuideWrapper } from '../pages/guide/GuideWrapper'
import { InteractWrapper } from '../pages/interact/InteractWrapper'
import { MyFaqWrapper } from '../pages/myfaq/MyFaqWrapper'
import { StatisticalWrapper } from '../pages/statistical/StatisticalWrapper'
import { ThongKeWrapper } from '../pages/thong-ke/ThongKeWrapper'

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
        <Route path='/gioi-thieu' component={AboutWrapper} />
        <Route path='/du-lieu/:id?' component={DataListPage} />
        <Route path='/du-lieu-chi-tiet/:id' component={DataDetailPage} />
        <Route path='/thong-tin-phan-anh/:id' component={FaqDetailWrapper} />
        <Route path='/ban-do' component={BanDoWrapper} />
        <Route path='/thong-ke' component={StatisticalWrapper} />
        <Route path='/huong-dan' component={GuideWrapper} />
        <Route path='/phan-anh-ca-nhan' component={MyFaqWrapper} />
        <Route path='/thong-ke' component={ThongKeWrapper} />
        <Route path='/dang-ky' component={RegisterPage} />
        <Route path='/dang-nhap' component={LoginPage} />
        <Route path='/dang-xuat' component={LogoutPage} />
        <Route path='/tuong-tac/:id' component={InteractWrapper} />
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
