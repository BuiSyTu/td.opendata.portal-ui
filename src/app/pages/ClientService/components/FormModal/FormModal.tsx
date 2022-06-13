import styles from './FormModal.module.scss'

import { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Checkbox, Col, Divider, Form, Input, message, Modal, notification, Row, Select, Space, Spin, Table, Tabs, Typography, Upload } from 'antd'
import { ClockCircleOutlined, DatabaseOutlined, InboxOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import * as XLSX from 'xlsx'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames/bind'

import { categoryApi, datasetApi, dataTypeApi, forwardApi, licenseApi, organizationApi, providerTypeApi } from 'src/app/apis'
import { setColumnMetata, setColumnPreview, setDataMetadata, setDataPreview, setDataTypeCode, setDataUpload, setDisableDataTab, setTabKey, setFileName, setFileType, setFileUrl } from 'src/setup/redux/clientService/Slice'
import { toObject } from 'src/utils/common'
import MetadataTable from '../MetadataTable'
import { RootState } from 'src/setup'

const { TextArea } = Input
const { Text } = Typography
const { Option } = Select
const { TabPane } = Tabs
const { Dragger } = Upload

const cx = classNames.bind(styles)

interface FormModalProps {
    modalVisible: boolean,
    modalId: string,
    typeModal: string,
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setModalId: React.Dispatch<React.SetStateAction<string>>,
    setTypeModal: React.Dispatch<React.SetStateAction<string>>,
}


const FormModal: React.FC<FormModalProps> = ({
    modalVisible,
    modalId,
    typeModal,
    setUpdate,
    setModalVisible,
    setModalId,
    setTypeModal
}) => {
    const dispatch = useDispatch()

    const userProfile: any = useSelector((state: RootState) => state.global.userProfile)

    const tabKey = useSelector((state: RootState) => state.clientService.tabKey)
    const disableDataTab = useSelector((state: RootState) => state.clientService.disableDataTab)
    const dataTypeCode = useSelector((state: RootState) => state.clientService.dataTypeCode)
    const dataPreview = useSelector((state: RootState) => state.clientService.dataPreview)
    const columnPreview = useSelector((state: RootState) => state.clientService.columnPreview)
    const dataMetadata = useSelector((state: RootState) => state.clientService.dataMetadata)
    const dataUpload = useSelector((state: RootState) => state.clientService.dataUpload)

    const fileName = useSelector((state: RootState) => state.clientService.fileName)
    const fileType = useSelector((state: RootState) => state.clientService.fileType)
    const fileUrl = useSelector((state: RootState) => state.clientService.fileUrl)

    const [form] = Form.useForm()
    const [disable, setDisable] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    const [categories, setCategories] = useState([])
    const [organizations, setOrganizations] = useState([])
    const [providerTypes, setProviderTypes] = useState([])
    const [dataTypes, setDataTypes] = useState([])
    const [licenses, setLicenses] = useState([])
    const [fileList, setFileList] = useState<any[]>([])
    const [disableTablePreview, setDisableTablePreview] = useState(true)
    const [disableTableMetadata, setDisableTableMetadata] = useState(true)

    const httpMethods = [
        'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'
    ]

    const layout = {
        labelCol: { span: 22 },
        wrapperCol: { span: 22 },
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await categoryApi.getAll()
            if (res?.data) {
                setCategories(res?.data)
            }
        }

        const fetchOrganizations = async () => {
            const res = await organizationApi.getAll()
            if (res?.data) {
                setOrganizations(res?.data)
            }
        }

        const fetchProviderTypes = async () => {
            const res = await providerTypeApi.getAll()
            if (res?.data) {
                setProviderTypes(res?.data)
            }
        }

        const fetchDataTypes = async () => {
            const res = await dataTypeApi.getAll()
            if (res?.data) {
                setDataTypes(res?.data)
            }
        }

        const fetchLicenses = async () => {
            const res = await licenseApi.getAll()
            if (res?.data) {
                setLicenses(res?.data)
            }
        }

        fetchCategories()
        fetchOrganizations()
        fetchProviderTypes()
        fetchDataTypes()
        fetchLicenses()
        return () => { }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                var res = await datasetApi.getById(modalId)

                if (res?.data?.datasetAPIConfig) {
                    res.data = {
                        ...res.data,
                        ...res.data.datasetAPIConfig,
                    }

                    try {
                        const headersObj = JSON.parse(res.data.datasetAPIConfig?.headers)
                        res.data.headers = Object.keys(headersObj).map((key) => ({ key: key, value: headersObj[key] }))
                    } catch (err) {
                        // console.error(err)
                    }
                }

                if (res?.data?.datasetFileConfig) {
                    res.data = {
                        ...res.data,
                        ...res.data.datasetFileConfig,
                    }

                    setFileList([{
                        url: `${process.env.REACT_APP_FILE_URL}/${res.data.datasetFileConfig.fileUrl}`,
                        name: res.data.datasetFileConfig.fileName,
                        uid: uuidv4()
                    }])
                }

                if (res?.data) {
                    form.setFieldsValue(res?.data)

                    dispatch(setDataTypeCode(res?.data?.dataType?.code?.toLowerCase()))
                    dispatch(setDataMetadata(JSON.parse(res?.data?.metadata)))
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
            }
        }

        setDisable(typeModal === 'view' ? true : false)

        if (modalId !== '') {
            fetchData()
        }
        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalId])

    const handleCancel = () => {
        form.resetFields()

        setDisableTablePreview(true)
        setDisableTableMetadata(true)
        setModalVisible(false)
        setModalId('')
        setTypeModal('')

        dispatch(setDisableDataTab(true))
        dispatch(setTabKey('information'))
        dispatch(setColumnMetata([]))
        dispatch(setDataMetadata([]))
        dispatch(setColumnPreview([]))
        dispatch(setDataPreview([]))
        dispatch(setDataUpload([]))
    }

    const handleOk = async () => {
        try {
            await form.validateFields()
            const formData = form.getFieldsValue(true)

            const headerObject = Array.isArray(formData.headers) ? toObject(formData.headers, 'key', 'value') : {}

            if (dataTypeCode === 'file') {
                // Khi file thay đổi, 3 thuộc tính này mới hết empty
                if (fileName && fileType && fileUrl) {
                    const datasetFileConfig = {
                        fileType,
                        fileName,
                        fileUrl,
                        sheetName: formData?.sheetName ?? '',
                    }

                    formData.datasetFileConfig = datasetFileConfig
                }
            }

            if (dataTypeCode === 'webapi') {
                const datasetAPIConfig = {
                    method: formData?.method ?? '',
                    url: formData?.url ?? '',
                    headers: Object.keys(headerObject).length > 0 ? JSON.stringify(headerObject) : '',
                    dataKey: formData?.dataKey ?? '',
                    data: formData?.data ?? ''
                }

                formData.datasetAPIConfig = datasetAPIConfig
            }

            formData.metadata = JSON.stringify(dataMetadata)

            formData.author = userProfile?.userName ?? ''
            formData.authorEmail = userProfile?.email ?? ''

            typeModal === 'edit' ? putData(formData) : postData(formData)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo)
        }
    }

    const handleChangeDataType = (value: any, event: any) => {
        setDisableTablePreview(true)
        setDisableTableMetadata(true)

        dispatch(setDataTypeCode(event.code.toLowerCase()))
        dispatch(setDisableDataTab(false))
    }

    const postData = async (data: any) => {
        if (!data.metadata) {
            notification.error({
                message: 'Bạn chưa tạo metadata',
                description: 'Vui lòng tạo metadata trước khi thêm'
            })

            return;
        }

        try {
            setButtonLoading(true)
            var res = await datasetApi.add(data)
            if (res) {
                notification.success({
                    message: 'Thêm mới thành công!',
                    duration: 1,
                })
            } else {
                notification.error({
                    message: `Lỗi khi thêm`,
                    description: `${res}`,
                })
            }
            setButtonLoading(false)
        } catch (error) {
            setButtonLoading(false)
        }
        setUpdate(true)
        handleCancel()
    }

    const putData = async (data: any) => {
        try {
            setButtonLoading(true)
            var res = await datasetApi.update(modalId, data)
            if (res) {
                notification.success({
                    message: 'Cập nhập thành công!',
                    duration: 1,
                })
            }
            setButtonLoading(false)
        } catch (error) {
            setButtonLoading(false)
        }
        setUpdate(true)
        handleCancel()
    }

    const handleTabClick = (key: any) => {
        dispatch(setTabKey(key))
    }

    const handleChangeDragger = (info: any) => {
        setFileList(info.fileList)
        const { response } = info.file

        // Check xem upload đã xong hay chưa
        if (!response) return;

        const { name, type, url } = response.data[0]

        dispatch(setFileName(name))
        dispatch(setFileType(type))
        dispatch(setFileUrl(url))


        let reader = new FileReader()

        reader.onload = (e: any) => {
            const data = e.target.result
            const workbook = XLSX.read(data, { type: 'binary' })

            const firstSheetName = workbook.SheetNames[0]
            var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName])
            var json_object = JSON.stringify(XL_row_object)
            dispatch(setDataUpload(JSON.parse(json_object)))
        }

        reader.readAsBinaryString(info.file.originFileObj)

        message.success(`${info.file.name} file uploaded successfully.`)
    }

    const handleClickPreview = () => {
        const handlePreview = (dataSource: any) => {
            if (!Array.isArray(dataSource)) {
                notification.info({
                    message: 'Dữ liệu không hợp lệ',
                    duration: 1,
                })

                return;
            }

            if (dataSource.length === 0) {
                notification.info({
                    message: 'Chưa có dữ liệu',
                    duration: 1,
                })

                return;
            }

            setDisableTablePreview(false)
            setDisableTableMetadata(true)

            if (dataSource.length > 5) dataSource = dataSource.slice(0, 5)
            dispatch(setDataPreview(dataSource))

            if (Array.isArray(dataMetadata) && dataMetadata.length > 0) {
                const columns = dataMetadata.map((metadata: any) => ({
                    key: metadata.Data,
                    title: metadata.Title,
                    dataIndex: metadata.Data,
                }))

                dispatch(setColumnPreview(columns))
            } else {
                const dataTemp = dataSource[0]
                const columns = Object.keys(dataTemp).map(key => ({
                    key,
                    title: key,
                    dataIndex: key,
                }))

                dispatch(setColumnPreview(columns))
            }
        }

        const handleWebApi = async () => {
            const formData = form.getFieldsValue(true)
            const { body, dataKey, headers, method, url } = formData

            const axiosOptions = {
                method,
                url,
                timeout: 15000,
                headers: JSON.stringify(Array.isArray(headers) ? toObject(headers, 'key', 'value') : {}),
                data: JSON.stringify(body),
            }

            const res = await forwardApi.forward(axiosOptions);

            if (res) {
                const dataSource = res[dataKey]
                handlePreview(dataSource)
            }
        }

        const handleExcel = () => {
            if (!dataUpload || !Array.isArray(dataUpload) || dataUpload.length === 0) {
                const formData = form.getFieldsValue(true)
                const url = `${process.env.REACT_APP_FILE_URL}/${formData.datasetFileConfig.fileUrl}`
                fetch(url)
                    .then(res => res.blob())
                    .then(blob => {
                        const workbook = XLSX.read(blob, { type: 'binary' })

                        const firstSheetName = workbook.SheetNames[0]
                        var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName])
                        var json_object = JSON.stringify(XL_row_object)
                        dispatch(setDataUpload(JSON.parse(json_object)))
                    })
            }

            handlePreview(dataUpload)
        }

        switch (dataTypeCode) {
            case 'webapi':
                handleWebApi()
                break;
            case 'file':
                handleExcel()
                break;
            default:
                break;
        }
    }

    const handleClickMetadata = () => {
        const columnMetadata = [
            { key: 'Data', title: 'Data', dataIndex: 'Data', editable: true },
            { key: 'DataType', title: 'DataType', dataIndex: 'DataType', editable: true },
            { key: 'Title', title: 'Title', dataIndex: 'Title', editable: true },
            { key: 'Description', title: 'Description', dataIndex: 'Description', editable: true },
        ]

        const handleWithDataSource = (dataSource: any) => {
            if (!Array.isArray(dataSource)) {
                notification.info({
                    message: 'Dữ liệu không hợp lệ',
                    duration: 1,
                })

                return;
            }

            if (dataSource.length === 0) {
                notification.info({
                    message: 'Chưa có dữ liệu',
                    duration: 1,
                })

                return;
            }

            setDisableTablePreview(true)
            setDisableTableMetadata(false)

            const dataTemp = dataSource[0]
            const metadata = Object.keys(dataTemp).map(key => ({
                Data: key,
                DataType: typeof dataTemp[key] === 'object' ? 'string' : typeof dataTemp[key],
                Title: key,
                Description: key,
            }))
            dispatch(setDataMetadata(metadata))
            dispatch(setColumnMetata(columnMetadata))
        }

        const handleWithoutDataSource = () => {
            setDisableTablePreview(true)
            setDisableTableMetadata(false)

            dispatch(setDataMetadata(dataMetadata))
            dispatch(setColumnMetata(columnMetadata))
        }

        const handleWebApi = async () => {
            const formData = form.getFieldsValue(true)

            if (Array.isArray(dataMetadata) && dataMetadata.length > 0) {
                handleWithoutDataSource()
                return;
            }

            const { body, dataKey, headers, method, url } = formData

            const axiosOptions = {
                method,
                url,
                timeout: 15000,
                headers: JSON.stringify(Array.isArray(headers) ? toObject(headers, 'key', 'value') : {}),
                data: JSON.stringify(body),
            }

            const res = await forwardApi.forward(axiosOptions);

            if (res) {
                let dataSource = res[dataKey]
                handleWithDataSource(dataSource)
            }
        }

        const handleExcel = () => {
            if (Array.isArray(dataMetadata) && dataMetadata.length > 0) {
                handleWithoutDataSource()
                return;
            }

            handleWithDataSource(dataUpload)
        }

        switch (dataTypeCode) {
            case 'webapi':
                handleWebApi();
                break;
            case 'file':
                handleExcel();
                break;
            default:
                break;
        }
    }

    const handleDrop = (e: any) => console.log('Dropped files', e.dataTransfer.files)

    const handlePreview = async (file: any) => {
        if (file?.url) {
            window.open(file.url, '_blank')
        }
    }

    const footer = [
        typeModal === 'view' ? (
            <></>
        ) : (
            <Button
                key='Ok'
                type='primary'
                htmlType='submit'
                size='middle'
                className={cx('ok-btn')}
                icon={<i className='las la-save' style={{ color: '#fff' }}></i>}
                onClick={handleOk}
                loading={buttonLoading}
            >
                <Text style={{ color: '#FFF', paddingLeft: 5 }}> {'Lưu'}</Text>
            </Button>
        ),
        <Button
            key='Cancel'
            type='primary'
            size='middle'
            className={cx('cancel-btn')}
            icon={<i className='las la-times' style={{ color: '#757575' }}></i>}
            onClick={handleCancel}
        >
            <Text style={{ color: '#757575', paddingLeft: 5 }}>
                {' '}
                {typeModal === 'view' ? 'Đóng' : 'Hủy'}
            </Text>
        </Button>,
    ]

    return (
        <Modal
            width={1200}
            visible={modalVisible}
            title={<Text className={cx('text-modal')}>Tập dữ liệu</Text>}
            onOk={handleOk}
            onCancel={handleCancel}
            closeIcon={<i className='las la-times' style={{ color: '#fff', fontSize: 20 }}></i>}
            footer={footer}
        >
            <Spin spinning={isLoading}>
                <Form
                    layout='vertical'
                    {...layout}
                    form={form}
                >
                    <Tabs
                        activeKey={tabKey}
                        onTabClick={(key) => handleTabClick(key)}
                    >
                        <TabPane tab='Thông tin' key='information'>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label='Tên'
                                        name='name'
                                        rules={[{ required: true, message: 'Không được để trống!' }]}
                                    >
                                        <Input disabled={disable} className={cx('input')} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label='Mã'
                                        name='code'
                                    >
                                        <Input disabled={disable} className={cx('input')} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label='Tiêu đề hiển thị'
                                        name='_title'
                                    >
                                        <Input disabled={disable} className={cx('input')} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label='Tag' name='tags'>
                                        <Input disabled={disable} className={cx('input')} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <Form.Item label='Lĩnh vực' name='categoryId'>
                                        <Select showSearch placeholder='Chọn lĩnh vực'>
                                            {categories.map((category: any) => (
                                                <Option key={category.id} value={category.id}>
                                                    {category.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label='Tổ chức' name='organizationId'>
                                        <Select showSearch placeholder='Chọn tổ chức'>
                                            {organizations.map((organization: any) => (
                                                <Option key={organization.id} value={organization.id}>
                                                    {organization.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <Form.Item label='Hình thức cung cấp' name='providerTypeId'>
                                        <Select showSearch placeholder='Chọn hình thức cung cấp'>
                                            {providerTypes.map((providerType: any) => (
                                                <Option key={providerType.id} value={providerType.id}>
                                                    {providerType.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label='Giấy phép' name='licenseId'>
                                        <Select showSearch placeholder='Chọn giấy phép'>
                                            {licenses.map((license: any) => (
                                                <Option key={license.id} value={license.id}>
                                                    {license.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label='Loại dữ liệu'
                                        name='dataTypeId'
                                        rules={[{ required: true, message: 'Không được để trống!' }]}
                                    >
                                        <Select showSearch placeholder='Chọn loại dữ liệu'
                                            onChange={(value, event) => handleChangeDataType(value, event)}
                                        >
                                            {dataTypes.map((dataType: any) => (
                                                <Option key={dataType.id} value={dataType.id} code={dataType.code}>
                                                    {dataType.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item name='visibility' valuePropName='checked'>
                                <Checkbox>Xuất bản lên cổng</Checkbox>
                            </Form.Item>

                            <Form.Item label='Mô tả' name='description'>
                                <TextArea disabled={disable} rows={3} style={{ width: '100%', borderRadius: 5 }} />
                            </Form.Item>
                        </TabPane>

                        <TabPane tab='Dữ liệu' disabled={disableDataTab} key='data'>
                            {dataTypeCode === 'webapi'
                                ? (
                                    <>
                                        <Row>
                                            <Col span={3}>
                                                <Form.Item label='Phương thức' name='method'>
                                                    <Select placeholder='Http action'>
                                                        {httpMethods.map((httpMethod, index) => (
                                                            <Option key={httpMethod} value={httpMethod}>
                                                                {httpMethod}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>

                                                <Form.Item label='Data Key' name='dataKey'>
                                                    <Input placeholder='Nhập data key' />
                                                </Form.Item>
                                            </Col>
                                            <Col span={9}>
                                                <Form.Item label='Địa chỉ' name='url'>
                                                    <Input
                                                        placeholder='Enter request URL' />
                                                </Form.Item>
                                            </Col>

                                            <Col span={12}>
                                                <p className='mb-2'>Headers</p>
                                                <Form.List name='headers'>
                                                    {(fields, { add, remove }) => (
                                                        <>
                                                            {fields.map(({ key, name, ...restField }) => (
                                                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                                                                    <Form.Item
                                                                        key={`item1-${key}`}
                                                                        {...restField}
                                                                        name={[name, 'key']}
                                                                    >
                                                                        <Input placeholder='Key' />
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        key={`item2-${key}`}
                                                                        {...restField}
                                                                        name={[name, 'value']}
                                                                    >
                                                                        <Input placeholder='Value' />
                                                                    </Form.Item>
                                                                    <MinusCircleOutlined
                                                                        key={`icon-${key}`}
                                                                        onClick={() => remove(name)} />
                                                                </Space>
                                                            ))}
                                                            <Form.Item>
                                                                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                                                                    Thêm header
                                                                </Button>
                                                            </Form.Item>
                                                        </>
                                                    )}
                                                </Form.List>
                                            </Col>
                                        </Row>

                                        <Divider />

                                        <Row>
                                            <Col span={12}>
                                                <Form.Item label='Body' name='body'>
                                                    <TextArea disabled={disable} rows={5} style={{ width: '100%', borderRadius: 5 }} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </>
                                )
                                : (
                                    <>
                                        <Form.Item label='File đính kèm' name='fileUrl'>
                                            <Dragger
                                                name='files'
                                                maxCount={1}
                                                multiple={false}
                                                action={`${process.env.REACT_APP_FILE_URL}/api/v1/attachments`}
                                                headers={{
                                                    TDAuthorization: process.env?.REACT_APP_DEFAULT_TDAUTHORIZATION ?? '',
                                                }}
                                                onChange={handleChangeDragger}
                                                onDrop={handleDrop}
                                                onPreview={handlePreview}
                                                fileList={fileList}
                                            >
                                                <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p>
                                                <p className="ant-upload-text">Kéo hoặc thả file để tải lên</p>
                                            </Dragger>
                                        </Form.Item>

                                        <Col span={9}>
                                            <Form.Item label='Tên sheet / data key' name='sheetName'>
                                                <Input
                                                    placeholder='Điền tên sheet / data key' />
                                            </Form.Item>
                                        </Col>
                                    </>
                                )
                            }
                            <div className='mb-5'>
                                <Button
                                    icon={<DatabaseOutlined />}
                                    className={cx('preview-btn')}
                                    onClick={handleClickPreview}
                                >
                                    Xem trước
                                </Button>
                                <Button
                                    icon={<ClockCircleOutlined />}
                                    className={cx('metadata-btn')}
                                    onClick={handleClickMetadata}
                                >
                                    Xem metadata
                                </Button>
                            </div>

                            {!disableTableMetadata && <MetadataTable />}
                            {!disableTablePreview && <Table
                                dataSource={dataPreview}
                                columns={columnPreview} />}
                        </TabPane>
                    </Tabs>
                </Form>
            </Spin>
        </Modal>
    )
}

export default memo(FormModal)
