import axios from "axios";
import { BASE_URL_API } from "../constants/config";

//Hàm đọc cookie
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const fetcher = axios.create({
  baseURL: BASE_URL_API,
  withCredentials: true, // ⬅️ Để gửi cookie khi gọi API
});

// ✅ Interceptor gắn csrf-token và Authorization từ cookie
fetcher.interceptors.request.use((config) => {
  // const csrfToken = getCookie("csrfToken");
  const jwtToken = getCookie("verifyToken"); // lấy từ cookie

  // if (csrfToken && config.headers) {
  //   config.headers["csrf-token"] = csrfToken;
  // }

  if (jwtToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${jwtToken}`;
  }

  return config;
});

export default fetcher;
