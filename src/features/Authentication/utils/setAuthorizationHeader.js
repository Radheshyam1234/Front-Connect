import axios from "axios";

export const setAuthorizationHeader = (token) => {
  if (token) {
    console.log(token);
    return (axios.defaults.headers.common["authorization"] = "Bearer " + token);
  }
  delete axios.defaults.headers.common["authorization"];
};
