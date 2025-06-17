"use client";

import React, { useEffect, useState } from "react";
import { StaticImageData } from "next/image";
import {
  IChannel,
  IDepositChannel,
  IPaymentMethodA,
} from "@/types/depositChannel/DepositChannel";
import WithdrawMethod from "./WithdrawMethod";
import WithdrawChannel from "./WithdrawChannel";
import WithdrawAmount from "./WithdrawAmount";
import MobileBank from "./WithdrawForm/MobileBank";

export interface Amount {
  id: string;
  amount: string;
}

export interface IPaymentMethod {
  id: string;
  image: string | StaticImageData;
  name: string;
}

const Withdraw = ({ withdraw }: any) => {
  const depositData = withdraw?.data;
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

  return (
    <div className="  pb-5">
      <WithdrawMethod
        paymentMethodId={paymentMethodId}
        handlePaymentMethodId={handlePaymentMethodId}
        depositData={depositData}
      />
      <WithdrawChannel
        paymentMethodId={paymentMethodId}
        depositData={depositData}
        depositChannel={depositChannel}
        handleDepositChannel={handleDepositChannel}
      />
      {/* <AgentBanking
        paymentMethodId={paymentMethodId}
        depositChannel={depositChannel}
        depositData={depositData}
      /> */}
      <WithdrawAmount
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
      />
    </div>
  );
};

export default Withdraw;
