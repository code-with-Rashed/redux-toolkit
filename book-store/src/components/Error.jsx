const Error = ({ message }) => {
  return (
    <div className="bg-red-400 p-3 border-radius rounded text-center m-2">
      {message || "There was an error!"}
    </div>
  );
};
export default Error;
