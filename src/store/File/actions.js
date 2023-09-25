import { UPLOAD_FILE, POST_IPFS_FILE, API_FAIL } from "./actionTypes";

export const apiFail = (error) => ({
  type: API_FAIL,
  payload: error,
});

export const uploadFile = (data, callback) => ({
  type: UPLOAD_FILE,
  payload: { data, callback },
});

export const postIpfsFile = (data, callback) => ({
  type: POST_IPFS_FILE,
  payload: { data, callback },
});
