import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { AboutWrapper } from '../pages/about/AboutWrapper'
import { BanDoWrapper } from '../pages/ban-do/BanDoWrapper'
import { DangKyWrapper } from '../pages/auth/DangKyWrapper'
import { DangNhapWrapper } from '../pages/auth/DangNhapWrapper'
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
import ForgotPassword from 'src/app/pages/ForgotPassword'
import ChangePassword from 'src/app/pages/ChangePassword'

export function PrivateRoutes() {
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
        <Route path='/phan-anh-moi' component={HomePage} />
        <Route path='/thong-ke' component={ThongKeWrapper} />
        <Route path='/dang-ky' component={DangKyWrapper} />
        <Route path='/dang-nhap' component={DangNhapWrapper} />
        <Route path='/tuong-tac/:id' component={InteractWrapper} />
        <Route path='/quen-mat-khau' component={ForgotPassword} />
        <Route path='/doi-mat-khau' component={ChangePassword} />
        <Redirect exact from='/' to='/home' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
