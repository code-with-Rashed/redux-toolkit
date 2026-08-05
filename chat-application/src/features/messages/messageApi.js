import { apiSlice } from "../api/apiSlice";

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    messages: builder.query({
      query: (id) => ({
        url: `messages?conversationId_like=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${import.meta.env.VITE_SHOW_MESSAGE_PER_PAGE}`,
      }),
      transformResponse: (data, meta) => {
        const totalMessages = meta.response.headers.get("x-total-count");
        return {
          data,
          totalMessages,
        };
      },
    }),
    olderMessages: builder.query({
      query: ({ id, nextPage }) => ({
        url: `messages?conversationId_like=${id}&_sort=timestamp&_order=desc&_page=${nextPage}&_limit=${import.meta.env.VITE_SHOW_MESSAGE_PER_PAGE}`,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const messagesExist = await queryFulfilled;
        if (messagesExist.data?.length > 0) {
          dispatch(
            messageApi.util.updateQueryData(
              "messages",
              arg.id.toString(),
              (draft) => {
                draft.data = [...draft.data, ...messagesExist.data];
              },
            ),
          );
        }
      },
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: "messages",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const succeded = await queryFulfilled;
        if (succeded?.data?.id) {
          dispatch(
            messageApi.util.updateQueryData(
              "messages",
              arg.conversationId.toString(),
              (draft) => {
                draft.data.unshift(succeded?.data);
              },
            ),
          );
        }
      },
    }),
  }),
});
export const {
  useMessagesQuery,
  useAddMessageMutation,
  useOlderMessagesQuery,
} = messageApi;
export default messageApi;
