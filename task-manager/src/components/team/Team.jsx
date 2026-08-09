const Team = ({ team }) => {
  const { name, avatar } = team;
  return (
    <div className="checkbox-container">
      <img src={`src/assets/${avatar}`} className="team-avater" />
      <p className="label">{name}</p>
    </div>
  );
};
export default Team;
