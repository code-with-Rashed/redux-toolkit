import Auth from "../../../utilities/Auth";
import Message from "./Message";

const Messages = ({ messages }) => {
  const { user } = Auth();
  return (
    <div className="relative w-full p-6 overflow-y-auto">
      <ul className="space-y-2">
        {messages
          .slice()
          .sort((a, b) => a.timestamp - b.timestamp)
          .map((conversation) => {
            const { id, message, sender } = conversation;
            const show = sender.email === user?.email ? "end" : "start";
            return <Message key={id} justify={show} message={message} />;
          })}
      </ul>
    </div>
  );
};
export default Messages;
