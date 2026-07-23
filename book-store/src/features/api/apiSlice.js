import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/",
  }),
  tagTypes: ["books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "books",
      providesTags: ["books"],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: "books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    editBook: builder.query({
      query: (id) => `books/${id}`,
    }),
    updateBook: builder.mutation({
      query: (data) => ({
        url: `books/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});
export const {
  useGetBooksQuery,
  useAddBookMutation,
  useEditBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = apiSlice;
