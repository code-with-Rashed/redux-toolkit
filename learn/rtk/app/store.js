const configureStore = require("@reduxjs/toolkit").configureStore;
const counterReducer = require("../features/counter/counterSlice");
const dynamicCounterReducer = require("../features/dynamicCounter/dynamicCounterSlice");
const postReducer = require("../features/post/postSlice");
const videoReducer = require("../features/videos/videoSlice");
const relatedVideoReducer = require("../features/videos/relatedVideoSlice");
const { createLogger } = require("redux-logger");
const logger = createLogger();

const store = configureStore({
  reducer: {
    counter: counterReducer,
    dynamicCounter: dynamicCounterReducer,
    posts: postReducer,
    video: videoReducer,
    relatedVideo: relatedVideoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
