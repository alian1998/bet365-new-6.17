"use server"
import { cookies } from "next/headers";

export const removeInvalidToken = async () => {
    const cookieStore = cookies();
    await cookieStore.delete("gameToken");
    console.log("Invalid token removed successfully");
  };
  