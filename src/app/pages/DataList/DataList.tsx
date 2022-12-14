import { useEffect, useState } from 'react'
import { Col, Divider, Image, Input, Menu, Row, Select, Table, Typography } from 'antd'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import moment from 'moment'

import classNames from 'classnames/bind'
import styles from './DataList.module.scss'

import { categoryApi, datasetApi, organizationApi, providerTypeApi } from 'src/app/apis'

import { toAbsoluteUrl } from 'src/_metronic/helpers'
import { PageTitle } from 'src/_metronic/layout/core'
import useDebounce from 'src/app/hooks/useDebounce'

const { Option } = Select
const { Search } = Input
const { Text } = Typography

const cx = classNames.bind(styles)
console.log({ styles })
console.log({ cx })

const DataList = () => {
  const location = useLocation()
  const history = useHistory()

  const [categories, setCategories] = useState([])
  const [providerTypeId, setProviderTypeId] = useState('')
  const [providerTypes, setProviderTypes] = useState([])
  const [organizationId, setOrganizationId] = useState('')
  const [organizations, setOrganizations] = useState([])

  const [datasets, setDatasets] = useState([])
  const [update, setUpdate] = useState(false)
  const [textSearch, setTextSearch] = useState(() => {
    const params = new URLSearchParams(location?.search)
    return params.get('search') ?? ''
  })
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [top, setTop] = useState(10)

  const debounced = useDebounce(textSearch, 500)

  let { id: categoryId }: any = useParams()
  if (!categoryId) categoryId = ''

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryApi.getAll()
      setCategories(res?.data ?? [])
    }

    const fetchProviderTypes = async () => {
      const res = await providerTypeApi.getAll()
      setProviderTypes(res?.data ?? [])
    }

    const fetchOrganizations = async () => {
      const res = await organizationApi.getAll()
      setOrganizations(res?.data ?? [])
    }

    fetchCategories()
    fetchProviderTypes()
    fetchOrganizations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        setLoading(true)
        const res = await datasetApi.getAll({
          visibility: true,
          ...categoryId && { categoryId },
          ...organizationId && { organizationId },
          ...providerTypeId && { providerTypeId },
          ...debounced && { keyword: encodeURIComponent(debounced) }
        })
        setDatasets(res?.data ?? [])
        setTotal(res?.data?.length ?? 0)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
      setUpdate(false)
    }

    if (update) {
      fetchDatasets()
    }

    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

  useEffect(() => {
    setUpdate(true)
    return () => { }
  }, [skip, top, debounced, categoryId, providerTypeId, organizationId])

  const columns = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: any, index: any) => {
        return (
          <div
            className='pointer'
            key={record.Id}
            style={{ backgroundColor: 'transparent' }}
          >
            <Row style={{ alignItems: 'center', paddingLeft: 10 }}>
              <Link to={`/du-lieu-chi-tiet/${record.id}`}>
                <Text className={cx('dataset-name')}>
                  {record.name}
                </Text>
              </Link>
            </Row>
            <Row style={{ alignItems: 'center', paddingLeft: 10, fontWeight: 400 }}>
              {
                <>
                  <Text style={{ fontSize: 14, color: '#9E9E9E' }}>
                    {record?.createdOn
                      ? moment(record?.createdOn).format('DD/MM/YYYY')
                      : record.lastModifiedOn
                        ? moment(record?.lastModifiedOn).format('DD/MM/YYYY')
                        : ''}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#9E9E9E', paddingInline: 5, paddingBottom: 2 }}>{'|'}</Text>
                </>
              }
              <Text style={{ fontSize: 14, color: '#9E9E9E' }}>{record?.organization?.name ?? ''}</Text>
            </Row>
            <Row style={{ alignItems: 'center', paddingLeft: 10 }}>
              <Text>
                {record?.description ?? 'Ban Qu???n l?? an to??n th???c ph???m ???? N???ng , c??ng khai th??ng tin c??c c?? s??? ?????t ti??u chu???n an to??n v??? sinh th???c ph???m tr??n ?????a b??n th??nh ph??? ???? N???ng (SL t??nh ?????n ng??y 10/5/2022). Ng?????i d??n v?? doanh nghi???p quan t??m c?? th??? tra c???u th??ng tin c??c c?? s??? ?????t'}
              </Text>
            </Row>
          </div>
        )
      }
    },
  ]

  const handleChangeProviderTypeId = (value: string) => {
    setProviderTypeId(value)
  }

  const handleChangeOrganizationId = (value: string) => {
    setOrganizationId(value)
  }

  const handleSearch = (value: string) => {
    setTextSearch(value)
    const newUrl = history.location.pathname + `${debounced.length > 0 ? `?search=${encodeURIComponent(debounced)}` : ''} `
    history.push(newUrl)
  }

  const handleTableChange = async (page: number, pageSize: number) => {
    setCurrent(page)
    setSkip(page * (pageSize - 1))
    setLoading(true)
  }

  const handleSizeChange = (current: number, size: number) => {
    setCurrent(1)
    setSkip(0)
    setTop(size)
    setLoading(true)
  }

  const handleShowTotal = (total: number, range: any) => {
    return `${range[0]}-${range[1]} c???a ${total} d??? li???u`
  }

  return (
    <div className={cx('wrapper')}>
      <PageTitle
        breadcrumbs={[
          {
            title: 'Trang ch???',
            path: '/',
            isActive: true,
            isSeparator: false
          },
        ]}
      >D??? li???u
      </PageTitle>
      <Row justify='center'>
        <Search
          enterButton="T??m ki???m"
          className={cx('search')}
          defaultValue={textSearch}
          size='large'
          placeholder='B???n c???n t??m d??? li???u g???'
          onChange={(event) => {
            setTextSearch(event?.target?.value ?? '')
          }}
          onSearch={(val) => handleSearch(val)}
        />
      </Row >
      <Divider />
      <Row gutter={[30, 20]} justify='center' style={{ marginBottom: 30 }} >
        <Col xl={6} lg={6} md={24} xs={24}  >
          <div className={cx('menu-wrapper')}>
            <div className={cx('menu-header')}>
              <Text className={cx('menu-header-text')}>Nh??m danh m???c</Text>
            </div>
            <div>
              <Menu
                className={cx('menu-list')}
                defaultSelectedKeys={['0']}
                selectedKeys={[`${categoryId}`]}
                mode='inline'
              >
                <Menu.Item
                  key={''}
                  icon={
                    <Image
                      src={`${toAbsoluteUrl('/media/logos/T???t c???.png')}`}
                      className={cx('menu-item-icon')}
                      height={50}
                      width={50}
                      wrapperClassName={cx('me-2')}
                      preview={false}
                    />
                  }
                  className={cx('menu-item')}
                >
                  T???t c???
                  <Link
                    to={`/du-lieu${textSearch.length > 0
                      ? `?search=${encodeURIComponent(textSearch)}`
                      : ''}`} />
                </Menu.Item>
                {
                  categories?.map((i: any) => (
                    <Menu.Item
                      key={i.id}
                      icon={
                        <Image
                          key={`icon-image-${i.id}`}
                          src={`${process.env.REACT_APP_FILE_URL}/${i.imageUrl}`}
                          className={cx('menu-item-icon')}
                          height={50}
                          width={50}
                          wrapperClassName={cx('me-2')}
                          preview={false}
                        />
                      }
                      className={cx('menu-item')}
                    >
                      {i.name}
                      <Link
                        key={`link-${i.id}`}
                        to={`/du-lieu/${i.id}${textSearch.length > 0
                          ? `?search=${encodeURIComponent(textSearch)}`
                          : ''}`} >
                      </Link>
                    </Menu.Item>
                  ))
                }
              </Menu>
            </div>
          </div>
        </Col>
        <Col xl={18} lg={18} md={24} xs={24} >
          <div>
            <Row
              gutter={[20, 20]}
              style={{
                marginBottom: 20
              }}>
              <Col xl={10} md={10} xs={24}>
                <Text className={cx('filter-text')}>T??? ch???c: </Text>
                <Select
                  style={{ width: '100%' }}
                  defaultValue=''
                  onChange={handleChangeOrganizationId}>
                  <Option key={0} value=''>
                    T???t c???
                  </Option>
                  {organizations?.map((item: any) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Col>

              <Col xl={6} md={10} xs={24}>
                <Text className={cx('filter-text')} >H??nh th???c cung c???p: </Text>
                <Select
                  style={{ width: '100%' }}
                  defaultValue=''
                  onChange={handleChangeProviderTypeId}>
                  <Option key={0} value=''>
                    T???t c???
                  </Option>
                  {providerTypes?.map((item: any) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xl={8} md={10} xs={24}>
              </Col>
            </Row>

            <Table
              loading={loading}
              columns={columns}
              dataSource={datasets}
              showHeader={false}
              style={{ backgroundColor: 'transparent' }}
              pagination={{
                total: total,
                defaultPageSize: top,
                pageSizeOptions: ['10', '20', '50'],
                showSizeChanger: true,
                current,
                locale: { items_per_page: '/ trang' },
                onChange: handleTableChange,
                onShowSizeChange: handleSizeChange,
                showTotal: handleShowTotal,
              }}
              locale={{
                emptyText: <div className='py-10 text-muted font-weight-bold'>Kh??ng c?? d??? li???u</div>
              }}
            />
          </div>
        </Col>
      </Row >
    </div>
  )
}

export default DataList