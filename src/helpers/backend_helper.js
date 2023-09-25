import { post, get, put } from "./api_helper";
import * as url from "./url_helper";
import authHeader from "./jwt-token-access/auth-token-header";

// Login Method
export const postLogin = (data) => post(url.POST_LOGIN, data);
export const getProfile = () => get(url.GET_CURRENT_USER);
export const updateProfile = (data) => post(url.UPDATE_PROFILE, data);
export const linkWallet = (data) => post(url.LINK_WALLET, data);
export const unlinkWallet = (data) => post(url.UNLINK_WALLET, data);
export const postLoginWithEmail = (data) => post(url.POST_LOGIN_WITH_EMAIL, data);
export const postRegisterWithEmail = (data) => post(url.POST_REGISTER_WITH_EMAIL, data);

//setting
export const getSettings = () => get(url.GET_SETTINGS);
//wallets
export const getWallets = (data) => post(url.GET_WALLETS, data);
export const addWallet = (data) => post(url.ADD_WALLET, data);
export const editWallet = (data) => post(url.EDIT_WALLET, data);
export const deleteWallet = (data) => post(url.DELETE_WALLET, data);

// File
export const postFile = (data) => {
  const formData = new FormData();

  Object.entries(data).map(([key, value]) => formData.append(key, value));

  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  };

  return post(url.POST_FILE, formData, config);
};

export const postImageFile = (data) => {
  const formData = new FormData();

  Object.entries(data).map(([key, value]) => formData.append(key, value));

  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  };

  return post(url.POST_FILE, formData, config);
};


export const postIpfsFile = (data) => {
  const formData = new FormData();
  Object.entries(data).map(([key, value]) => formData.append(key, value));
  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  };

  return post(url.POST_IPFS_FILE, formData, config);
};


export const postImageUpload = (data) => {
  const formData = new FormData();
  Object.entries(data).map(([key, value]) => formData.append(key, value));
  const config = {
    headers: { ...authHeader(), "content-type": "multipart/form-data" },
  };

  return post(url.POST_IMAGE_UPLOAD, formData, config);
};

//WHITELIST
export const postWhitelist = () => get(url.POST_WHITELIST);

export const getTeams = () => post(url.GET_TEAMS, {});
export const getFaqs = () => get(url.GET_FAQS);
export const getRoadmap = () => get(url.GET_ROADMAP);

//Collection details
export const getCollection = (data) => get(url.GET_COLLECTION + "/" + data);

export const postMintActivity = (data) => post(url.POST_MINT_ACTIVITY, data);
export const getItems = (data) => post(url.GET_ITEMS, data);

export const getDiscordDataApi = (data) => get(url.DISCORD_DATA);

export const getDiscordUserDataApi = (accessToken) => get(url.DISCORD_USER_DATA + "?accessToken=" + accessToken);
export const unlinkDiscord = (data) => post(url.UNLINK_DISCORD, data);
export const postChangePassword = (data)=> post(url.POST_CHANGE_PASSWORD,data)

export const getDiscordLoginRedirectApi = ()=> get(url.REDIRECT_URL_DISCORD_LOGIN)
export const postDiscordLoginApi = (data)=> post(url.POST_DISCORD_LOGIN,data)

export const postNftRrcToMainApi = (data)=> post(url.NFT_COPY_RRCTOMAIN,data)

export const postForgotPasssordApi = (data) => post(url.FORGOT_PASSWORD,data);
export const postResetPasssordApi = (data) => post(url.RESET_PASSWORD,data); 
export const getUserMintedNftsCountApi = (data) => post(url.GET_USER_MINTED_NFTS_COUNT,data); 
