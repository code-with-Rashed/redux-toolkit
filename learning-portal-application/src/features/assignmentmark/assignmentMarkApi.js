import { apiSlice } from "../api/apiSlice";

const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    assignmentMarks: builder.query({
      query: () => "/assignmentMark",
    }),
    markAssignment: builder.mutation({
      query: ({ id, mark, status }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: { mark, status },
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const succeed = await queryFulfilled;
        if (succeed?.data?.id) {
          dispatch(
            assignmentMarkApi.util.updateQueryData(
              "assignmentMarks",
              undefined,
              (draft) => {
                const findIndex = draft.findIndex(
                  (assignment) => assignment.id === succeed.data.id,
                );
                draft[findIndex].mark = succeed.data.mark;
                draft[findIndex].status = succeed.data.status;
              },
            ),
          );
        }
      },
    }),
  }),
});
export const { useAssignmentMarksQuery, useMarkAssignmentMutation } =
  assignmentMarkApi;
