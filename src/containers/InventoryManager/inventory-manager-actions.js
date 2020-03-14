import ActionTypes from "./inventory-manager-action-constants";

const Actions = {
    _addInventory: (user) => {
        return {
            type: ActionTypes.ADD_INVENTORY_REQUEST,
            user
        };
    },
    _fetchInventories: () => {
        return {
            type: ActionTypes.FETCH_INVENTORIES_REQUEST
        };
    }
};

export default Actions;
