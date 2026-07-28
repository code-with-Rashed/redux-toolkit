import { Link } from "react-router";
import moment from "moment";
import gravatar from "gravatar";

const ChatItem = ({ chat, loggedInUserEmail }) => {
  const { id, message, timestamp, users } = chat || {};
  const { name, email } = users.find(
    (user) => user?.email !== loggedInUserEmail,
  );
  return (
    <li>
      <Link
        to={`/inbox/${id}`}
        className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
      >
        <img
          className="object-cover w-10 h-10 rounded-full"
          src={gravatar.url(email)}
          alt={name}
        />
        <div className="w-full pb-2 hidden md:block">
          <div className="flex justify-between">
            <span className="block ml-2 font-semibold text-gray-600">
              {name}
            </span>
            <span className="block ml-2 text-sm text-gray-600">
              {moment(timestamp).from()}
            </span>
          </div>
          <span className="block ml-2 text-sm text-gray-600">{message}</span>
        </div>
      </Link>
    </li>
  );
};
export default ChatItem;
