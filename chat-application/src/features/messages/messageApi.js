import { apiSlice } from "../api/apiSlice";

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    messages: builder.query({
      query: (id) => ({
        url: `messages?conversationId_like=${id}&_sort=timestamp&_order=desc&_limit=${import.meta.env.VITE_SHOW_MESSAGE_PER_PAGE}`,
      }),
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: "messages",
        method: "POST",
        body: data,
      }),
    }),
    updateMessage: builder.mutation({
      query: (data) => ({
        url: `messages/${data?.conversationId}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useMessagesQuery,
  useAddMessageMutation,
  useUpdateMessageMutation,
} = messageApi;
