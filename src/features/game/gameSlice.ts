import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  start: false,
  test: "",
  hints: 3,
  overall: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame(state) {
      state.start = !state.start;
    },
    decrementHint(state) {
      if (state.hints > 0) {
        state.hints--;
      }
    },
  },
});

export const { startGame, decrementHint } = gameSlice.actions;
export default gameSlice.reducer;
