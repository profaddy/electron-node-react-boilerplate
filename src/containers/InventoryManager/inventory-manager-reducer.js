import ActionTypes from './inventory-manager-action-constants';


const INITIAL_STATE = {
  inventories:[]
};

const Reducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ActionTypes.ADD_INVENTORY_SUCCESS:
      let users = [
        ...state.users
    ];
      users = users.concat(action.user);
      return{
        ...state,
         users:users
      }
    case ActionTypes.FETCH_INVENTORIES_SUCCESS:
      return{
        ...state,
        inventories:action.data
      }
    default:
      return state
  }
}

export default Reducer;

