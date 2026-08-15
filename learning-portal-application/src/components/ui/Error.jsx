const Error = ({ message }) => {
  return <div className="error">{message || "something wrong!"}</div>;
};
export default Error;
