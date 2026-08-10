import { useDispatch } from "react-redux";
import { selectedProjects } from "@/features/filters/filtersSlice";

const Project = ({ project }) => {
  const { projectName, colorClass } = project;
  const dispatch = useDispatch();
  const selectProject = (e) => {
    dispatch(selectedProjects(e.target.value));
  };
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={colorClass}
        value={projectName}
        onChange={selectProject}
      />
      <p className="label">{projectName}</p>
    </div>
  );
};
export default Project;
