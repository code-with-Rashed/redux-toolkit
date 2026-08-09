import { useGetTeamsQuery } from "../../features/team/teamApi";
import Team from "./Team";

const Teams = () => {
  const { data, isLoading, isError, error } = useGetTeamsQuery();
  let content = null;
  if (isLoading) {
    content = <strong>Loading...</strong>;
  }
  if (!isLoading && isError) {
    console.log(error);
    content = <strong className="error">{error?.error}</strong>;
  }
  if (!isLoading && !isError) {
    content = data.map((team) => <Team key={team.id} team={team} />);
  }
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
};
export default Teams;
