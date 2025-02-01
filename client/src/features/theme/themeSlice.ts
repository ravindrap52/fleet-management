import { createSlice } from "@reduxjs/toolkit";

import { ThemeState } from "@/types/interface";

// Loading the theme from localStorage or default to "light"
const storedTheme = localStorage.getItem("theme") || "light";

// initial state, which is light
const initialState: ThemeState = {
  theme: storedTheme,
};


export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleAppTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", state.theme); 
    },
  },
});

export const { toggleAppTheme } = themeSlice.actions;

export default themeSlice.reducer;
