import DataListPage from './list'
import { PageTitle } from 'src/_metronic/layout/core'

const DataWrapper = () => {
  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: 'Trang chủ',
            path: '/',
            isActive: true,
            isSeparator: false
          },
          {
            title: 'Dữ liệu',
            path: 'du-lieu',
            isActive: false,
            isSeparator: false
          }
        ]}
      >  Dữ liệu
      </PageTitle>
      <DataListPage />
    </>
  )
}


export { DataWrapper }

