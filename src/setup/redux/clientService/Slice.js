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
        setTabKey(state, action) {
            state.tabKey = action.payload ?? 'information'
        },
        setModalId(state, action) {
            state.modalId = action.payload ?? ''
        },
        setTypeModal(state, action) {
            state.typeModal = action.payload ?? ''
        },
        setModalVisible(state, action) {
            state.modalVisible = action.payload ?? false
        },
        setDisableDataTab(state, action) {
            state.disableDataTab = action.payload ?? true
        },
        setDataTypeCode(state, action) {
            state.dataTypeCode = action.payload ?? ''
        },
        setDataPreview(state, action) {
            state.dataPreview = action.payload ?? []
        },
        setColumnPreview(state, action) {
            state.columnPreview = action.payload ?? []
        },
        setDataMetadata(state, action) {
            state.dataMetadata = action.payload ?? []
        },
        setColumnMetata(state, action) {
            state.columnMetadata = action.payload ?? []
        },
        setDataUpload(state, action) {
            state.dataUpload = action.payload ?? []
        },
        setFileType(state, action) {
            state.fileType = action.payload ?? ''
        },
        setFileName(state, action) {
            state.fileName = action.payload ?? ''
        },
        setFileUrl(state, action) {
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