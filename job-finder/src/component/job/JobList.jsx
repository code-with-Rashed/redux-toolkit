import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import { useEffect } from "react";
import { getAllJobs } from "../../features/jobs/JobsSlice";

const JobList = () => {
  const allJobs = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  const { isLoading, isError, error, jobs } = allJobs;
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
    content = jobs.map((job) => <Job key={job.id} job={job} />);
  }
  return <div className="jobs-list">{content}</div>;
};
export default JobList;
