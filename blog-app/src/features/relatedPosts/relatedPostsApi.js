import baseApi from "../../utilities/baseApi";

const fetchRelatedPosts = async (dataForFiltering) => {
  const { id, tags } = dataForFiltering;
  const params = new URLSearchParams();
  tags.forEach((tag) => {
    params.append("tags_like", tag);
  });
  params.append("id_ne", id);
  const url = `/blogs?${params}`;
  const response = await baseApi(url);
  return response.data;
};
export default fetchRelatedPosts;
