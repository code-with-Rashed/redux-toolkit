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
      query: (data) => ({
        url: "conversations",
        method: "POST",
        body: data,
      }),
    }),
    updateConversation: builder.mutation({
      query: (data) => ({
        url: `conversations/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
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
