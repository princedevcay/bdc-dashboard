// cookieUtils.js
import { useCookies } from 'react-cookie';

// Set a cookie
export const setCookie = (key, value, options = {}) => {
  const [cookies, setCookie] = useCookies();
  setCookie(key, value, options);
};

// Get a cookie
export const getCookie = (key) => {
  const [cookies] = useCookies();
  return cookies[key];
};

// Remove a cookie
export const removeCookie = (key) => {
  const [cookies, , removeCookie] = useCookies();
  removeCookie(key);
};
