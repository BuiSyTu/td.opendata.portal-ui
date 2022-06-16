import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: '',
    datasetId: '',
}

export const datasetSlice = createSlice({
    name: 'dataset',
    initialState: initialState,
    reducers: {
        setCategoryId: (state: any, action: any) => {
            state.categoryId = action?.payload ?? ''
        },

        setDatasetId: (state: any, action: any) => {
            state.datasetId = action?.payload ?? ''
        }
    },
})

export const { setCategoryId, setDatasetId } = datasetSlice.actions