"use client";

import React, { useEffect, useState } from "react";
import PaymentMethod from "../../../components/ui/Deposit/PaymentMethod";
import DepositChannel from "../../../components/ui/Deposit/DepositChannel";
import PaymentAmount from "@/components/ui/Deposit/PaymentAmount";
import MobileBank from "@/components/ui/Deposit/DepositForm/MobileBank";
import { StaticImageData } from "next/image";
import AgentBanking from "./AgentBanking";
import {
  IChannel,
  IDepositChannel,
  IPaymentMethodA,
} from "@/types/depositChannel/DepositChannel";

export interface Amount {
  id: string;
  amount: string;
}

export interface IPaymentMethod {
  id: string;
  image: string | StaticImageData;
  name: string;
}

const Deposit = ({
  deposit,
  selectPromotionToggle,
  promotionOptions,
}: {
  deposit: any;
  selectPromotionToggle: boolean;
  promotionOptions: any[];
}) => {
  const [bonusValue, setBonusValue] = useState("0");
  const depositData = deposit?.data;
  const [depositChannel, setDepositChannel] = useState<string>("");
  const [paymentMethodId, setPaymentMethodId] = useState<string>("");
  const [amount, setAmount] = useState<Amount>({
    id: "1",
    amount: "500",
  });

  const handlePaymentMethodId = (id: string) => {
    setPaymentMethodId(id);
    const channel = depositData?.data
      .filter((item: IDepositChannel) => item.id === id)
      .map((item: IDepositChannel) => item?.depositChannel[0]?.channelName);
    setDepositChannel(channel[0] || "");
  };

  const handleDepositChannel = (channel: IChannel) => {
    setDepositChannel(channel.channelName);
  };

  useEffect(() => {
    if (depositData?.data && depositData.data.length > 0) {
      const filteredDeposits = depositData.data.filter(
        (deposit: IPaymentMethodA) => deposit.depositChannel?.length > 0
      );

      if (filteredDeposits.length > 0) {
        setPaymentMethodId(filteredDeposits[0].id);
        setDepositChannel(filteredDeposits[0].depositChannel[0].channelName);
      }
    }
  }, [depositData]);
  // allCards
  return (
    <div className="mainBgColor text-textColor pb-5">
      {selectPromotionToggle && (
        <div className="px-3 py-2">
          <h6 className="text-textColor font-medium">Select Promotion</h6>
          <select
            className="w-full cardColor2 px-3 py-2 rounded text-white1 text-sm"
            value={bonusValue}
            onChange={(e) => setBonusValue(e.target.value)}
          >
            {promotionOptions
              ?.filter((opt: any) => opt.enabled)
              .map((opt: any) => (
                <option
                  className="text-black"
                  key={opt.value}
                  value={opt.value}
                >
                  {opt.label}
                </option>
              ))}
          </select>
        </div>
      )}

      <PaymentMethod
        paymentMethodId={paymentMethodId}
        handlePaymentMethodId={handlePaymentMethodId}
        depositData={depositData}
      />

      <DepositChannel
        paymentMethodId={paymentMethodId}
        depositData={depositData}
        depositChannel={depositChannel}
        handleDepositChannel={handleDepositChannel}
      />
      <AgentBanking
        paymentMethodId={paymentMethodId}
        depositChannel={depositChannel}
        depositData={depositData}
      />
      <PaymentAmount
        setAmount={setAmount}
        amounts={amount}
        paymentMethodId={paymentMethodId}
        depositData={depositData}
      />
      <MobileBank
        paymentMethodId={paymentMethodId}
        amount={amount}
        setAmount={setAmount}
        depositData={depositData}
        depositChannel={depositChannel}
        bonusValue={bonusValue}
      />
    </div>
  );
};

export default Deposit;
