import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: false,
  createPost: false,
  imageDetails: false,
  currentPost: {},
  currentPhoto: "",
};
export const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState,
  reducers: {
    showDetails: (state, action) => {
      state.details = true;
      state.currentPost = action.payload;
    },
    hideDetails: (state) => {
      state.details = false;
    },
    showCreate: (state) => {
      state.createPost = true;
    },
    hideCreate: (state) => {
      state.createPost = false;
    },
    showImageDetails: (state, action) => {
      state.imageDetails = true;
      state.currentPhoto = action.payload;
    },
    hideImageDetails: (state) => {
      state.imageDetails = false;
    },
  },
});
export const {
  showDetails,
  hideDetails,
  showCreate,
  hideCreate,
  showImageDetails,
  hideImageDetails,
} = toggleSlice.actions;
export default toggleSlice.reducer;
