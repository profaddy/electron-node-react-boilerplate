import ActionTypes from './user-manager-action-constants';


const INITIAL_STATE = {
  loggedIn:false,
  username:"",
  users:[]
};

const Reducer = (state = INITIAL_STATE, action) => {
  console.log(action,"reducer")
  switch(action.type){
    case ActionTypes.ADD_USER_SUCCESS:
      let users = [
        ...state.users
    ];
      users = users.concat(action.user);
      return{
        ...state,
         users:users
      }
    case ActionTypes.FETCH_USER_SUCCESS:
      return{
        ...state,
        ...action.payload
      }
      // case REHYDRATE:
      //   return {
      //     ...state,
      //     users: [] 
      //   };
    default:
      return state
  }
}

export default Reducer;

