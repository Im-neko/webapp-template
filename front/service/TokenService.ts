import decode from "jwt-decode";

const isServer = !process.browser;


export const setToken = (token) => {
  if (!isServer) {
    // Saves user token to localStorage
    localStorage.setItem("token", token);
  }
};

export const getToken = () => {
  if (!isServer) {
    // Retrieves the user token from localStorage
    const token = localStorage.getItem("token");
    if (token && token.length > 100) { // undefinedもtrueになってしまうので回避
      return token;
    } else {
      return false;
    }
  }
};

export const isTokenValid = (token) => {
  if (!isServer) {
    try {
      const decoded = decode(token);
      if (decoded.exp > Date.now() / 1000) { 
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
};

export const decodeJWT = () => {
  if (!isServer) {
    // Using jwt-decode npm package to decode the token
    return decode(getToken());
  }
};
