import * as usersApi from './users-api';

export async function signUp(userData) {

  const token = await usersApi.signUp(userData);
  return token
}

