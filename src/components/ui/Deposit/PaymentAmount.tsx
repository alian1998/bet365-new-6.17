import { amount } from "@/lib/store/Index";
import { Amount } from "./Deposit";
import ButtonTick from "@/components/shared/buttonTick/ButtonTick";
import { TbCurrencyTaka } from "react-icons/tb";
import { IPaymentMethods } from "@/types/depositChannel/DepositChannel";

type IProps = {
  amounts: Amount;
  setAmount: React.Dispatch<React.SetStateAction<Amount>>;
  depositData: IPaymentMethods;
  paymentMethodId: string;
};
const PaymentAmount = ({
  amounts,
  setAmount,
  depositData,
  paymentMethodId,
}: IProps) => {
  const data = depositData.data.filter((data: { id: string }) => {
    return data.id == paymentMethodId;
  });

  return (
     <div className="px-2">
      <div className="cardColor2 rounded-sm px-2 py-3">
        {/* <p className="font-medium text-white1">Deposit Amount (BDT):</p> */}

        <div className="flex justify-between text-white text-sm">
          <p className="font-medium text-white1">Deposit Amount (BDT):</p>
          <div className="flex justify-between place-items-center  text-[12px] xxs:text-[16px] text-yellow-400">
            <TbCurrencyTaka /> {data && data[0]?.minAmount?.toFixed(2)} -{" "}
            <TbCurrencyTaka />
            {data && data[0]?.maxAmount?.toFixed(2)}
          </div>
        </div>

        <div className="grid grid-cols-4  items-center gap-2 mt-3">
          {amount.map((amount) => (
            <div
              onClick={() => setAmount(amount)}
              key={amount.id}
              className={`cardColor2 px-4 py-2 w-full text-center mx-auto rounded-md cursor-pointer relative ${amounts.amount == amount.amount
                  ? "border-2 border-[#ffb50a]"
                  : "border-2 border-black"
                }`}
            >
              <p className="text-white1 text-[14px]">
                {new Intl.NumberFormat("en-IN").format(Number(amount.amount))}
              </p>
              {amounts.amount == amount.amount ? (
                <ButtonTick className="absolute right-0 bottom-0 size-6" />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentAmount;
