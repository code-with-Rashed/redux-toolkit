import baseApi from "../../utilities/baseApi";

const fetchVideo = async (id) => {
  const response = await baseApi.get(`/videos/${id}`);
  return response.data;
};
export default fetchVideo;
