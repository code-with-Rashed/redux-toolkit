import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["videos", "video"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      providesTags: ["videos"],
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: (result, error, args) => {
        return [{ type: "video", id: args }];
      },
    }),
    getRelatedVideos: builder.query({
      query: (title) => {
        const url = `/videos?title_like=${title.split(" ").join("&")}&_limit=5`;
        return url;
      },
    }),
    addVideo: builder.mutation({
      query: (formData) => ({
        url: "/videos",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["videos"],
    }),
    editVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    updateVideo: builder.mutation({
      query: (data) => ({
        url: `/videos/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, args) => {
        return ["videos", { type: "video", id: args.id }];
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, args) => {
        return ["videos", { type: "video", id: args.id }];
      },
    }),
  }),
});
export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoQuery,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
