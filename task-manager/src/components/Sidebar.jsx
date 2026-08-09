import Projects from "./projects/Projects";
import Teams from "./team/Teams";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Projects />
      <Teams />
    </div>
  );
};
export default Sidebar;
