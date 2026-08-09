const Project = ({ project }) => {
  const { projectName, colorClass } = project;
  return (
    <div className="checkbox-container">
      <input type="checkbox" className={colorClass} />
      <p className="label">{projectName}</p>
    </div>
  );
};
export default Project;
