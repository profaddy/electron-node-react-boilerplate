import Actions from "./user-manager-action-constants";
import { all, put, select, takeEvery } from "redux-saga/effects";

const getUsers = (state) =>  state.UserManager.users
const doesUserExist = (user,userList) => {
    try{
    let result = false
    const filteredUsers = userList.filter((item) => item.username === user.username);
    console.log(filteredUsers,"filteredUsers")
    if(filteredUsers.length > 0){
        console.error("user already exist")
        result = true
    }
    return result;
    }catch(error){
        console.log("error while validating duplicate user",error)
    }
}
export function* userLoginSaga(action) {
    try {
        const users = yield select(getUsers);
        console.log(doesUserExist(action.user,users),"test")
        if(doesUserExist(action.user,users)){
            yield put({ type: Actions.ADD_USER_FAILURE });
            return
            // throw new Error("user already exist")
        }
        yield put({ type: Actions.ADD_USER_SUCCESS, user:action.user });
    } catch (error) {
        console.log(error)
        yield put({ type: Actions.ADD_USER_FAILURE });

    }
}

export function* userLogoutSaga(action){
    console.log(action)
}

export default function* userManagerSagas() {
    yield all([
        takeEvery(Actions.ADD_USER_REQUEST, userLoginSaga),
        takeEvery(Actions.FETCH_USER_REQUEST, userLogoutSaga)
        // takeEvery(Actions.FETCH_USERS_REQUEST, fetchUsersSaga),
        // takeEvery(Actions.CREATE_USER_REQUEST, createUserSaga),
        // takeEvery(Actions.DELETE_USER_REQUEST, deleteUserSaga),
        // takeEvery(Actions.GET_USER_DETAILS_REQUEST, getUserDetailsSaga),
        // takeEvery(Actions.RESET_PASSWORD_REQUEST, resetPasswordSaga)
    ]);
}
