import baseApi from "../../utilities/baseApi";
import prepareQueryParam from "./prepareQueryParam";

const fetchAllPost = async (filters) => {
  const query = prepareQueryParam(filters);
  const url = `/blogs?${query}`;
  const response = await baseApi.get(url);
  return response.data;
};
export default fetchAllPost;
