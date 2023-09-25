import { UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAIL,UPLOAD_IMAGE, CHANGE_PASSWORD,CHANGE_PASSWORD_FAIL,CHANGE_PASSWORD_SUCCESS } from "./actionTypes";

const INIT_STATE = {
  loading: false,
  error: "",
  profileImage: null
};

const AccountUpdate = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE:
    return {
        ...state,
        loading:true
    }
    case UPLOAD_IMAGE_SUCCESS:
    return {
        ...state,
        loading:true,
        profileImage: action?.payload?.data?.profileImage
    }
    case UPLOAD_IMAGE_FAIL:
    return {
        ...state,
        error: action?.payload?.data,
        loading:false
    }

    case CHANGE_PASSWORD:
    return {
        ...state,
        loading:true
    }
    case CHANGE_PASSWORD_SUCCESS:
    return {
      ...state,
      loading:false
    }  
    case CHANGE_PASSWORD_FAIL:
    return {
        ...state,
        error: action?.payload?.data,
        loading:false
    }

    default:
      return state;
  }
};

export default AccountUpdate;