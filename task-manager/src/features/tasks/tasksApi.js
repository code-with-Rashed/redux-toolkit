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
    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
    }),
    editTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: "PATCH",
        body: task,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const cacheUpdate = dispatch(
          taskApi.util.updateQueryData("getTasks", undefined, (draft) => {
            let findTaskDraft = draft.find((task) => task.id == args.id);
            if (findTaskDraft) {
              findTaskDraft.taskName = args.taskName;
              findTaskDraft.deadline = args.deadline;
              findTaskDraft.status = args.status;
              findTaskDraft.teamMember = args.teamMember;
              findTaskDraft.project = args.project;
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch (error) {
          cacheUpdate.undo();
        }
      },
    }),
  }),
});
export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useGetTaskQuery,
  useEditTaskMutation,
} = taskApi;
