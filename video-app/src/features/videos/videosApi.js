import baseApi from "../../utilities/baseApi";

const fetchVideosApi = async (filters) => {
  const { search, tags } = filters;
  const params = new URLSearchParams();
  tags.forEach((tag) => {
    params.append("tags_like", tag);
  });
  const url = `/videos?title_like=${search}&${params}`;
  const response = await baseApi.get(url);
  return response.data;
};

export default fetchVideosApi;
