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
    addVideo: builder.mutation({
      query: (video) => ({
        url: "/videos",
        method: "POST",
        body: video,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const succeed = await queryFulfilled;
        if (succeed?.data?.id) {
          dispatch(
            videosApi.util.updateQueryData("videos", undefined, (draft) => {
              draft.unshift(succeed.data);
            }),
          );
        }
      },
    }),
    updateVideo: builder.mutation({
      query: (video) => ({
        url: `/videos/${video?.id}`,
        method: "PUT",
        body: video,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const succeed = await queryFulfilled;
        if (succeed?.data?.id) {
          dispatch(
            videosApi.util.updateQueryData("videos", undefined, (draft) => {
              const findIndex = draft.findIndex(
                (video) => video.id === succeed.data.id,
              );
              draft[findIndex] = succeed.data;
            }),
          );
        }
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const deleted = dispatch(
          videosApi.util.updateQueryData("videos", undefined, (draft) => {
            const findIndex = draft.findIndex((video) => video.id == args);
            draft.splice(findIndex, 1);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          deleted.undo();
        }
      },
    }),
  }),
});
export const {
  useVideosQuery,
  useVideoQuery,
  useLastVideoQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videosApi;
