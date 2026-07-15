import baseApi from "../../utilities/baseApi";

const fetchVideosApi = async () => {
  const response = await baseApi.get("/videos");
  return response.data;
};

export default fetchVideosApi;
