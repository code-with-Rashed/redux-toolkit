import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        queryFulfilled.then((result) => {
          const { accessToken, user } = result.data;
          localStorage.setItem("auth", JSON.stringify({ accessToken, user }));
          dispatch(userLoggedIn({ accessToken, user }));
        });
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        queryFulfilled.then((result) => {
          const { accessToken, user } = result.data;
          localStorage.setItem("auth", JSON.stringify({ accessToken, user }));
          dispatch(userLoggedIn({ accessToken, user }));
        });
      },
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation } = authApi;
