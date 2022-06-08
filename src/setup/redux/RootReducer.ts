import * as auth from '../../app/modules/auth'

import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'
import { datasetSlice } from './dataset/Slice'
import { globalSlice } from './global/Slice'
import { clientServiceSlice } from './clientService/Slice'

export const rootReducer = combineReducers({
  global: globalSlice.reducer,
  auth: auth.reducer,
  dataset: datasetSlice.reducer,
  clientService: clientServiceSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  //yield all([])
  yield all([auth.saga()])
}
