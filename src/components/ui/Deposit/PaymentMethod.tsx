import ButtonTick from "@/components/shared/buttonTick/ButtonTick";
import { Images } from "@/lib/store/Index";

import {
  IPaymentMethod,
  IPaymentMethods,
} from "@/types/depositChannel/DepositChannel";
import Image from "next/image";
import React from "react";
export type IProps = {
  paymentMethodId?: string;
  handlePaymentMethodId: (e: string) => void;
  depositData: IPaymentMethods;
};
const PaymentMethod = ({
  paymentMethodId,
  handlePaymentMethodId,
  depositData,
}: IProps) => {
  return (
    <div className="py-3 px-2">
      <h6 className="text-textColor font-medium">Payment Method</h6>
      <div className="grid grid-cols-3 gap-2 mt-3 ">
        {Array.isArray(depositData?.data) &&
          depositData?.data
            // .filter(
            //   (deposit: IPaymentMethod) => deposit.depositChannel?.length > 0
            // )
            ?.map((deposit: IPaymentMethod) => (
              <div
                key={deposit.id}
                onClick={() => handlePaymentMethodId(deposit.id)}
                className={`cardColor2 flex flex-col justify-center relative items-center gap-1 rounded-md py-1 cursor-pointer ${
                  paymentMethodId == deposit.id
                    ? "border-2 border-[#ffb50a]"
                    : "border-2 border-black"
                }`}
              >
                <Image
                  className="size-6"
                  // src={deposit?.image}
                  src={
                    deposit.paymentName == "Local Bank"
                      ? Images.localBank
                      : deposit.paymentName == "Mobile Bank"
                      ? Images.mobileBank
                      : deposit.paymentName == "Crypto"
                      ? Images.crypto
                      : ""
                  }
                  alt="img"
                  height={100}
                  width={100}
                />
                <p className="text-white1 text-[14px]">{deposit.paymentName}</p>
                {paymentMethodId == deposit.id ? (
                  <ButtonTick className="absolute right-0 bottom-0 size-6" />
                ) : (
                  ""
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
