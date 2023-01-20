import axios from "axios";

export const loginUser = (data) => {
  console.log("in login action", data);
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT",
  };
};

export const updateUser = (data) => {
  console.log("inupdate action", data);
  return {
    type: "UPDATE",
    payload: { data },
  };
};
