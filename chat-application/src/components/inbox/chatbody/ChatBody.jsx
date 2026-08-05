import { useParams } from "react-router";
import { useMessagesQuery } from "../../../features/messages/messageApi";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Error from "../../ui/Error";

const ChatBody = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMessagesQuery(id);
  const { data: messages, totalMessages } = data || {};

  let content = null;
  if (isLoading) {
    content = (
      <div className="text-green-400 text-center p-4 m-4">Loading...</div>
    );
  } else if (!isLoading && isError) {
    content = <Error message={error?.error} />;
  } else if (!isLoading && !isError && messages?.length === 0) {
    content = (
      <div className="text-green-400 text-center p-4 m-4">No Message found</div>
    );
  } else if (!isLoading && !isError && messages?.length > 0) {
    content = (
      <>
        <ChatHead user={messages[0]} />
        <Messages messages={messages} totalMessages={totalMessages} id={id}/>
        <SendMessage user={messages[0]} />
      </>
    );
  }
  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">{content}</div>
    </div>
  );
};
export default ChatBody;
