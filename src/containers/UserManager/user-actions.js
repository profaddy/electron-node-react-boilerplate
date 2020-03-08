import ActionTypes from "./user-manager-action-constants";
// import {createNotification} from "../../utils/notificationHelper";

const Actions = {
    _addUser: (user) => {
        console.log(user)
        return {
            type: ActionTypes.ADD_USER_REQUEST,
            user
        };
    },
    _fetchUser:() => {
        return {
            type:ActionTypes.FETCH_USER_REQUEST
        }
    }
};

export default Actions;
