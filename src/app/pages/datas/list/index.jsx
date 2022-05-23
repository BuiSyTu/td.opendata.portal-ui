import { Col, Divider, Image, Input, Menu, Row, Select, Table, Typography } from 'antd'
import { setCategoryId, setDatasetId } from 'src/setup/redux/dataset/Slice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import React from 'react'
import { categoryApi } from 'src/app/apis/category'
import classNames from 'classnames/bind'
import { datasetApi } from 'src/app/apis/dataset'
import { organizationApi } from 'src/app/apis/organization'
import { providerTypeApi } from 'src/app/apis/providertype'
import styles from './DataListPage.module.scss'
import { toAbsoluteUrl } from 'src/_metronic/helpers'

/* eslint-disable jsx-a11y/anchor-is-valid */

const { Option } = Select;
const { Search } = Input;
const { Text } = Typography;

const cx = classNames.bind(styles)

const DataListPage = () => {
  const dispatch = useDispatch()
  const categoryId = useSelector(state => state.dataset.categoryId)

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

  useEffect(() => {
    const fetchDatasets = async() => {
      try {
        setLoading(true)
        const res = await datasetApi.getAll({
          categoryId,
          organizationId,
          providerTypeId,
          ...textSearch && {keyWord: textSearch}
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
    
    return () => {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update])

  useEffect(() => {
    setUpdate(true)
    return () => {}
  }, [skip, top, textSearch])

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

    return () => {
      dispatch(setCategoryId(''))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickDatasetId = (datasetId) => {
    dispatch(setDatasetId(datasetId))
  }

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
            onClick={() => {
              handleClickDatasetId(record.id)
            }}
            style={{ backgroundColor: 'transparent' }}
          >
            <Row style={{ alignItems: 'center', paddingLeft: 10 }}>
              <Link to='/du-lieu-chi-tiet'>
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

  const handleChangeCategoryId = ({key}) => {
    dispatch(setCategoryId(key))
    setUpdate(true)
  }

  const handleChangeProviderTypeId = (value) => {
    setProviderTypeId(value)
    setUpdate(true)
  }

  const handleChangeOrganizationId = (value) => {
    setOrganizationId(value)
    setUpdate(true)
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
      <Row justify='center'>
        <div className={cx('search')}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#424242' }}>Dữ liệu</Text>
          <Search
            size='large'
            placeholder='Bạn cần tìm dữ liệu gì?'
            style={{ borderRadius: 20 }}
            onSearch={(val) => { handleSearch(val) }}
          />
        </div>
      </Row >
      <Divider />
      <Row gutter={[30, 20]} justify='center' style={{ marginBottom: 30 }} >
        <Col xl={6} lg={6} md={24} xs={24}  >
          <div className={cx('menu')}>
            <div style={{ backgroundColor: '#1E88E5 ', textAlign: 'center', padding: '5px 0' }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '500',
                color: '#fff'
              }}>Nhóm danh mục</Text>
            </div>
            <div style={{}}>
              <Menu
                onClick={handleChangeCategoryId}
                className={cx('menu-item')}
                defaultSelectedKeys={['0']}
                selectedKeys={[`${categoryId}`]}
                mode="inline"
              >
                <Menu.Item
                  key={''}
                  icon={
                    <div>
                      <Image
                        src={`${toAbsoluteUrl('/media/logos/Tất cả.png')}`}
                        style={{ resize: 'both', display: 'inherit' }}
                        height={50}
                        width={50}
                        preview={false}
                      />
                    </div>
                  }
                  className={cx('menu-item-text')}
                >
                  Tất cả
                </Menu.Item>
                {
                  categories.map(i => (
                      <Menu.Item
                        key={i.id}
                        icon={
                          <div>
                            <Image
                              src={`https://192.168.2.169:5001/${i.imageUrl}`}
                              style={{ resize: 'both', display: 'inherit' }}
                              height={50}
                              width={50}
                              preview={false}
                            />
                          </div>
                        }
                        className={cx('menu-item-text')}
                      >{i.name}
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
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#616161' }}>Tổ chức: </Text>
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
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#616161' }} >Hình thức cung cấp: </Text>
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
                  locale: {items_per_page: '/ trang'},
              }}
              locale= {{
                  emptyText: 'Không có dữ liệu'
              }}
            />
          </div>
        </Col>
      </Row >
    </>
  )
}

export default DataListPage