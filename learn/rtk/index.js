// const { counterAction } = require("./features/counter/counterSlice");
// const { dynamicCounterAction } = require("./features/dynamicCounter/dynamicCounterSlice");

const { getAllPosts } = require("./features/post/postSlice");

const store = require("./app/store");

store.subscribe(() => {
  // console.log(store.getState());
});

// dispatch states

// store.dispatch(counterAction.increment());
// store.dispatch(counterAction.increment());
// store.dispatch(counterAction.decrement());

// console.log("\n");

// store.dispatch(dynamicCounterAction.increment(5));
// store.dispatch(dynamicCounterAction.increment(3));
// store.dispatch(dynamicCounterAction.decrement(2));

// post dispatch
store.dispatch(getAllPosts());
