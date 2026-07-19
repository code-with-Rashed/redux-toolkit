import baseApi from "../../utilities/baseApi";

export const fetchAllJobs = async () => {
  const response = await baseApi("/jobs");
  return response.data;
};

export const addJob = async (data) => {
  const response = await baseApi.post("/jobs", data);
  return response.data;
};
