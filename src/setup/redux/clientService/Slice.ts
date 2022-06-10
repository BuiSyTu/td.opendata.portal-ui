import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tabKey: 'information',
    modalId: '',
    typeModal: '',
    modalVisible: false,
    disableDataTab: true,
    dataTypeCode: '',
    dataPreview: [],
    columnPreview: [],
    dataMetadata: [],
    columnMetadata: [],
    dataUpload: [],
    fileType: '',
    fileName: '',
    fileUrl: '',
}

export const clientServiceSlice = createSlice({
    name: 'clientService',
    initialState: initialState,
    reducers: {
        setTabKey(state: any, action: any) {
            state.tabKey = action.payload ?? 'information'
        },
        setModalId(state: any, action: any) {
            state.modalId = action.payload ?? ''
        },
        setTypeModal(state: any, action: any) {
            state.typeModal = action.payload ?? ''
        },
        setModalVisible(state: any, action: any) {
            state.modalVisible = action.payload ?? false
        },
        setDisableDataTab(state: any, action: any) {
            state.disableDataTab = action.payload ?? true
        },
        setDataTypeCode(state: any, action: any) {
            state.dataTypeCode = action.payload ?? ''
        },
        setDataPreview(state: any, action: any) {
            state.dataPreview = action.payload ?? []
        },
        setColumnPreview(state: any, action: any) {
            state.columnPreview = action.payload ?? []
        },
        setDataMetadata(state: any, action: any) {
            state.dataMetadata = action.payload ?? []
        },
        setColumnMetata(state: any, action: any) {
            state.columnMetadata = action.payload ?? []
        },
        setDataUpload(state: any, action: any) {
            state.dataUpload = action.payload ?? []
        },
        setFileType(state: any, action: any) {
            state.fileType = action.payload ?? ''
        },
        setFileName(state: any, action: any) {
            state.fileName = action.payload ?? ''
        },
        setFileUrl(state: any, action: any) {
            state.fileUrl = action.payload ?? ''
        },
    },
})

export const {
    setTabKey,
    setModalId,
    setTypeModal,
    setModalVisible,
    setDisableDataTab,
    setDataTypeCode,
    setColumnPreview,
    setDataPreview,
    setColumnMetata,
    setDataMetadata,
    setDataUpload,
    setFileType,
    setFileName,
    setFileUrl,
} = clientServiceSlice.actions