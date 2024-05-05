import { configureStore } from "@reduxjs/toolkit";
import sidebar from "./reducers/sidebar";
import language from "./reducers/language";

const Store = configureStore({
  reducer: {
    sideBar: sidebar,
    language: language,
  },
});

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;

export default Store;
