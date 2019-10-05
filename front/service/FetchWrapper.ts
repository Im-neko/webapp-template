import { getToken } from "./TokenService";  
import { isLogin } from "./LoginService";  
import env from "../environment";
import * as nodeFetch from "node-fetch";

const isServer = !process.browser;


export const fetchWrapper = <T>(path, options): Promise<T> => {
  // performs api calls sending the required authentication headers
  const headers = {
    "Accept": "application/json"
  };
  if (options.contentType === "json") headers["Content-Type"] = "application/json; charset=utf-8";
  if (isLogin()) headers["x-access-token"] = getToken();

  return new Promise((resolve, reject) => {
    if (isServer) {
      nodeFetch(`${env.internal_api_url}${path}`, {
        headers,
        mode: "cors",
        ...options
      })
      .then(res => _checkStatus(res))
      .then(res => res.json())
      .then(body => resolve(body))
      .catch(async (e) => {
        console.error(await e);
        reject(await e);
      });
    } else {
      fetch(`${env.api_url}${path}`, {
        headers,
        mode: "cors",
        ...options
      })
      .then(res => _checkStatus(res))
      .then(res => res.json())
      .then(body => resolve(body))
      .catch(async (e) => {
        console.error(await e);
        reject(await e);
      });
    }
  });
};

export const json2query = (json) => {
  if (json) {
    let queryString = "?";
    Object.keys(json).forEach((key) => {
      queryString += key+"="+json[key]+"&";
    });
    return queryString;
  }
  return '';
};

export const get = async <T>(path, query= null): Promise<T> => {
  const queryString = json2query(query);
  return await fetchWrapper<T>(`${path}${queryString}`, { method: "GET" });
};

export const post = async <T>(path, data={}) => {
  return await fetchWrapper<T>(`${path}`, {
    method: "POST",
    body: JSON.stringify(data),
    contentType: "json"
  });
};

export const put = async <T>(path, data={}) => {
  return await fetchWrapper<T>(`${path}`, {
    method: "PUT",
    body: JSON.stringify(data),
    contentType: "json"
  });
};

export const del = async <T>(path, data={}) => {
  return await fetchWrapper<T>(`${path}`, {
    method: "DELETE", 
    body: JSON.stringify(data), 
    contentType: "json"
  });
};

export const _checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) { // Success status lies between 200 to 300
    return res;
  } else {
    console.error(res);
    throw {status: res.status, body: res.json()};
  }
};
