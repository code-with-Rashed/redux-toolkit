import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import { Link } from "react-router";
const Description = ({ id, title, description, date }) => {
  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-800">
        {title}
      </h1>
      <div className="pb-4 flex items-center space-between border-b">
        <h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
          Uploaded on {date}
        </h2>

        <div className="flex gap-10 w-48">
          <div className="flex gap-1">
            <div className="shrink-0">
              <img className="w-5 block" src={Edit} alt="Edit" />
            </div>
            <Link
              to={`/videos/edit/${id}`}
              className="text-sm leading-[1.7142857] text-slate-600"
            >
              Edit
            </Link>
          </div>
          <div className="flex gap-1">
            <div className="shrink-0">
              <img className="w-5 block" src={Delete} alt="Delete" />
            </div>
            <div className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
              Delete
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-[#334155] dark:text-slate-400">
        {description}
      </div>
    </div>
  );
};
export default Description;
