import baseApi from "../../utilities/baseApi";

const fetchRelatedVideos = async (id, tags) => {
  const params = new URLSearchParams();
  tags.forEach((tag) => {
    params.append("tags_like", tag);
  });
  params.append("id_ne", id);
  const url = `/videos?${params}`;
  const response = await baseApi.get(url);
  return response.data;
};

export default fetchRelatedVideos;
