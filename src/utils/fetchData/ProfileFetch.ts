import {  baseUrl } from "../api";

export const fetchProfile = async () => {
  const res = await fetch(`${baseUrl}/profile`);
  const data = await res.json();
  return data;
};
