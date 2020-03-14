import ActionTypes from "./inventory-manager-action-constants";
// import {createNotification} from "../../utils/notificationHelper";

const Actions = {
    _addInventory: (user) => {
        return {
            type: ActionTypes.ADD_INVENTORY_REQUEST,
            user
        };
    },
    _fetchInventories:() => {
        return {
            type:ActionTypes.FETCH_INVENTORIES_REQUEST
        }
    }
};

export default Actions;
