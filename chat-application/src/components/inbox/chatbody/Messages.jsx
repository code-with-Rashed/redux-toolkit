import InfiniteScroll from "react-infinite-scroll-component";
import Auth from "../../../utilities/Auth";
import Message from "./Message";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import messageApi from "../../../features/messages/messageApi";

const Messages = ({ messages, totalMessages, id }) => {
  const { user } = Auth();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreConversations = () => {
    const totalPage = Math.ceil(
      totalMessages / import.meta.env.VITE_SHOW_MESSAGE_PER_PAGE,
    );

    const nextPage = currentPage < totalPage && currentPage + 1;

    if (currentPage < totalPage) {
      dispatch(messageApi.endpoints.olderMessages.initiate({ id, nextPage }));
    } else {
      setHasMore(false);
    }
    setCurrentPage((prev) => prev + 1);
  };

  const messageBoxRef = useRef(null);
  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, []);
  return (
    <div className="relative w-full p-6 overflow-y-auto" ref={messageBoxRef}>
      <ul className="space-y-2 flex flex-col-reverse">
        <InfiniteScroll
          dataLength={messages.length}
          hasMore={hasMore}
          next={fetchMoreConversations}
          inverse={true}
          className="flex flex-col-reverse"
          loader={
            <p className="m-2 text-sm text-center text-green-400">
              Loading older messages...
            </p>
          }
        >
          {messages.map((conversation) => {
            const { id, message, sender } = conversation;
            const show = sender.email === user?.email ? "end" : "start";
            return (
              <Message key={id} justify={show} message={message} id={id} />
            );
          })}
        </InfiniteScroll>
      </ul>
    </div>
  );
};
export default Messages;
