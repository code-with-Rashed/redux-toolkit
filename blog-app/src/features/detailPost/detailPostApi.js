import baseApi from "../../utilities/baseApi";

export const fetchDetailPost = async (id) => {
  const response = baseApi.get(`/blogs/${id}`);
  return (await response).data;
};

export const updatePostStatus = async (data) => {
  const { id, isSaved } = data;
  const response = baseApi.patch(`/blogs/${id}`, { isSaved });
  return response.data;
};

export const updatePostLikes = async (data) => {
  const { id, likes } = data;
  const response = baseApi.patch(`/blogs/${id}`, { likes });
  return response.data;
};
