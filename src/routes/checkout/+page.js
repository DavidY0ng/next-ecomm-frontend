// export async function load({ fetch }) {
//     const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/checkout');
//     const res = await resp.json();
//     if (resp.status == 200) {
//       return {
//         session: "at checkout page"

//       }
//     } else {
//       return {
//         session: "fail"
//       }
//     }
//   }