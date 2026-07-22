import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
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
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
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
