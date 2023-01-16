import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  correct: 0,
  incorrect: 0,
  score: 0,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    addError(state) {
      state.incorrect++;
    },
    addCorrect(state) {
      state.correct++;
    },
    currencyRefresh(state) {
      state.correct = 0;
      state.incorrect = 0;
      state.score = 0;
    },
    getCurrencyScore(state) {
      state.score = +(
        (state.correct / (state.correct + state.incorrect)) *
        100
      ).toFixed(2);
    },
  },
});

export const { addError, addCorrect, currencyRefresh, getCurrencyScore } =
  currencySlice.actions;
export default currencySlice.reducer;
