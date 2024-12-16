import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  candidateName: "",
  candidateEmail: "",
  jobAppliedFor: "",
};

const globalDataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    setCandidateName(state, action) {
      state.candidateName = action.payload;
    },
    setCandidateEmail(state, action) {
      state.candidateEmail = action.payload;
    },
    setJobAppliedFor(state, action) {
      state.jobAppliedFor = action.payload;
    },
    resetGlobalData(state) {
      state.candidateName = "";
      (state.candidateEmail = ""), (state.jobAppliedFor = "");
    },
  },
});

export const {
  setCandidateName,
  setJobAppliedFor,
  setCandidateEmail,
  resetGlobalData,
} = globalDataSlice.actions;

export default globalDataSlice.reducer;
