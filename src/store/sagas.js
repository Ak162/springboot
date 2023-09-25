import { all, fork } from "redux-saga/effects";

//public
import AuthSaga from "./auth/login/saga";
import ProfileSaga from "./auth/Profile/saga";
import RegisterSaga from "./auth/register/saga";

// Public
import File from "./File/saga";
import Setting from "./setting/saga";
import Whitelist from "./Whitelist/saga";
import Contents from "./allContent/Teams/saga";
import Collection from "./collection/saga";
import Items from "./items/saga";
import Discord from "./discord/saga"
import Wallets from "./wallets/saga";
import ProfileImageSaga from "./Account/saga";



export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(ProfileSaga),
    fork(RegisterSaga),  
    fork(File),
    fork(Setting),
    fork(Whitelist),
    fork(Contents),
    fork(Collection),
    fork(Items),
    fork(Discord),
    fork(Wallets),
    fork(ProfileImageSaga)
  
  ]);
}
