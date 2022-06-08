import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categoryId: '',
    datasetId: '',
}

export const datasetSlice = createSlice({
    name: 'dataset',
    initialState: initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action?.payload ?? ''
        },

        setDatasetId: (state, action) => {
            state.datasetId = action?.payload ?? ''
        }
    },
})

export const { setCategoryId, setDatasetId } = datasetSlice.actions