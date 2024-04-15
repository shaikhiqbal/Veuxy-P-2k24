import { createSlice } from "@reduxjs/toolkit";

const isoMangementSlice = createSlice({
  name: "isoMangement",
  initialState: {
    user: {},
    userApplicationId: "",
  },
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload)
      state.user = action.payload;
    },
    setUserApplicationId: (state, action) => {
      state.userApplicationId = action.payload;
    },
  },
});
export const { setUser, setUserApplicationId } = isoMangementSlice.actions;
export default isoMangementSlice.reducer;
