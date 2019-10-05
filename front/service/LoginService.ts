import { getToken, setToken, isTokenValid } from "./TokenService"; 

import { post } from "./FetchWrapper";

const isServer = !process.browser;


interface loginInfo {
  email: string,
  password: string
};

interface loginRes {
  message?: string,
  data?: {
    token?: string
  },
  error?: boolean
};


export const login = async (loginInfo: loginInfo) => {
  if (!isServer) {
    try {
      const res: loginRes = await post("/login", loginInfo);
      const token = res.data.token;
      setToken(token)
      return true
    } catch(e) {
      console.error(e);
    }
  }
};

export const isLogin = () => {
  if (!isServer) {
    const token = getToken(); // Get token from localstorage
    return !!token && isTokenValid(token); // handwaiving here
  }
};

export const logout = () => {
  if (!isServer) {
    // Clear storage
    localStorage.clear();
    window.location.reload();
  }
};
