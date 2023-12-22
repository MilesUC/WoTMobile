import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchDataForEndpoint } from '../../Utils/fetchDataForEndpoint'

export const fetchPickFields = createAsyncThunk('pickFields/fetch', async (endpointName) => {
  const response = await fetchDataForEndpoint(endpointName, data => data)
  return { endpointName, data: response }
})

const pickFieldsSlice = createSlice({
  name: 'pickFields',
  initialState: {
    data: {},
    lastFetched: {},
    status: {},
    error: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPickFields.pending, (state, action) => {
        const endpointName = action.meta.arg
        state.status[endpointName] = 'loading'
      })
      .addCase(fetchPickFields.fulfilled, (state, action) => {
        const { endpointName, data } = action.payload
        state.status[endpointName] = 'succeeded'
        state.data[endpointName] = data
        state.lastFetched[endpointName] = Date.now()
      })
      .addCase(fetchPickFields.rejected, (state, action) => {
        const endpointName = action.meta.arg
        state.status[endpointName] = 'failed'
        state.error[endpointName] = action.error.message
      })
  }
})

export default pickFieldsSlice.reducer
