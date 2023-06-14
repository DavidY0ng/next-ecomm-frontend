import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import {writable} from 'svelte/store';
import { goto } from '$app/navigation';

const emptyAuth = {
  "token": "",
  // "userId": ""
}



export async function authenticateUser(email, password) {
  const resp = await fetch(
    PUBLIC_BACKEND_BASE_URL + '/sign-in',
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