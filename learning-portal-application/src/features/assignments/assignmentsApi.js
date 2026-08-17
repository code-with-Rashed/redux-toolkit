import { apiSlice } from "../api/apiSlice";

const assignmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    assignments: builder.query({
      query: () => "/assignments?_sort=id&_order=desc",
    }),
    assignment: builder.query({
      query: (id) => `/assignments/${id}`,
    }),
    addAssignment: builder.mutation({
      query: (assignment) => ({
        url: "/assignments",
        method: "POST",
        body: assignment,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const succeed = await queryFulfilled;
        if (succeed?.data?.id) {
          dispatch(
            assignmentsApi.util.updateQueryData(
              "assignments",
              undefined,
              (draft) => {
                draft.unshift(succeed.data);
              },
            ),
          );
        }
      },
    }),
    updateAssignment: builder.mutation({
      query: (assignment) => ({
        url: `/assignments/${assignment.id}`,
        method: "PUT",
        body: assignment,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const succed = await queryFulfilled;
        if (succed?.data?.id) {
          dispatch(
            assignmentsApi.util.updateQueryData(
              "assignments",
              undefined,
              (draft) => {
                const findIndex = draft.findIndex(
                  (assignment) => assignment.id === succed.data.id,
                );
                draft[findIndex] = succed.data;
              },
            ),
          );
        }
      },
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deleted = dispatch(
          assignmentsApi.util.updateQueryData(
            "assignments",
            undefined,
            (draft) => {
              const findIndex = draft.findIndex(
                (assignment) => assignment.id == arg,
              );
              draft.splice(findIndex, 1);
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          deleted.undo();
        }
      },
    }),
  }),
});

export const {
  useAssignmentsQuery,
  useAssignmentQuery,
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
  useDeleteAssignmentMutation,
} = assignmentsApi;
