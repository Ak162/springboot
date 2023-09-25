import axios from "axios";
import authHeader from "./jwt-token-access/auth-token-header";

//apply base url for axios
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL = API_BASE_URL + process.env.REACT_APP_API_BASE_URL_EXTENSION;
const API_VERSION = process.env.REACT_APP_API_VERSION;
export const SOCKET_URL = process.env.REACT_APP_API_SOCKET_URL;

const axiosApi = axios.create({
  baseURL: API_URL + API_VERSION,
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const updateToken = (token) => {
  axiosApi.defaults.headers.common["authorization"] = token;
};

const obj = JSON.parse(localStorage.getItem("authUser"));

updateToken(obj ? obj?.data?.Token : null);

const LogoutUser = () => {
  localStorage.clear();
  window.location.replace("/");
};

export async function get(url, config) {
  if (!config) {
    config = authHeader();
  }

  return await axiosApi.get(url, { ...config }).then((response) => {
    if (response.data.status === "failure") {
      if (response.data.isInvalidToken) {
        return LogoutUser();
      } else if (response.data.message === "Invalid Login Credential!") {
        LogoutUser();
        return { status: "failure" };
      }
    }

    return response.data;
  });
}

export async function post(url, data, config) {
  console.log('////url',url,'////data',data);
  if (!config) {
    config = authHeader();
  }

  console.log('/////config',config)

  return axiosApi.post(url, data, { ...config }).then((response) => {
   console.log('////response',response)
    if (response.data.status === "failure") {
      if (response.data.isInvalidToken) {
        return LogoutUser();
      } else if (response.data.message === "Invalid Login Credential!") {
        LogoutUser();
        return { status: "failure" };
      }
    }

    return response.data;
  });
}

export async function put(url, data, config) {
  if (!config) {
    config = authHeader();
  }

  return axiosApi.put(url, { ...data }, { ...config }).then((response) => {
    if (response.data.status === "failure") {
      if (response.data.isInvalidToken) {
        return LogoutUser();
      } else if (response.data.message === "Invalid Login Credential!") {
        LogoutUser();
        return { status: "failure" };
      }
    }

    return response.data;
  });
}

export async function del(url, config) {
  if (!config) {
    config = authHeader();
  }

  return await axiosApi.delete(url, { ...config }).then((response) => {
    if (response.data.status === "failure") {
      if (response.data.isInvalidToken) {
        return LogoutUser();
      } else if (response.data.message === "Invalid Login Credential!") {
        LogoutUser();
        return { status: "failure" };
      }
    }

    return response.data;
  });
}
