import baseApi from "../../utilities/baseApi";

const fetchDetailPost = async (id) => {
  const response = baseApi(`/blogs/${id}`);
  return (await response).data;
};
export default fetchDetailPost;
