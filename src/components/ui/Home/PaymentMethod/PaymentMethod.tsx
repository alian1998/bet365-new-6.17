 import { paymentMethod } from "@/lib/store/Index";
import { IPayment } from "@/types/Payment/payment";
import Image from "next/image";
import React from "react";

const PaymentMethod = () => {
  return (
    <div className="px-3">
      <div className="flex justify-start items-center py-3 gap-1">
        {paymentMethod.map((payment: IPayment) => (
          <div key={payment.id} className="cursor-pointer h-7">
            <Image className="w-full h-full" src={payment.image} alt="pay"  height={100} width={100}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
