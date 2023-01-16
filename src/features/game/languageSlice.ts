import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  correct: 0,
  incorrect: 0,
  score: 0,
};

const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    addError(state) {
      state.incorrect++;
    },
    addCorrect(state) {
      state.correct++;
    },
    languageRefresh(state) {
      state.correct = 0;
      state.incorrect = 0;
      state.score = 0;
    },
    getLanguageScore(state) {
      state.score = +(
        (state.correct / (state.correct + state.incorrect)) *
        100
      ).toFixed(2);
    },
  },
});

export const { addError, addCorrect, languageRefresh, getLanguageScore } =
  languageSlice.actions;
export default languageSlice.reducer;
