import axios from "axios";

// Login credentials
export const loginCall = async (userCredential, dispatch) => {
  dispatch({type: "LOGIN_START"});
  try {
    const res = await axios.post("auth/login", userCredential);
    dispatch({type:"LOGIN_SUCCESS", payload: res.data });
  } catch(err) {
    dispatch({type:"LOGIN_FAILURE", payload: err });
  }
}

// Allow functionality to make log out possible
export const logout = async (dispatch) => {
  dispatch({type: "LOGOUT"});
  
}