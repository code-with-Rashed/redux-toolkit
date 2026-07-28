import { apiSlice } from "../api/apiSlice";

const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (withLoggedinUser) =>
        `conversations?participants_like=${withLoggedinUser}`,
    }),
  }),
});
export const { useGetConversationsQuery } = conversationsApi;
