import axios from "axios";

export const select = (data) => {
  return {
    type: "SELECT",
    payload: data,
  };
};

export const unselect = (data) => {
  return {
    type: "UNSELECT",
    payload: data,
  };
};
export const unselectall = (data) => {
  return {
    type: "UNSELECTALL",
   
  };
};



export const getData = (data) => {
//   console.log(data);
  return {
    type: "GETDATA",
    payload: data,
  };
};
