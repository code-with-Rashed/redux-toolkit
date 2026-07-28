import { useGetConversationsQuery } from "../../features/conversations/conversationsApi";
import Auth from "../../utilities/Auth";
import ChatItem from "./ChatItem";

const ChatItems = () => {
  const { user } = Auth();
  const { data, isLoading, isError, error } = useGetConversationsQuery(
    user?.email,
  );
  let content = null;
  if (isLoading) {
    content = <li>Loading...</li>;
  }
  if (!isLoading && isError) {
    content = <li className="text-red-400">{error?.error}</li>;
  }
  if (!isLoading && !isError && data?.length === 0) {
    content = <li>Conversation not found.</li>;
  }
  if (!isLoading && !isError && data?.length > 0) {
    content = data.map((chat) => (
      <ChatItem key={chat.id} chat={chat} loggedInUserEmail={user?.email} />
    ));
  }
  return <ul>{content}</ul>;
};
export default ChatItems;
