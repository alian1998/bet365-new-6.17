import { ContextApi } from "@/lib/provider/Providers";
import { IPaymentMethods } from "@/types/depositChannel/DepositChannel";
import { copyToClipboard } from "@/utils/copyButton/CopyButton";
import React from "react";
import { useContext } from "react";
import { FaCopy } from "react-icons/fa";

type IProps = {
  paymentMethodId: string;
  depositChannel: string;
  depositData: IPaymentMethods;
};

const AgentBanking = ({
  paymentMethodId,
  depositChannel,
  depositData,
}: IProps) => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("something wrong");
  }
  const { copyTime, setCopyTime } = context;
  const handleCopyTimeOut = (e: string) => {
    copyToClipboard(e);
    setCopyTime(true);
    setTimeout(() => {
      setCopyTime(false);
    }, 1000);
  };

  const filterData = depositData?.data?.find(
    (item: any) => item.id === paymentMethodId
  );
  const filterChannel = filterData?.depositChannel?.find(
    (item: any) => item.channelName === depositChannel
  );
  const agentData = filterChannel || null;

  return (
    <div className="w-full bg-black p-2 my-3 text-white1">
      <div>
        <p className=" font-medium mb-2">Payment Details</p>
        <div className=" bg-deepslate1 rounded-md p-2 text-[14px]">
          <div className="flex items-center justify-between ">
            <h6 className="font-medium">Account Type:</h6>
            <p>{agentData?.type}</p>
          </div>
          <div className="flex items-center justify-between mt-2 ">
            <h6 className="font-medium">Account Number:</h6>
            <div className="flex items-center gap-x-2">
              <p>{agentData?.accountNo}</p>
              {copyTime ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#FFF"
                  className="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              ) : (
                <FaCopy
                  onClick={() =>
                    handleCopyTimeOut(agentData ? agentData?.accountNo : "")
                  }
                  className="cursor-pointer size-4"
                />
              )}
            </div>
          </div>
          <div className="flex items-center mt-1 justify-between ">
            <h6 className="font-medium">Description:</h6>
            <p className="capitalize first-letter:uppercase">
              {agentData?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBanking;
