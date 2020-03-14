import Actions from "./user-manager-action-constants";
import { all, put, select, takeEvery, call } from "redux-saga/effects";
import { fetchUsers }  from "./user-manager-api.js";

const getUsers = (state) =>  state.UserManager.users
function* fetchUsersSaga(action) {
    try {
        const { data }  = yield call(fetchUsers);
        const { users }  = data;
        const formattedUsers = users.reduce((acc,item) => {
            const entry = {name:item.name,value:item._id}
            acc.push(entry);
            return acc;
        },[])
        yield put({ type: Actions.FETCH_USER_SUCCESS,data:formattedUsers })
    } catch (error) {
        yield put({ type: Actions.FETCH_ENTRY_FAILURE })
    }
} 
const doesUserExist = (user,userList) => {
    try{
    let result = false
    const filteredUsers = userList.filter((item) => item.username === user.username);
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

export default function* userManagerSagas() {
    yield all([
        takeEvery(Actions.ADD_USER_REQUEST, userLoginSaga),
        takeEvery(Actions.FETCH_USER_REQUEST,fetchUsersSaga)
        // takeEvery(Actions.FETCH_USERS_REQUEST, fetchUsersSaga),
        // takeEvery(Actions.CREATE_USER_REQUEST, createUserSaga),
        // takeEvery(Actions.DELETE_USER_REQUEST, deleteUserSaga),
        // takeEvery(Actions.GET_USER_DETAILS_REQUEST, getUserDetailsSaga),
        // takeEvery(Actions.RESET_PASSWORD_REQUEST, resetPasswordSaga)
    ]);
}
