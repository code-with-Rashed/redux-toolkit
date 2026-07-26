import ChatHead from "./ChatHead";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

const ChatBody = () => {
  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">
        <ChatHead />
        <Messages />
        <SendMessage />
      </div>
    </div>
  );
};
export default ChatBody;
