import { apiSlice } from "../api/apiSlice";

const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const addNewTask = await queryFulfilled;
        if (addNewTask?.data?.id) {
          dispatch(
            taskApi.util.updateQueryData("getTasks", undefined, (draft) => {
              draft.push(addNewTask.data);
            }),
          );
        }
      },
    }),
  }),
});
export const { useGetTasksQuery, useAddTaskMutation } = taskApi;
