import { apiSlice } from "../api/apiSlice";

const quizzesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    quizzes: builder.query({
      query: () => "/quizzes?_sort=id&_order=desc",
    }),
    quize: builder.query({
      query: (id) => `/quizzes/${id}`,
      providesTags: (result, error, arg) => [{ type: "Quiz", id: arg }],
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
    updateQiz: builder.mutation({
      query: (quiz) => ({
        url: `/quizzes/${quiz.id}`,
        method: "PATCH",
        body: quiz,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const succeed = await queryFulfilled;
        if (succeed?.data?.id) {
          dispatch(
            quizzesApi.util.updateQueryData("quizzes", undefined, (draft) => {
              const quizIndex = draft.findIndex(
                (quiz) => quiz.id === succeed.data.id,
              );
              draft[quizIndex] = succeed.data;
            }),
          );
          dispatch(
            quizzesApi.util.invalidateTags([
              { type: "Quiz", id: succeed.data.id },
            ]),
          );
        }
      },
    }),
  }),
});
export const {
  useQuizzesQuery,
  useQuizeQuery,
  useAddQuizMutation,
  useUpdateQizMutation,
} = quizzesApi;
