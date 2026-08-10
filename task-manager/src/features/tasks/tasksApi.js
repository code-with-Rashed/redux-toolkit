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
        const editedTask = await queryFulfilled;
        if (editedTask?.data?.id) {
          dispatch(
            taskApi.util.updateQueryData("getTasks", undefined, (draft) => {
              let findTaskDraft = draft.find((task) => task.id == args.id);
              if (findTaskDraft) {
                findTaskDraft.taskName = editedTask?.data?.taskName;
                findTaskDraft.deadline = editedTask?.data?.deadline;
                findTaskDraft.status = editedTask?.data?.status;
                findTaskDraft.teamMember = editedTask?.data?.teamMember;
                findTaskDraft.project = editedTask?.data?.project;
              }
            }),
          );
        }
      },
    }),
    updateStatus: builder.mutation({
      query: (data) => ({
        url: `/tasks/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        const cacheUpdate = dispatch(
          taskApi.util.updateQueryData("getTasks", undefined, (draft) => {
            const findDraftTask = draft.find((task) => task.id == args.id);
            if (findDraftTask) {
              findDraftTask.status = args.status;
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
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const cacheUpdate = dispatch(
          taskApi.util.updateQueryData("getTasks", undefined, (draft) => {
            return draft.filter((task) => task.id != arg);
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
  useUpdateStatusMutation,
  useDeleteTaskMutation,
} = taskApi;
