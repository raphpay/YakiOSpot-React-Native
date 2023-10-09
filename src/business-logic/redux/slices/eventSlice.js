import { createSlice } from '@reduxjs/toolkit'

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    gatherings: []
  },
  reducers: {
    setGatherings(state, action) {
      state.gatherings = action.payload;
    },
    modifyGatheringAtIndex(state, action) {
      const { index, gathering } = action.payload;
      state.gatherings[index] = gathering;
    } 
  }
})

export const { setGatherings } = eventSlice.actions

export default eventSlice.reducer