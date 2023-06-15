import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import {writable} from 'svelte/store';
import { goto } from '$app/navigation';

const emptyAuth = {
  "token": "",
  // "userId": ""
}

function logInStatus () {
  const {subscribe, set} = writable(false);

  return {
    subscribe,
    loggedIn: () => set(true),
    loggedOut: () => set(false)
  }
}

export const userStatus = logInStatus()

export function logOut() {
  localStorage.setItem("auth", JSON.stringify(emptyAuth));
  goto ('/')
  userStatus.loggedOut
  return true
}

export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["token"]
  }
  return null
}

export async function isLoggedIn() {
  if (!getTokenFromLocalStorage()) {
    return false
  }

  try {
    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/api/collections/users/auth-refresh',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getTokenFromLocalStorage()
        },
      }
    );

    const res = await resp.json()
    if (resp.status == 200) {

      localStorage.setItem("auth", JSON.stringify({
        "token": res.token,
        "userId": res.record.id
      }));

      return true
    }
    return false
  } catch {
    return false
  }
}

export async function authenticateUser(email, password) {
  const resp = await fetch(
    PUBLIC_BACKEND_BASE_URL + '/auth',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  );

  const res = await resp.json();

  if (resp.status == 200) {
    localStorage.setItem("auth", JSON.stringify({
      "token": res.accessToken,
      // "userId": res.id
    }));
    userStatus.loggedIn
    return {
      success: true,
      res: res
    }
  }

  return {
    success: false,
    res: res
  }
}