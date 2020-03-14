
export default {
  login: (payload) => {
    return {
      type:"USER_LOGIN",
      payload
    }
  },
  logout: (payload) => {
    return {
      type:"USER_LOGOUT",
      payload
    }
  }
  // login: createAction('USER_LOGIN'),
  // logout: createAction('USER_LOGOUT'),
};

