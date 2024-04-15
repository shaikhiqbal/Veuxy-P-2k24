import { createSlice } from "@reduxjs/toolkit";

const applicationIdSlice = createSlice({
  name: "isoMangement",
  initialState: {
    applicationId: "",
  },
  reducers: {
    setApplicationId: (state, action) => {
      state.applicationId = action.payload;
    },
  },
});
export const { setApplicationId } = applicationIdSlice.actions;
export default applicationIdSlice.reducer;
