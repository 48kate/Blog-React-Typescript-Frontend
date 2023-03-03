/* checks Local Storage for user item, if there is a logged in user with accessToken, 
return HTTP Authorization header, otherwise, return an empty object */

import AuthService from "./AuthService";

export default function authHeader() {
  const token = AuthService.getToken();
    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }