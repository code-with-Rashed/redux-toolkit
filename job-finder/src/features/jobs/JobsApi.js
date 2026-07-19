import baseApi from "../../utilities/baseApi";

export const fetchAllJobs = async () => {
  const response = await baseApi("/jobs");
  return response.data;
};

export const addJob = async (data) => {
  const response = await baseApi.post("/jobs", data);
  return response.data;
};

export const fetchEditableJob = async (id) => {
  const response = await baseApi.get(`/jobs/${id}`);
  return response.data;
};

export const updateJob = async (data) => {
  const response = await baseApi.put(`/jobs/${data.id}`, data);
  return response.data;
};
