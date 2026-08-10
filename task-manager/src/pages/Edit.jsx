import { useNavigate, useParams } from "react-router";
import {
  useEditTaskMutation,
  useGetTaskQuery,
} from "../features/tasks/tasksApi";
import { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import { useGetTeamsQuery } from "../features/team/teamApi";
const initialTask = {
  taskName: "",
  deadline: "",
  status: "pending",
  teamMember: {
    name: "",
    avatar: "",
    id: "",
  },
  project: {
    id: "",
    projectName: "",
    colorClass: "",
  },
};
const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: taskData, isSuccess: isGetTaskSucceed } = useGetTaskQuery(id);
  const { data: projectsData, isSuccess: isProjectsDataSucceed } =
    useGetProjectsQuery();
  const { data: teamsData, isSuccess: isTeamsDataSucceed } = useGetTeamsQuery();
  const [editTask, { isSuccess: isEditTaskSucceed }] = useEditTaskMutation();
  const [task, setTask] = useState(initialTask);

  let teams = null;
  let projects = null;
  if (isTeamsDataSucceed) {
    teams = teamsData.map((team) => (
      <option key={team.id} value={team.id}>
        {team.name}
      </option>
    ));
  }
  if (isProjectsDataSucceed) {
    projects = projectsData.map((project) => (
      <option key={project.id} value={project.id}>
        {project.projectName}
      </option>
    ));
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "team":
        const findTeam = teamsData.find((team) => team.id == value);
        setTask((prev) => {
          return {
            ...prev,
            teamMember: findTeam,
          };
        });
        break;
      case "project":
        const findProject = projectsData.find((project) => project.id == value);
        setTask((prev) => {
          return {
            ...prev,
            project: findProject,
          };
        });
        break;
      default:
        setTask((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(task);
  };

  useEffect(() => {
    if (isGetTaskSucceed) {
      setTask(taskData);
    }
  }, [isGetTaskSucceed, taskData]);

  useEffect(() => {
    if (isEditTaskSucceed) {
      navigate("/");
    }
  }, [isEditTaskSucceed, navigate]);
  return (
    <>
      <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
        Edit Task for Your Team
      </h1>

      <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="fieldContainer">
            <label htmlFor="lws-taskName">Task Name</label>
            <input
              type="text"
              name="taskName"
              id="lws-taskName"
              required
              placeholder="Implement RTK Query"
              value={task?.taskName}
              onChange={handleInput}
            />
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-teamMember">Assign To</label>
            <select
              name="team"
              id="lws-teamMember"
              required
              onChange={handleInput}
              value={task?.teamMember?.id}
            >
              {teams}
            </select>
          </div>
          <div className="fieldContainer">
            <label htmlFor="lws-projectName">Project Name</label>
            <select
              id="lws-projectName"
              name="project"
              required
              onChange={handleInput}
              value={task?.project?.id}
            >
              {projects}
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-deadline">Deadline</label>
            <input
              type="date"
              name="deadline"
              id="lws-deadline"
              required
              value={task?.deadline}
              onChange={handleInput}
            />
          </div>

          <div className="text-right">
            <button type="submit" className="lws-submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Edit;
