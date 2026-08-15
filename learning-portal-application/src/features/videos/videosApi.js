import { apiSlice } from "../api/apiSlice";

const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    videos: builder.query({
      query: () => "/videos?_sort=id&_order=desc",
    }),
    video: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    lastVideo: builder.query({
      query: () => "/videos?_sort=id&_order=desc&_limit=1",
    }),
  }),
});
export const { useVideosQuery, useVideoQuery, useLastVideoQuery } = videosApi;
