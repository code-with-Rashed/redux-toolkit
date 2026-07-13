// const { counterAction } = require("./features/counter/counterSlice");
// const { dynamicCounterAction } = require("./features/dynamicCounter/dynamicCounterSlice");

// const { getAllPosts } = require("./features/post/postSlice");

const store = require("./app/store");
const { fetchTheVideo } = require("./features/videos/videoSlice");
const { fetchRelatedVideos } = require("./features/videos/relatedVideoSlice");

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
const callRelatedVideo = (tags) => {
  store.dispatch(fetchRelatedVideos(tags));
};
store.dispatch(fetchTheVideo()).then((data) => {
  callRelatedVideo(data.payload.tags);
});
