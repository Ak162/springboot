import {UPLOAD_IMAGE,UPLOAD_IMAGE_FAIL, UPLOAD_IMAGE_SUCCESS,CHANGE_PASSWORD,CHANGE_PASSWORD_SUCCESS,CHANGE_PASSWORD_FAIL} from './actionTypes' ;


export const uploadImage = (data, callback) => ({
    type: UPLOAD_IMAGE,
    payload: { data, callback },
});
 

export const uploadImageFail = () => ({
    type: UPLOAD_IMAGE_FAIL,
    payload: {},
});
 
export const uploadImageSuccess = (data, callback) => ({
    type: UPLOAD_IMAGE_SUCCESS,
    payload: {data, callback}
});
  
export const changePassword = (data, callback) => ({
    type: CHANGE_PASSWORD,
    payload: { data, callback },
});
 

export const changePasswordFail = () => ({
    type: CHANGE_PASSWORD_FAIL,
    payload: {},
});
 
export const changePasswordSuccess = (data, callback) => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload: {data, callback}
});
