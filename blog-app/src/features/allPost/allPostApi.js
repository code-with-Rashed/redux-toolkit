import baseApi from "../../utilities/baseApi";

const fetchAllPost = async () => {
  const response = await baseApi.get("/blogs");
  return response.data;
};
export default fetchAllPost;
