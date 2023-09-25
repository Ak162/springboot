import { combineReducers } from "redux";

// Authentication
import Login from "./auth/login/reducer";
import Profile from "./auth/Profile/reducer";


// Public
import Register from "./auth/register/reducer"
import File from "./File/reducer";
import Setting from "./setting/reducer";
import Whitelist from "./Whitelist/reducer";
import Contents from "./allContent/Teams/reducer";
import Collection from "./collection/reducer";
import Items from "./items/reducer";
import Discord from "./discord/reducer";
import Wallets from "./wallets/reducer";
import ImageUpload from "./Account/reducer";

const rootReducer = combineReducers({
  Login,
  Profile,
  Register,
  File,
  Setting,
  Whitelist,
  Contents,
  Collection,
  Items,
  Discord,
  Wallets,
  ImageUpload
});

export default rootReducer;
