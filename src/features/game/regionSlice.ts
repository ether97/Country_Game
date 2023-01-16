import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  correct: 0,
  incorrect: 0,
  score: 0,
};

const regionSlice = createSlice({
  name: "regions",
  initialState,
  reducers: {
    addError(state) {
      state.incorrect++;
    },
    addCorrect(state) {
      state.correct++;
    },
    regionRefresh(state) {
      state.correct = 0;
      state.incorrect = 0;
      state.score = 0;
    },
    getRegionScore(state) {
      state.score = +(
        (state.correct / (state.correct + state.incorrect)) *
        100
      ).toFixed(2);
    },
  },
});

export const { addError, addCorrect, regionRefresh, getRegionScore } =
  regionSlice.actions;
export default regionSlice.reducer;
