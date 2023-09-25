//REGISTER
export const POST_REGISTER_WITH_EMAIL = "/user/register"
// LOGIN
export const POST_LOGIN_WITH_EMAIL = "/user/login"
export const POST_LOGIN = "/user/login-with-wallet";
export const GET_SETTINGS = "/setting/view/";
export const GET_CURRENT_USER = "/user/profile";
export const UPDATE_PROFILE = "/user/updateProfile"
export const LINK_WALLET = "/user/link-wallet"
export const UNLINK_WALLET = "/user/unlink-wallet"
// File
export const POST_FILE = "/file/add";
export const POST_IPFS_FILE = "/file/ipfs";

///  wishlist
export const POST_WHITELIST = "/user/whitelist-request";

// contents API's
export const GET_TEAMS = "team/list";
export const GET_FAQS = "/faq/list ";
export const GET_ROADMAP = "/roadmap/list";

//collection details api
export const GET_COLLECTION = "/collection/view";

export const POST_MINT_ACTIVITY = "/item/user/mint-activity";
export const GET_ITEMS = "/item/list";
export const DISCORD_DATA = "/discord/auth"
export const DISCORD_USER_DATA = "/discord/callback"
export const UNLINK_DISCORD = "/discord/unlink"

//wallets APIs
export const GET_WALLETS = '/user/wallet-list'
export const ADD_WALLET = '/user/add-wallet' 
export const EDIT_WALLET = '/user/update-wallet'
export const DELETE_WALLET = '/user/delete-wallet' 

//profile image upload
export const POST_IMAGE_UPLOAD = '/user/updateProfileImage'
export const POST_CHANGE_PASSWORD = '/user/changePassword'

export const REDIRECT_URL_DISCORD_LOGIN = "/discord/authenticate";
export const POST_DISCORD_LOGIN = "/discord/login";

export const NFT_COPY_RRCTOMAIN = "/item/copy-tokens";


//forgot password

export const FORGOT_PASSWORD  = "/user/forgotPassword";
export const RESET_PASSWORD =  "/user/resetPassword";

export const GET_USER_MINTED_NFTS_COUNT = "/item/user/minted-nfts-count";