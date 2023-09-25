import { call, put, takeEvery } from "redux-saga/effects";

import { changePasswordFail,changePasswordSuccess,uploadImageFail,uploadImageSuccess } from "./actions";
import { postChangePassword ,postImageUpload} from "helpers/backend_helper";
import { UPLOAD_IMAGE ,CHANGE_PASSWORD} from "./actionTypes";
import toastr from "toastr";
function* onUploadImage({ payload: { data, callback } }) {
    try {
      const response = yield call(postImageUpload, data);
  
      if (response.status == "failure") {
        return yield put(uploadImageFail(response.message));
      }
      yield put(uploadImageSuccess(""));
      callback && callback(response);
    } catch (error) {
      yield put(uploadImageFail(error));
    }
  }

  function* onChangePassword({ payload: { data, callback } }) {
    try {
      const response = yield call(postChangePassword, data);
  
      if (response.status == "failure") {
        toastr.error(response.message);
        return yield put(changePasswordFail(response.message));
      }
      toastr.success("Update profile successfully!")
      yield put(changePasswordSuccess(""));
      callback && callback(response);
    } catch (error) {
      toastr.error("Internal Error!");
      yield put(changePasswordFail(error));
    }
  }

  
  
  function* AccountUpload() {
    yield takeEvery(UPLOAD_IMAGE, onUploadImage);
    yield takeEvery(CHANGE_PASSWORD,onChangePassword);
  }

  export default AccountUpload