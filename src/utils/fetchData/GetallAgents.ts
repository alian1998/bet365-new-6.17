import { baseUrl } from "../api";

export const fetchAllAgent = async () => {
  try {
    const res = await fetch(`${baseUrl}/admins/get-all-agent`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching agents:", error);
    return;
  }
};
