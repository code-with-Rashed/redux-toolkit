import { apiSlice } from "../api/apiSlice";

const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (withLoggedinUser) =>
        `conversations?participants_like=${withLoggedinUser}`,
    }),

    getConversation: builder.query({
      query: ({ loggedInUserEmail, participantEmail }) => {
        return `conversations?participants_like=${loggedInUserEmail}-${participantEmail}&participants_like=${participantEmail}-${loggedInUserEmail}`;
      },
    }),

    addCoversation: builder.mutation({
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
                draft.push(succeded?.data);
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
              const conversation = draft?.find(
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
  useGetConversationQuery,
  useAddCoversationMutation,
  useUpdateConversationMutation,
} = conversationsApi;
export default conversationsApi;
