import Deposit from "@/components/ui/Deposit/Deposit";
import { baseUrl } from "@/utils/api";
import { fetchWithToken } from "@/utils/fetchData/GetFetchData";
import { cookies } from "next/headers";

const DepositPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("gameToken");
  const tokenId = token?.value;

  const deposit = await fetchWithToken(
    `${baseUrl}/payment-method/get-payment-methods`,
    { cache: "no-store" }
  );

  const profile = await fetchWithToken(`${baseUrl}/profile`, {
    cache: "no-store",
    headers: {
      Authorization: `${tokenId}`,
    },
  });

  const selectPromotionToggle = profile?.data?.admin?.selectPromotionToggle === true;
  const promotionOptions = profile?.data?.admin?.promotionOptions || [];

  return (
    <Deposit
      deposit={deposit}
      selectPromotionToggle={selectPromotionToggle}
      promotionOptions={promotionOptions}
    />
  );
};

export default DepositPage;
