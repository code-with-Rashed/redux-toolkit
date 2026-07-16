import baseApi from "../../utilities/baseApi";

const updateLikesUnlikes = async (data) => {
  const { id, likes, unlikes } = data;
  const response = await baseApi.patch(`/videos/${id}`, { likes, unlikes });
  return response.data;
};
export default updateLikesUnlikes;
