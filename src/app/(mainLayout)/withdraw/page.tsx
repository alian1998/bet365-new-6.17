// import Withdraw2 from "@/components/ui/withdraw/Withdraw2";
import Withdraw from "@/components/ui/Withdraws/Withdraw";
import { baseUrl } from "@/utils/api";
import { fetchWithToken } from "@/utils/fetchData/GetFetchData";
import { TbCurrencyTaka } from "react-icons/tb";

const page = async () => {
  const balanceData = await fetchWithToken(`${baseUrl}/profile/balance`);
  const balance = balanceData?.data?.balance;
  const withdraw = await fetchWithToken(
    `${baseUrl}/payment-method/get-payment-methods`,
    {
      cache: "no-store",
    }
  );

  return (
     <div className="w-full py-3 h-full overflow-auto mainBgColor">
      <div className="mt-3 px-2 text-textColor ">
        <h6 className="text-[18px] font-medium ">Withdraw</h6>

        <h6 className="text-[18px] flex items-center gap-3 mt-3">
          <span className="font-semibold items-center">Avilable Balance :</span>{" "}
          <span className="flex items-center">
            <TbCurrencyTaka /> {balance}
          </span>
        </h6>
      </div>
      <Withdraw withdraw={withdraw} />
    </div>
  );
};

export default page;
