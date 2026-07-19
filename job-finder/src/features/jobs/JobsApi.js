import baseApi from "../../utilities/baseApi";

export const fetchAllJobs = async () => {
  const response = await baseApi("/jobs");
  return response.data;
};
