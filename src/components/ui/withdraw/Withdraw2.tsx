// "use client";

// import React, { useEffect, useState } from "react";
// import PaymentMethod from "../../../components/ui/Deposit/PaymentMethod";
// import DepositChannel from "../../../components/ui/Deposit/DepositChannel";
// import PaymentAmount from "@/components/ui/Deposit/PaymentAmount";
// import MobileBank from "@/components/ui/Deposit/DepositForm/MobileBank";
// import { StaticImageData } from "next/image";
// import { useDepositData } from "@/utils/fetchData/DepositFetching";
// import FadeLoaderSpin from "@/components/shared/loading/FadeLoader";
// import {
//   IChannel,
//   IDepositChannel,
// } from "@/types/depositChannel/DepositChannel";

// export interface Amount {
//   id: string;
//   amount: string;
// }

// export interface IPaymentMethod {
//   id: string;
//   image: string | StaticImageData;
//   name: string;
// }

// const Withdraw2 = () => {
//   const { data: depositData, isLoading } = useDepositData();
//   const [depositChannel, setDepositChannel] = useState<string>("");
//   const [paymentMethodId, setPaymentMethodId] = useState<string>("");
//   const [amount, setAmount] = useState<Amount>({
//     id: "1",
//     amount: "500",
//   });

//   const handlePaymentMethodId = (id: string) => {
//     setPaymentMethodId(id);
//     const channel = depositData?.data
//       .filter((item: IDepositChannel) => item.id === id)
//       .map((item: IDepositChannel) => item?.depositChannel[0]?.channelName);
//     setDepositChannel(channel[0] || "");
//   };

//   const handleDepositChannel = (channel: IChannel) => {
//     setDepositChannel(channel.channelName);
//   };

//   useEffect(() => {
//     if (depositData?.data && depositData.data.length > 0) {
//       setPaymentMethodId(depositData.data[0].id);
//       setDepositChannel(depositData?.data[0]?.depositChannel[0]?.channelName);
//     }
//   }, [depositData]);

//   if (isLoading) {
//     return <FadeLoaderSpin />;
//   }

//   return (
//     <div className="bg-deepSlate pb-5">
//       <PaymentMethod
//         paymentMethodId={paymentMethodId}
//         handlePaymentMethodId={handlePaymentMethodId}
//         depositData={depositData}
//       />
//       <DepositChannel
//         paymentMethodId={paymentMethodId}
//         depositData={depositData}
//         depositChannel={depositChannel}
//         handleDepositChannel={handleDepositChannel}
//       />

//       <PaymentAmount setAmount={setAmount} amounts={amount}  />
//       <MobileBank
//         paymentMethodId={paymentMethodId}
//         amount={amount}
//         setAmount={setAmount}
//         depositData={depositData}
//         depositChannel={depositChannel}
//       />
//     </div>
//   );
// };

// export default Withdraw2;
