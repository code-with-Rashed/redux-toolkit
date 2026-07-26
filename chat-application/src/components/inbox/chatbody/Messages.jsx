import Message from "./Message";

const Messages = () => {
  return (
    <div className="relative w-full p-6 overflow-y-auto">
      <ul className="space-y-2">
        <Message justify="start" message="Hello" />
        <Message justify="end" message="Welcome" />
      </ul>
    </div>
  );
};
export default Messages;
