import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (info) => ({
        url: "/register",
        method: "POST",
        body: info,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        queryFulfilled.then((res) => {
          const { accessToken, user } = res.data;
          localStorage.setItem("auth", JSON.stringify({ accessToken, user }));
          dispatch(userLoggedIn({ accessToken, user }));
        });
      },
    }),
    login: builder.mutation({
      query: (info) => ({
        url: "/login",
        method: "POST",
        body: info,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        queryFulfilled.then((res) => {
          const { accessToken, user } = res.data;
          localStorage.setItem("auth", JSON.stringify({ accessToken, user }));
          dispatch(userLoggedIn({ accessToken, user }));
        });
      },
    }),
    adminLogin: builder.mutation({
      query: (info) => ({
        url: "/login",
        method: "POST",
        body: info,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        queryFulfilled.then((res) => {
          const { accessToken, user } = res.data;
          localStorage.setItem("auth", JSON.stringify({ accessToken, user }));
          dispatch(userLoggedIn({ accessToken, user }));
        });
      },
    }),
  }),
});
export const { useRegisterMutation, useLoginMutation, useAdminLoginMutation } =
  authApi;
