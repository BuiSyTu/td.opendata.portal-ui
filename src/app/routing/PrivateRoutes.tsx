import React, {Suspense} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import {AboutWrapper} from '../pages/about/AboutWrapper'
import {BanDoWrapper} from '../pages/ban-do/BanDoWrapper'
import {DangKyWrapper} from '../pages/auth/DangKyWrapper'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import DataDetailPage from 'src/app/pages/data-detail'
import DataListPage from 'src/app/pages/data-list'
import {FallbackView} from '../../_metronic/partials'
import {FaqDetailWrapper} from '../pages/thong-tin-phan-anh/FaqDetailWrapper'
import {GuideWrapper} from '../pages/guide/GuideWrapper'
import {InteractWrapper} from '../pages/interact/InteractWrapper'
import {MyFaqWrapper} from '../pages/myfaq/MyFaqWrapper'
import {StatisticalWrapper} from '../pages/statistical/StatisticalWrapper'
import {ThongKeWrapper} from '../pages/thong-ke/ThongKeWrapper'

export function PrivateRoutes() {
  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/home' component={DashboardWrapper} />
        <Route path='/gioi-thieu' component={AboutWrapper} />
        <Route path='/du-lieu/:id?' component={DataListPage} />
        <Route path='/du-lieu-chi-tiet/:id' component={DataDetailPage} />
        <Route path='/thong-tin-phan-anh/:id' component={FaqDetailWrapper} />
        <Route path='/ban-do' component={BanDoWrapper} />
        <Route path='/thong-ke' component={StatisticalWrapper} />
        <Route path='/huong-dan' component={GuideWrapper} />
        <Route path='/phan-anh-ca-nhan' component={MyFaqWrapper} />
        <Route path='/phan-anh-moi' component={DashboardWrapper} />
        <Route path='/thong-ke' component={ThongKeWrapper} />
        <Route path='/dang-ky' component={DangKyWrapper} />
        <Route path='/tuong-tac/:id' component={InteractWrapper} />
        <Redirect exact from='/' to='/home' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
