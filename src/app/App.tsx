import 'moment/locale/vi'

import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import React, {Suspense} from 'react'

import AuthInit from './modules/auth/redux/AuthInit'
import {BrowserRouter} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {Routes} from './routing/Routes'
import {ToastContainer} from 'react-toastify'
import moment from 'moment'

moment.locale('vi')

type Props = {
  basename: string
}

const App: React.FC<Props> = ({basename}) => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <BrowserRouter basename={basename}>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              <Routes />
              <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export {App}
