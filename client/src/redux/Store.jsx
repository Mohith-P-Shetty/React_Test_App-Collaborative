import { configureStore } from "@reduxjs/toolkit";
import globalDataReducer from "./Slices/globalDataSlice";
import testMetaDataReducer from "./Slices/testMetaDataSlice";

const store = configureStore({
  reducer: {
    globalData: globalDataReducer,
    testMetaData: testMetaDataReducer,
  },
});

export default store;
