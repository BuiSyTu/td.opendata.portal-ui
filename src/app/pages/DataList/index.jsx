import React from 'react'
import { useEffect, useState } from 'react'
import { Col, Divider, Image, Input, Menu, Row, Select, Table, Typography } from 'antd'
import { Link, useLocation, useParams } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './DataList.module.scss'

import { categoryApi } from 'src/app/apis/category'
import { datasetApi } from 'src/app/apis/dataset'
import { organizationApi } from 'src/app/apis/organization'
import { providerTypeApi } from 'src/app/apis/providertype'

import { toAbsoluteUrl } from 'src/_metronic/helpers'
import { PageTitle } from 'src/_metronic/layout/core'

const { Option } = Select;
const { Search } = Input;
const { Text } = Typography;

const cx = classNames.bind(styles)

const DataList = () => {
  const [categories, setCategories] = useState([])
  const [providerTypeId, setProviderTypeId] = useState('')
  const [providerTypes, setProviderTypes] = useState([])
  const [organizationId, setOrganizationId] = useState('')
  const [organizations, setOrganizations] = useState([])

  const [datasets, setDatasets] = useState([])
  const [update, setUpdate] = useState(false)
  const [textSearch, setTextSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [top, setTop] = useState(10)

  let { id: categoryId } = useParams()
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
          ...categoryId && { categoryId },
          ...organizationId && { organizationId },
          ...providerTypeId && { providerTypeId },
          ...textSearch && { keyWord: textSearch }
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
  }, [skip, top, textSearch, categoryId, providerTypeId, organizationId])

  const columns = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => {
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
                    {/* {record?.createdAt
                      ? moment(record?.createdAt).format('DD/MM/YYYY')
                      : record.ModifiedAt
                      ? moment(record?.modifiedAt).format('DD/MM/YYYY')
                      : ''} */}
                    {'05-05-2022 11:28:22 AM'}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#9E9E9E', paddingInline: 5, paddingBottom: 2 }}>{'|'}</Text>
                </>
              }
              <Text style={{ fontSize: 14, color: '#9E9E9E' }}>{record?.organization?.name ?? ''}</Text>
            </Row>
            <Row style={{ alignItems: 'center', paddingLeft: 10 }}>
              <Text>
                {record?.description ?? 'Ban Quản lý an toàn thực phẩm Đà Nẵng , công khai thông tin các cơ sở đạt tiêu chuẩn an toàn vệ sinh thực phẩm trên địa bàn thành phố Đà Nẵng (SL tính đến ngày 10/5/2022). Người dân và doanh nghiệp quan tâm có thể tra cứu thông tin các cơ sở đạt'}
              </Text>
            </Row>
          </div>
        )
      }
    },
  ]

  const handleChangeProviderTypeId = (value) => {
    setProviderTypeId(value)
  }

  const handleChangeOrganizationId = (value) => {
    setOrganizationId(value)
  }

  const handleSearch = (value) => {
    setTextSearch(value)
  }

  const handleTableChange = async (page, pageSize) => {
    setCurrent(page)
    setSkip(page * (pageSize - 1))
    setLoading(true)
  }

  const handleSizeChange = (current, size) => {
    setCurrent(1)
    setSkip(0)
    setTop(size)
    setLoading(true)
  }

  const handleShowTotal = (total, range) => {
    return `${range[0]}-${range[1]} của ${total} dữ liệu`;
  }

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
        ]}
      >Dữ liệu
      </PageTitle>
      <Row justify='center'>
        <div className={cx('search')}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#424242' }}>Dữ liệu</Text>
          <Search
            size='large'
            placeholder='Bạn cần tìm dữ liệu gì?'
            style={{ borderRadius: 20 }}
            onSearch={(val) => handleSearch(val)}
          />
        </div>
      </Row >
      <Divider />
      <Row gutter={[30, 20]} justify='center' style={{ marginBottom: 30 }} >
        <Col xl={6} lg={6} md={24} xs={24}  >
          <div className={cx('menu')}>
            <div className={cx('menu-header')}>
              <Text className={cx('menu-header-text')}>Nhóm danh mục</Text>
            </div>
            <div>
              <Menu
                className={cx('menu-item')}
                defaultSelectedKeys={['0']}
                selectedKeys={[`${categoryId}`]}
                mode='inline'
              >
                <Menu.Item
                  key={''}
                  icon={
                    <div>
                      <Image
                        src={`${toAbsoluteUrl('/media/logos/Tất cả.png')}`}
                        className={cx('menu-item-icon')}
                        height={50}
                        width={50}
                        preview={false}
                      />
                    </div>
                  }
                  className={cx('menu-item-text')}
                >
                  Tất cả
                  <Link to='/du-lieu' ></Link>
                </Menu.Item>
                {
                  categories.map(i => (
                    <Menu.Item
                      key={i.id}
                      icon={
                        <div>
                          <Image
                            src={`${process.env.REACT_APP_FILE_URL}/${i.imageUrl}`}
                            className={cx('menu-item-icon')}
                            height={50}
                            width={50}
                            preview={false}
                          />
                        </div>
                      }
                      className={cx('menu-item-text')}
                    >{i.name}
                      <Link to={`/du-lieu/${i.id}`} ></Link>
                    </Menu.Item>
                  )
                  )
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
                <Text className={cx('filter-text')}>Tổ chức: </Text>
                <Select
                  style={{ width: '100%' }}
                  defaultValue=''
                  onChange={handleChangeOrganizationId}>
                  <Option key={0} value=''>
                    Tất cả
                  </Option>
                  {organizations?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  )
                  )}
                </Select>
              </Col>

              <Col xl={6} md={10} xs={24}>
                <Text className={cx('filter-text')} >Hình thức cung cấp: </Text>
                <Select
                  style={{ width: '100%' }}
                  defaultValue=''
                  onChange={handleChangeProviderTypeId}>
                  <Option key={0} value=''>
                    Tất cả
                  </Option>
                  {providerTypes?.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    )
                  })}
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
              ellipsis="enable"
              pagination={{
                total: total,
                defaultPageSize: top,
                pageSizeOptions: ['10', '20', '50'],
                onChange: handleTableChange,
                showSizeChanger: true,
                onShowSizeChange: handleSizeChange,
                current,
                showTotal: handleShowTotal,
                locale: { items_per_page: '/ trang' },
              }}
              locale={{
                emptyText: 'Không có dữ liệu'
              }}
            />
          </div>
        </Col>
      </Row >
    </>
  )
}

export default DataList