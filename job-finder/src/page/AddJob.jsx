import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewJob } from "../features/jobs/JobsSlice";

const initialForm = {
  title: "",
  type: "",
  salary: "",
  deadline: "",
};
const AddJob = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((formData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewJob(form));
    setForm(initialForm);
  };
  return (
    <>
      <h1 className="mb-10 text-center lws-section-title">Add New Job</h1>
      <div className="max-w-3xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="fieldContainer">
            <label
              htmlFor="lws-JobTitle"
              className="text-sm font-medium text-slate-300"
            >
              Job Title
            </label>
            <select
              id="lws-JobTitle"
              name="title"
              required
              value={form.title}
              onChange={handleInput}
            >
              <option value="">Select Job</option>
              <option>Software Engineer</option>
              <option>Software Developer</option>
              <option>Full Stack Developer</option>
              <option>MERN Stack Developer</option>
              <option>DevOps Engineer</option>
              <option>QA Engineer</option>
              <option>Product Manager</option>
              <option>Social Media Manager</option>
              <option>Senior Executive</option>
              <option>Junior Executive</option>
              <option>Android App Developer</option>
              <option>IOS App Developer</option>
              <option>Frontend Developer</option>
              <option>Frontend Engineer</option>
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobType">Job Type</label>
            <select
              id="lws-JobType"
              name="type"
              required
              value={form.type}
              onChange={handleInput}
            >
              <option value="">Select Job Type</option>
              <option>Full Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobSalary">Salary</label>
            <div className="flex border rounded-md shadow-sm border-slate-600">
              <span className="input-tag">BDT</span>
              <input
                type="number"
                name="salary"
                id="lws-JobSalary"
                required
                className="!rounded-l-none !border-0"
                placeholder="000"
                value={form.salary}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="fieldContainer">
            <label htmlFor="lws-JobDeadline">Deadline</label>
            <input
              type="date"
              name="deadline"
              id="lws-JobDeadline"
              required
              value={form.deadline}
              onChange={handleInput}
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              id="lws-submit"
              className="cursor-pointer btn btn-primary w-fit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddJob;
