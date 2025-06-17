import { baseUrl } from "@/utils/api";
import { fetchWithToken } from "@/utils/fetchData/GetFetchData";
import HomeComponents from "@/components/ui/Home/HomeComponents/HomeComponents";
import { cookies } from "next/headers";

export type IBalance = {
  balance: number;
};

const page = async () => {
  const balanceData = await fetchWithToken(`${baseUrl}/profile/balance`);
  const balance = balanceData?.data?.balance;
  const cookieStore = cookies();
  const token = cookieStore.get("gameToken");
  const tokenId = token?.value;
  const pageData = {
    balanceData,
    balance,
    tokenId,
  };

  return <HomeComponents {...pageData} />;
};

export default page;
