import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  correct: 0,
  incorrect: 0,
  score: 0,
};

const capitalSlice = createSlice({
  name: "capitals",
  initialState,
  reducers: {
    addError(state) {
      state.incorrect++;
    },
    addCorrect(state) {
      state.correct++;
    },
    capitalRefresh(state) {
      state.correct = 0;
      state.incorrect = 0;
      state.score = 0;
    },
    getCapitalScore(state) {
      state.score = +(
        (state.correct / (state.correct + state.incorrect)) *
        100
      ).toFixed(2);
    },
  },
});

export const { addError, addCorrect, capitalRefresh, getCapitalScore } =
  capitalSlice.actions;
export default capitalSlice.reducer;
