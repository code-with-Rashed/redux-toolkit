import { useGetProjectsQuery } from "../../features/projects/projectsApi";
import Project from "./Project";

const Projects = () => {
  const { data, isLoading, isError, error } = useGetProjectsQuery();
  let content = null;
  if (isLoading) {
    content = <strong>Loading...</strong>;
  }
  if (!isLoading && isError) {
    console.log(error);
    content = <strong className="error">{error?.error}</strong>;
  }
  if (!isLoading && !isError) {
    content = data.map((project) => (
      <Project key={project.id} project={project} />
    ));
  }
  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};
export default Projects;
