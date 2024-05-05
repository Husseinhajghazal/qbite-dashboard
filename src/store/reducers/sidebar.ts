import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expanded: false,
};

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleExpanded: (state) => {
      state.expanded = !state.expanded;
    },
  },
});

export const { toggleExpanded } = sideBarSlice.actions;

export default sideBarSlice.reducer;
