import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    setRequests: (state, action) => {
      return action.payload;
    },
    clearRequests: (state) => {
      return null;
    },
  },
});

export default requestsSlice.reducer;
export const { setRequests, clearRequests } = requestsSlice.actions;
