import { apiSlice } from "../api/apiSlice";

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    messages: builder.query({
      query: (id) => ({
        url: `messages?conversationId_like=${id}&_sort=timestamp&_order=desc&_limit=${import.meta.env.VITE_SHOW_MESSAGE_PER_PAGE}`,
      }),
    }),
  }),
});
export const { useMessagesQuery } = messageApi;
