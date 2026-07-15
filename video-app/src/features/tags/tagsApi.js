import baseApi from "../../utilities/baseApi";

const fetchTagsApi = async () => {
  const response = await baseApi.get("/tags");
  return response.data;
};

export default fetchTagsApi;
