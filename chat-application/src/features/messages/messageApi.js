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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const succeded = await queryFulfilled;
        if (succeded?.data?.id) {
          dispatch(
            messageApi.util.updateQueryData(
              "messages",
              arg.conversationId.toString(),
              (draft) => {
                draft.unshift(succeded?.data);
              },
            ),
          );
        }
      },
    }),
  }),
});
export const { useMessagesQuery, useAddMessageMutation } = messageApi;
