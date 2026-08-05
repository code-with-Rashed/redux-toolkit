import { apiSlice } from "../api/apiSlice";

const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (withLoggedinUser) =>
        `conversations?participants_like=${withLoggedinUser}&_sort=timestamp&_order=desc&_page=1&_limit=${import.meta.env.VITE_SHOW_CONVERSATIONS_PER_PAGE}`,
      transformResponse: (data, meta) => {
        const totalConversation = meta.response.headers.get("x-total-count");
        return {
          data,
          totalConversation,
        };
      },
    }),

    getMoreConversations: builder.query({
      query: ({ withLoggedinUser, nextPage }) =>
        `conversations?participants_like=${withLoggedinUser}&_sort=timestamp&_order=desc&_page=${nextPage}&_limit=${import.meta.env.VITE_SHOW_CONVERSATIONS_PER_PAGE}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const moreConversations = await queryFulfilled;
        if (moreConversations.data?.length > 0) {
          dispatch(
            conversationsApi.util.updateQueryData(
              "getConversations",
              arg.withLoggedinUser,
              (draft) => {
                draft.data = [...draft.data, ...moreConversations.data];
              },
            ),
          );
        }
      },
    }),

    getConversation: builder.query({
      query: ({ loggedInUserEmail, participantEmail }) => {
        return `conversations?participants_like=${loggedInUserEmail}-${participantEmail}&participants_like=${participantEmail}-${loggedInUserEmail}`;
      },
    }),

    addConversation: builder.mutation({
      query: ({ data, loggedInUserEmail }) => ({
        url: "conversations",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const succeded = await queryFulfilled;
        if (succeded?.data?.id) {
          dispatch(
            conversationsApi.util.updateQueryData(
              "getConversations",
              arg.loggedInUserEmail,
              (draft) => {
                draft?.data.push(succeded?.data);
              },
            ),
          );
        }
      },
    }),

    updateConversation: builder.mutation({
      query: ({ data, loggedInUserEmail }) => ({
        url: `conversations/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const conversationUpdate = dispatch(
          conversationsApi.util.updateQueryData(
            "getConversations",
            arg.loggedInUserEmail,
            (draft) => {
              const conversation = draft?.data.find(
                (conversation) => conversation?.id === arg.data?.id,
              );
              if (conversation) {
                conversation.message = arg.data?.message;
                conversation.timestamp = arg.data?.timestamp;
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          conversationUpdate.undo();
        }
      },
    }),
  }),
});
export const {
  useGetConversationsQuery,
  useGetMoreConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useUpdateConversationMutation,
} = conversationsApi;
export default conversationsApi;
