import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:9000",
});

export default baseApi;
