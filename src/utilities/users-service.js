import * as usersApi from './users-api';

export async function signUp(userData) {

  const token = await usersApi.signUp(userData);
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersApi.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
  const token = localStorage.getItem('token');

  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token');
    return null
  }

  return token;
}

export function getUser() {
  const token = getToken();

  return token ? JSON.parse(atob(token.split('.')[1])).user : null   

}
