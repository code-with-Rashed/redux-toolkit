import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getEditableJob } from "../features/jobs/JobsSlice";
import EditForm from "../component/EditForm";

const EditJob = () => {
  const jobInfo = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isLoading, isError, error, job } = jobInfo;

  useEffect(() => {
    dispatch(getEditableJob(id));
  }, [dispatch, id]);

  let content = null;
  if (isLoading) {
    content = <div className="text-green-400 font-bold m-2">Loading...</div>;
  }

  if (!isLoading && isError) {
    content = <div className="text-red-400 font-bold m-2">{error}</div>;
  }

  if (!isLoading && !isError && job?.id) {
    content = <EditForm job={job} />;
  }

  return (
    <>
      <h1 className="mb-10 text-center lws-section-title">Edit Job</h1>
      <div className="max-w-3xl mx-auto">{content}</div>
    </>
  );
};
export default EditJob;
