import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Input, Popconfirm, Tag, Typography, notification } from 'antd'

import { setDisableDataTab } from 'src/setup/redux/clientService/Slice'
import { danger, secondary, success } from 'src/app/constants/color'
import FormModal from './components/FormModal'
import { PageTitle } from 'src/_metronic/layout/core'
import TableList from 'src/components/TableList'
import { datasetApi } from 'src/app/apis'
import { openJsonInNewTab } from 'src/utils/common'

const { Text } = Typography
const { Search } = Input

const ClientService = () => {
    const dispatch = useDispatch()
    const userProfile = useSelector(state => state.global.userProfile)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalId, setModalId] = useState('')
    const [typeModal, setTypeModal] = useState('')
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const [dataTable, setDataTable] = useState([])
    const [size, setSize] = useState(10)
    const [count, setCount] = useState(0)
    const [offset, setOffset] = useState(0)

    const columns = [
        {
            title: 'STT',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text, record, index) => {
                return (
                    <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {index + 1}
                    </Text>
                )
            },
            width: '5%',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
        },
        {
            title: 'Mã',
            dataIndex: 'code',
            key: 'code',
            width: '10%',
        },
        {
            title: 'Trạng thái dữ liệu',
            dataIndex: 'state',
            key: 'state',
            width: '20%',
            render: (text, record, index) => {
                const getApproveState = () => {
                    let color = secondary
                    let textDisplay = 'Không xác định'

                    switch (record?.approveState) {
                        case 0:
                            textDisplay = 'Chưa duyệt'
                            break;
                        case 1:
                            color = success
                            textDisplay = 'Đã duyệt'
                            break;
                        case 2:
                            color = danger
                            textDisplay = 'Bị từ chối'
                            break;
                        default:
                            break;
                    }

                    return {
                        color,
                        textDisplay
                    }
                }

                const getIsSynced = () => {
                    return {
                        color: record?.isSynced ? success : secondary,
                        textDisplay: record?.isSynced ? 'Đã đồng bộ' : 'Đang đồng bộ',
                    }
                }

                const { color: colorApproveState, textDisplay: textApproveState } = getApproveState()
                const { color: colorSynced, textDisplay: textSynced } = getIsSynced()

                return (
                    <>
                        <Tag color={colorApproveState}>
                            {textApproveState}
                        </Tag>
                        <Tag color={colorSynced}>
                            {textSynced}
                        </Tag>
                    </>
                );
            },
        },
        {
            title: 'Thao tác',
            width: '15%',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text, record) => (
                <div>
                    <button
                        className='btn btn-light-success m-btn m-btn--icon btn-sm m-btn--icon-only'
                        data-toggle='m-tooltip'
                        title='Xem'
                        onClick={() => {
                            handleView(record.id)
                        }}
                    >
                        <i className='la la-file-text-o' style={{ marginLeft: -7 }}></i>
                    </button>
                    <button
                        style={{ marginLeft: 10 }}
                        className='btn btn-light-primary m-btn m-btn--icon btn-sm m-btn--icon-only'
                        data-toggle='m-tooltip'
                        title='Sửa'
                        onClick={() => {
                            handleEdit(record.id)
                        }}
                    >
                        <i className='la la-edit' style={{ marginLeft: -7 }}></i>
                    </button>
                    <Popconfirm
                        title='Xóa dữ liệu？'
                        okText='Ok'
                        cancelText='Hủy'
                        onConfirm={() => {
                            handleDelete(record.id)
                        }}
                    >
                        <button
                            style={{ marginLeft: 10 }}
                            className='btn btn-light-danger m-btn m-btn--icon btn-sm m-btn--icon-only'
                            data-toggle='m-tooltip'
                            title='Xóa'
                        >
                            <i className='la la-trash' style={{ marginLeft: -7 }}></i>
                        </button>
                    </Popconfirm>
                </div>
            ),
        },
        {
            title: 'Dữ liệu',
            width: '10%',
            dataIndex: '',
            key: '',
            align: 'center',
            render: (text, record) => (
                <div>
                    <button
                        className='btn btn-light-primary m-btn m-btn--icon btn-sm m-btn--icon-only'
                        data-toggle='m-tooltip'
                        title='Đồng bộ lại'
                        onClick={() => {
                            handleSyncData(record.id)
                        }}
                    >
                        <i className='la la-sync' style={{ marginLeft: -7 }}></i>
                    </button>
                    <button
                        style={{ marginLeft: 10 }}
                        className='btn btn-light-success m-btn m-btn--icon btn-sm m-btn--icon-only'
                        data-toggle='m-tooltip'
                        title='Xem dữ liệu mẫu'
                        onClick={() => {
                            handleGetData(record.id)
                        }}
                    >
                        <i className='la la-eye' style={{ marginLeft: -7 }}></i>
                    </button>
                </div>
            ),
        },
        {
            title: 'Lượt xem',
            dataIndex: 'view',
            key: 'view',
            align: 'center',
            width: '10%',
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                var res = await datasetApi.getAll({
                    orderBy: ['view'],
                    author: userProfile.userName,
                })
                setDataTable(res?.data ?? [])
                setCount(res?.totalCount ?? 0)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
            setUpdate(false)
        }

        if (update) {
            fetchData()
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [update])

    useEffect(() => {
        setUpdate(true)
        return () => { }
    }, [offset, size, inputValue])

    const handleEdit = (id) => {
        setModalVisible(true)
        setModalId(id)
        setTypeModal('edit')

        dispatch(setDisableDataTab(false))
    }

    const handleView = (id) => {
        setModalVisible(true)
        setModalId(id)
        setTypeModal('view')

        dispatch(setDisableDataTab(false))
    }

    const handleAdd = () => {
        setModalVisible(true)
        setTypeModal('add')
    }

    const handleDelete = async (id) => {
        var res = await datasetApi.delete(id)
        if (res) {
            notification.success({
                message: 'Xóa thành công!',
                duration: 1,
                placement: 'bottomRight',
            })

            setUpdate(true)
        } else {
            notification.error({
                message: `Thất bại!`,
                description: 'Xóa không thành công.',
            })
        }
    }

    const handleSyncData = async (id) => {
        notification.warning({
            message: 'Đang đồng bộ!',
            duration: 2,
            placement: 'bottomRight',
        });

        var res = await datasetApi.syncData(id)
        if (res) {
            notification.success({
                message: 'Thành công!',
                duration: 1,
                placement: 'bottomRight',
            })

            setUpdate(true)
        } else {
            notification.error({
                message: `Thất bại!`,
                description: 'Không thành công.',
            })
        }
    }

    const handleGetData = async (id) => {
        var res = await datasetApi.getData(id)
        if (res) {
            openJsonInNewTab(res)
        } else {
            notification.error({
                message: `Thất bại!`,
                description: 'Không thành công.',
            })
        }
    }

    return (
        <div>
            <PageTitle breadcrumbs={[]}>Danh sách tập dữ liệu</PageTitle>
            <div className='card mb-5 mb-xl-12 p-10'>
                <div className='d-flex row justify-content-between align-items-center'>
                    <div className='col-xl-8 d-flex align-items-center'>
                        <Search
                            style={{ width: '40%', height: 35, borderRadius: 10 }}
                            placeholder='Tìm kiếm'
                            onSearch={(e) => {
                                setInputValue(e)
                            }}
                        />
                    </div>
                    <div className='col-xl-4 d-flex justify-content-end'>
                        <button
                            className=' btn btn-success btn-sm m-btn m-btn--icon'
                            onClick={() => handleAdd()}
                        >
                            <i className='bi bi-plus-square'></i> Thêm
                        </button>
                    </div>
                </div>
                <Divider style={{ margin: '10px 0' }} />
                <TableList
                    dataTable={dataTable}
                    columns={columns}
                    isPagination={true}
                    size={size}
                    count={count}
                    setOffset={setOffset}
                    setSize={setSize}
                    loading={loading}
                />
            </div>
            <FormModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                modalId={modalId}
                setModalId={setModalId}
                typeModal={typeModal}
                setTypeModal={setTypeModal}
                setUpdate={setUpdate}
            />
        </div>
    )
}

export default ClientService
