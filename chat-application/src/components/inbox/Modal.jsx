import { useEffect, useState } from "react";
import isValidEmail from "../../utilities/isValidEmail";
import { useGetUserQuery } from "../../features/users/usersApi";
import Error from "../ui/Error";
import Auth from "../../utilities/Auth";
import { useDispatch } from "react-redux";
import conversationsApi, {
  useAddCoversationMutation,
  useUpdateConversationMutation,
} from "../../features/conversations/conversationsApi";
import { useAddMessageMutation } from "../../features/messages/messageApi";

const Modal = ({ openModal, controlModal }) => {
  const dispatch = useDispatch();

  const { user: loggedInUser } = Auth();

  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState(undefined);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [skipRequestFirstTime, setSkipRequestFirstTime] = useState(false);
  const { data: findedUser } = useGetUserQuery(to, {
    skip: !skipRequestFirstTime,
  });

  const [
    addCoversation,
    { data: addConversationResponse, isSuccess: isAddConversationSucceed },
  ] = useAddCoversationMutation();

  const [
    updateConversation,
    {
      data: updateConversationResponse,
      isSuccess: isUpdateConversationSucceed,
    },
  ] = useUpdateConversationMutation();

  const [addMessage] = useAddMessageMutation();

  useEffect(() => {
    if (to === loggedInUser?.email) {
      setShowError(true);
      setErrorMessage("You can not messages with yourself!");
    } else if (findedUser && findedUser?.length === 0) {
      setShowError(true);
      setErrorMessage(`The ${to} user is not found!`);
      setConversations(undefined);
    } else if (findedUser && findedUser?.length > 0) {
      setShowError(false);
      dispatch(
        conversationsApi.endpoints.getConversation.initiate({
          loggedInUserEmail: loggedInUser?.email,
          participantEmail: to,
        }),
      )
        .unwrap()
        .then((data) => {
          setConversations(data);
        });
    }
  }, [findedUser]);

  const debounceEmail = (fn, delay) => {
    let timeId;
    return (...args) => {
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  const doSearch = (value) => {
    if (isValidEmail(value)) {
      setTo(value);
      setSkipRequestFirstTime(true);
    } else {
      setShowError(false);
    }
  };
  const handleEmail = debounceEmail(doSearch, 500);

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().getTime();
    if (conversations && conversations.length === 0) {
      const {
        id: loggedInUserId,
        email: loggedInUserEmail,
        name: loggedInUserName,
      } = loggedInUser || {};
      const {
        id: findedUserId,
        email: findedUserEmail,
        name: findedUserName,
      } = findedUser?.[0] || {};
      addCoversation({
        participants: `${loggedInUserEmail}-${to}`,
        users: [
          {
            email: loggedInUserEmail,
            name: loggedInUserName,
            id: loggedInUserId,
          },
          {
            email: findedUserEmail,
            name: findedUserName,
            id: findedUserId,
          },
        ],
        message: message,
        timestamp: timestamp,
      });
    } else if (conversations && conversations.length > 0) {
      updateConversation({
        ...conversations?.[0],
        message,
        timestamp,
      });
    }
  };

  useEffect(() => {
    if (isAddConversationSucceed || isUpdateConversationSucceed) {
      const { id, message, timestamp } =
        addConversationResponse || updateConversationResponse || {};
      const {
        id: loggedInUserId,
        email: loggedInUserEmail,
        name: loggedInUserName,
      } = loggedInUser || {};
      const {
        id: findedUserId,
        email: findedUserEmail,
        name: findedUserName,
      } = findedUser?.[0] || {};

      addMessage({
        conversationId: id,
        sender: {
          email: loggedInUserEmail,
          name: loggedInUserName,
          id: loggedInUserId,
        },
        receiver: {
          email: findedUserEmail,
          name: findedUserName,
          id: findedUserId,
        },
        message,
        timestamp,
      });
      controlModal();
    }
  }, [isAddConversationSucceed, isUpdateConversationSucceed]);

  return (
    openModal && (
      <>
        <div
          onClick={controlModal}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Send message
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="to" className="sr-only">
                  To
                </label>
                <input
                  id="to"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Send to"
                  onChange={(e) => handleEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Message"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                disabled={conversations === undefined}
              >
                Send Message
              </button>
            </div>
          </form>
          {showError && <Error message={errorMessage} />}
        </div>
      </>
    )
  );
};
export default Modal;
