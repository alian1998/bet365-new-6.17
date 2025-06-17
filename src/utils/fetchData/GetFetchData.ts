// import { cookies } from "next/headers";

// export const fetchWithToken = async (
//   endpoint: string,
//   options: RequestInit = {},
//   revalidate: number = 30
// ) => {
//   const cookieStore = cookies();
//   const token = cookieStore.get("gameToken")?.value;
//   console.log(token);

//   if (!token) {
//     return null;
//   }

//   const res = await fetch(endpoint, {
//     ...options,
//     headers: {
//       ...options.headers,
//       Authorization: `${"token"}`,
//     },
//     next: { revalidate },
//   });

//   if (!res.ok) {
//     console.error(`Failed to fetch data from ${endpoint}: ${res.statusText}`);
//     return null;
//   }
//   return res.json();
// };
import { cookies } from "next/headers";

export const fetchWithToken = async (
  endpoint: string,
  options: RequestInit = {},
  revalidate: number = 30
) => {
  const cookieStore = cookies();
  const token = cookieStore.get("gameToken")?.value;
  if (!token) {
    return null;
  }
  try {
    const res = await fetch(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `${token}`,
      },
      next: { revalidate },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error);
    return null;
  }
};
