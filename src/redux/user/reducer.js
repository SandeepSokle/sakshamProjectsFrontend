const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "UPDATE":
      return { ...state, user: { ...action.payload, success: true } };
    case "LOGOUT":
      return null;
    default:
      return state;
  }
};
export default userReducer;
