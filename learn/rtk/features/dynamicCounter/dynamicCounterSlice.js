const { counterAction } = require("../counter/counterSlice");

const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  count: 0,
};
const dynamicCounterSlice = createSlice({
  name: "dynamicCounterSlice",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.count += action.payload;
    },
    decrement: (state, action) => {
      state.count -= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(counterAction.increment, (state, action) => {
      state.count += 1;
    });
    builder.addCase(counterAction.decrement, (state, action) => {
      state.count -= 1;
    });
  },
});

module.exports = dynamicCounterSlice.reducer;
module.exports.dynamicCounterAction = dynamicCounterSlice.actions;
