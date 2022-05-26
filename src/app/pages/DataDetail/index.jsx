import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs, Input } from 'antd'

import classNames from 'classnames/bind'
import styles from './DataDetail.module.scss'

import { PageTitle } from 'src/_metronic/layout/core'
import TableList from 'src/components/TableList'
import { datasetApi } from 'src/app/apis/dataset'
import { toAbsoluteUrl } from 'src/_metronic/helpers'

const { TabPane } = Tabs
const { Search } = Input
const cx = classNames.bind(styles)

const metadataToColumns = (metadata) => {
    try {
        const metadataJSON = JSON.parse(metadata)
        const cl = metadataJSON.map(item => ({
            title: item?.Title ?? '',
            dataIndex: item?.Data ?? '',
            key: item?.Data ?? '',
            width: `${100 / metadataJSON.length}%`
        }))

        return cl
    } catch (error) {
        console.error(error)
        return null
    }
}

const DataDetail = () => {
    const [dataset, setDataset] = useState(null)

    const [inputValue, setInputValue] = useState('')
    const [update, setUpdate] = useState(false)
    const [columns, setColumns] = useState([])
    const [loading, setLoading] = useState(false)
    const [datasetData, setDatasetData] = useState([])
    const [size, setSize] = useState(10)
    const [count, setCount] = useState(0)
    const [offset, setOffset] = useState(0)

    const { id: datasetId } = useParams()

    useEffect(() => {
        setUpdate(true)
        return () => { }
    }, [offset, size, inputValue])

    useEffect(() => {
        const fetchDatasetField = async () => {
            setLoading(true)
            const res = await datasetApi.getById(datasetId)
            const data = res?.data
            setDataset(data)

            const { metadata } = data
            const _columns = metadataToColumns(metadata) ?? []
            setColumns(_columns)
            setCount(res?.data.length)
            setLoading(false)
        }

        const fetchDatasetData = async () => {
            const res = await datasetApi.getData(datasetId, {
                ...inputValue && { q: inputValue }
            })
            setDatasetData(res)
        }

        if (update) {
            fetchDatasetField()
            fetchDatasetData()
            setUpdate(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update])

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
                        path: '/du-lieu',
                        isActive: true,
                        isSeparator: false
                    },
                ]}
            >
                Chi tiết
            </PageTitle>
            <div className={cx('card-datadetail', 'card shadow-sm')}>
                {/* begin::Body */}
                <div className='card-body p-3 p-md-5 px-md-8'>
                    <div className="row border-bottom border-warning">
                        <div className="col-12 col-md-auto pb-4 pb-md-0 text-center">
                            <img src={toAbsoluteUrl('media/images/documents.png')} className="h-50px" alt='' />
                        </div>
                        <div className="col-12 col-md border-start border-gray-300">
                            <h3 className='fw-bold mb-4 text-primary card-datadetail_title'>{dataset?.name}</h3>
                            <div className="row border-top border-gray-300">
                                <div className="col-12 py-2 col-md-auto border-end border-gray-300">
                                    <span className='far fa-clock text-danger'></span> <b>Ngày cập nhật:</b> 10/05/2022
                                </div>
                                <div className="col-12 py-2 col-md-auto border-end border-gray-300">
                                    <span className='fal fa-file-certificate text-danger'></span> <b>Lĩnh vực:</b>{` ${dataset?.category?.name}`}
                                </div>
                                <div className="col-12 py-2 col-md">
                                    <span className='far fa-landmark text-danger'></span> <b>Cơ quan chủ quản:</b>{` ${dataset?.organization?.name}`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row py-5 pt-md-7">
                        <p className='m-0'>{dataset?.description}</p>
                    </div>
                </div>
            </div>
            <div className={cx('card-datadetail', 'card shadow-sm mt-6')}>
                <Tabs defaultActiveKey="1" className='ms-4'>
                    <TabPane
                        tab={
                            <span>
                                <img src={`${toAbsoluteUrl('media/images/browser.png')}`} className="w-25px me-2" alt='' />
                                Dịch vụ web
                            </span>
                        }
                        key="1"
                    >
                        <Search
                            className={cx('search')}
                            placeholder='Tìm kiếm'
                            onSearch={(e) => {
                                setInputValue(e)
                            }}
                        />

                        <TableList
                            dataTable={datasetData}
                            columns={columns}
                            isPagination={true}
                            size={size}
                            count={count}
                            setOffset={setOffset}
                            setSize={setSize}
                            loading={loading}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default DataDetail