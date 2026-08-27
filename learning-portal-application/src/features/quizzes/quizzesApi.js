import { apiSlice } from "../api/apiSlice";

const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    quizzes: builder.query({
      query: () => "/quizzes?_sort=id&_order=desc",
    }),
    quize: builder.query({
      query: (id) => `/quizzes/${id}`,
    }),
    addQuiz: builder.mutation({
      query: (quiz) => ({
        url: "/quizzes",
        method: "POST",
        body: quiz,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const succeed = await queryFulfilled;
        if (succeed?.data?.id) {
          dispatch(
            quizzesApi.util.updateQueryData("quizzes", undefined, (draft) => {
              draft.unshift(succeed.data);
            }),
          );
        }
      },
    }),
  }),
});
export const { useQuizzesQuery, useQuizeQuery, useAddQuizMutation } =
  quizzesApi;
