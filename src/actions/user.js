
export default {
  login: (payload) => {
    console.log("test")
    return {
      type:"USER_LOGIN",
      payload
    }
  },
  logout: (payload) => {
    console.log("test1",payload)
    return {
      type:"USER_LOGOUT",
      payload
    }
  }
  // login: createAction('USER_LOGIN'),
  // logout: createAction('USER_LOGOUT'),
};

