import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../features/tasks/tasksApi";
import Task from "./Task";

const Tasks = () => {
  const { data, isLoading, isError, error } = useGetTasksQuery();
  const { search, projects } = useSelector((state) => state.filters);

  let content = null;
  if (isLoading) {
    content = <strong>Loading...</strong>;
  }
  if (!isLoading && isError) {
    content = <strong className="error">{error?.error}</strong>;
  }
  if (!isLoading && !isError) {
    content = data
      .filter((task) => {
        const matchesSearch =
          !search || task.taskName.toLowerCase().includes(search.toLowerCase());
        const matchProject =
          !projects.length || projects.includes(task.project.projectName);
        return matchesSearch && matchProject;
      })
      .map((task) => <Task key={task.id} task={task} />);
  }
  return <div className="lws-task-list">{content}</div>;
};
export default Tasks;
