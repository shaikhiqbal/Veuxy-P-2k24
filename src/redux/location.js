import { createSlice } from "@reduxjs/toolkit";

const initialState = { lat: 0, long: 0, isDenied: false, message: "" };
import useJwt from "@src/dashboard/jwt/useJwt";
export const fetchLocation = () => async (dispatch) => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    dispatch(setLocation({ lat: latitude, long: longitude }));
  } catch (error) {
    if (error.code === error.PERMISSION_DENIED) {
      dispatch(
        setLocationDenied({
          denied: true,
          message: "Please allow your location in the browser settings.",
        })
      );
      console.error(
        "User denied Geolocation. Please allow your location in the browser settings."
      );
    } else {
      console.error("Geolocation error:", error);
    }
  }
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.lat = action.payload.lat;
      state.long = action.payload.long;
    },
    setLocationDenied: (state, action) => {
      state.isDenied = action.payload.denied;
      state.message = action.payload.message;
    },
  },
});

export const { setLocation, setLocationDenied } = locationSlice.actions;

export default locationSlice.reducer;
