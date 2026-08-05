import { useState } from "react";
import conversationsApi, {
  useGetConversationsQuery,
} from "../../features/conversations/conversationsApi";
import Auth from "../../utilities/Auth";
import ChatItem from "./ChatItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";

const ChatItems = () => {
  const { user } = Auth();
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useGetConversationsQuery(
    user?.email,
  );
  const { data: conversations, totalConversation } = data || {};

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreConversations = () => {
    const withLoggedinUser = user?.email;
    const totalPage = Math.ceil(
      totalConversation / import.meta.env.VITE_SHOW_CONVERSATIONS_PER_PAGE,
    );
    const nextPage = currentPage < totalPage && currentPage + 1;
    if (currentPage < totalPage) {
      dispatch(
        conversationsApi.endpoints.getMoreConversations.initiate({
          withLoggedinUser,
          nextPage,
        }),
      );
    } else {
      setHasMore(false);
    }
    setCurrentPage((prev) => prev + 1);
  };

  let content = null;
  if (isLoading) {
    content = <li>Loading...</li>;
  }
  if (!isLoading && isError) {
    content = <li className="text-red-400">{error?.error}</li>;
  }
  if (!isLoading && !isError && conversations?.length === 0) {
    content = <li>Conversation not found.</li>;
  }
  if (!isLoading && !isError && conversations?.length > 0) {
    content = (
      <InfiniteScroll
        dataLength={conversations.length}
        hasMore={hasMore}
        next={fetchMoreConversations}
        loader={
          <p className="font-bold m-2 text-center text-green-400">Loading...</p>
        }
        endMessage={
          <p className="m-2 text-sm text-center text-green-400">
            No More Conversations yet.
          </p>
        }
      >
        {conversations.map((chat) => (
          <ChatItem key={chat.id} chat={chat} loggedInUserEmail={user?.email} />
        ))}
      </InfiniteScroll>
    );
  }
  return <ul>{content}</ul>;
};
export default ChatItems;
