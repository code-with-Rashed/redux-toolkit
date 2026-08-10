import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import Task from "./Task";

const Tasks = () => {
  const { data, isLoading, isError, error } = useGetTasksQuery();
  let content = null;
  if (isLoading) {
    content = <strong>Loading...</strong>;
  }
  if (!isLoading && isError) {
    content = <strong className="error">{error?.error}</strong>;
  }
  if (!isLoading && !isError) {
    content = data.map((task) => <Task key={task.id} task={task} />);
  }
  return <div className="lws-task-list">{content}</div>;
};
export default Tasks;
