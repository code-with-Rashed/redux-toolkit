import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import { useEffect } from "react";
import { getAllJobs } from "../../features/jobs/JobsSlice";

const JobList = () => {
  const allJobs = useSelector((state) => state.jobs);
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  const { isLoading, isError, error, jobs } = allJobs;
  const { filterByType, sortBySalary, search } = filters;

  let content = null;
  if (isLoading) {
    content = <div className="text-green-400 font-bold m-2">Loading...</div>;
  }
  if (!isLoading && isError) {
    content = <div className="text-red-400 font-semibold m-2">{error}</div>;
  }
  if (!isLoading && !isError && jobs?.length === 0) {
    content = (
      <div className="text-green-400 font-bold m-2">Job Not Found.</div>
    );
  }
  if (!isLoading && !isError && jobs?.length > 0) {
    content = jobs
      .filter((job) => {
        const matchesType = !filterByType || job.type === filterByType;
        const matchesSearch =
          !search || job.title.toLowerCase().includes(search.toLowerCase());
        return matchesType && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBySalary === "low-to-high") return a.salary - b.salary;
        if (sortBySalary === "high-to-low") return b.salary - a.salary;
        return 0;
      })
      .map((job) => <Job key={job.id} job={job} />);
  }
  return <div className="jobs-list">{content}</div>;
};
export default JobList;
