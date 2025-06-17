import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useEffect, useState } from "react";
import { Amount } from "../Deposit";
import {
  IPaymentMethod,
  IPaymentMethods,
} from "@/types/depositChannel/DepositChannel";
import { useMutation } from "@tanstack/react-query";
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { postData } from "@/utils/postData/postAction/PostAction";
import { ErrorToastAlert, ToastAlert } from "@/utils/ToastAlert/ToastAlert";
 import Button3d from "../../Button3d";

type IProps = {
  amount: Amount;
  setAmount: React.Dispatch<React.SetStateAction<Amount>>;
  paymentMethodId: string;
  depositData: IPaymentMethods;
  depositChannel: string;
  bonusValue: string;
};

const MobileBank = ({
  amount,
  setAmount,
  paymentMethodId,
  depositData,
  depositChannel,
  bonusValue,
}: IProps) => {
  const [chengeValue, setChengeValue] = useState("0");
  
  useEffect(() => {
  console.log("chengeValue updated:", chengeValue);
}, [chengeValue]);

  
  const [copiedValue, setCopiedValue] = useState("");
  const [copyTime, setCopyTime] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { amount: amount.amount, transitionNumber: copiedValue },
  });

  const bank = depositData?.data?.find(
    (item: IPaymentMethod) => item.id == paymentMethodId
  );
  const filterData = depositData?.data?.find(
    (item: any) => item.id === paymentMethodId
  );
  const filterChannel = filterData?.depositChannel?.find(
    (item: any) => item.channelName === depositChannel
  );
  const agentData = filterChannel || null;


  useEffect(() => {
    setValue("amount", amount.amount);
    setValue("transitionNumber", copiedValue);
    if (amount.amount || copiedValue) {
      setChengeValue(amount.amount);
      setCopiedValue(copiedValue);
    }
  }, [amount.amount, copiedValue, setValue]);
  // const [minimumValue, setMinimumValue] = useState<number>(0);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // setMinimumValue(Number(value));
    setChengeValue(value);
    setAmount({ id: "", amount: value });
  };

  const handleTransitionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCopiedValue(e.target.value);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (depositData: FieldValues) => {
      const amount = parseFloat(depositData.amount);
      const bonus = Number(bonusValue || 0);
      const data = {
        ...depositData,
        amount,
        paymentMethod: bank?.paymentName,
        depositChannel: depositChannel,
        senderNumber: agentData?.accountNo,
        bonusValue: bonus,
      };
      const response = await postData({
        data,
        postUrl: "/player-deposit/deposit-request",
      });
      console.log(response);
      return response;
    },
    onSuccess: (data: any) => {
      if (data?.success == true) {
        ToastAlert(data?.message);
        router.push("/");
      } else {
        ErrorToastAlert(data?.message);
      }
    },
  });
  // const [minValue, setMinValue] = useState(false);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // const value = minimumValue;
    // if (value < 200) {
    //   setMinValue(true);
    //   return;
    // }
    // setMinValue(false);
    mutate(data);
  };

  const handlePasteClick = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setCopiedValue(clipboardText);
      setCopyTime(true);
      setTimeout(() => {
        setCopyTime(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-3 py-3 pb-14">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <div>
            <p className="text-textColor font-medium mb-1 text-[14px]">Amount</p>
            <input
              type="number"
              className="deposit-form cardColor2 text-[14px]"
              {...register("amount", { required: "Enter amount" })}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (
                  e.key === "e" ||
                  e.key === "E" ||
                  e.key === "+" ||
                  e.key === "-"
                ) {
                  e.preventDefault();
                }
              }}
              pattern="[0-9]*"
            />
            {/* {minValue === true ? (
              <p className="text-red-500 mt-1 text-[12px]">
                Minimum deposit amount is 200
              </p>
            ) : (
              ""
            )} */}
            {errors.amount?.message &&
              typeof errors.amount.message === "string" && (
                <p className="text-red-500 mt-1 text-[12px]">
                  {errors.amount.message}
                </p>
              )}
          </div>
          <div className="">
            <p className="text-textColor font-medium mb-1 text-[14px]">
              Transaction
            </p>
            <div className="relative">
              <input
                type="string"
                className="deposit-form cardColor2 xs:text-[14px] text-[14px] placeholder:text-white2"
                placeholder="Transaction"
                {...register("transitionNumber", {
                  required: "set transaction number",
                })}
                onChange={handleTransitionChange}
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center">
                {!copyTime && (
                  <h6
                    onClick={handlePasteClick}
                    className="px-3 py-1 bg-yellow-600 font-semibold rounded-sm text-[10px] text-white  cursor-pointer"
                  >
                    Paste
                  </h6>
                )}
              </div>
            </div>
            {errors.transitionNumber?.message &&
              typeof errors.transitionNumber.message === "string" && (
                <p className="text-red-500 mt-1 text-[12px]">
                  {errors.transitionNumber.message}
                </p>
              )}
          </div>
        </div>

        {/* <div className="rounded-lg mt-5 text-[14px] bg-no-repeat bg-center bg-cover bg-[url('/master-card.svg')]">
          <div className="bg-[#00000037] w-full h-full px-3 space-y-2 rounded-lg py-16">
            <div className="flex justify-between items-center">
              <div className="text-white2">Payment Method : </div>
              <div className="font-medium text-white1">{bank?.paymentName}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-white2">Deposit Channel : </div>
              <div className="font-medium text-white1">{depositChannel}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-white2">Deposit Amount : </div>
              <div className="font-medium text-white1">
                <p>{chengeValue}.00 BDT</p>
              </div>
            </div>
          </div>
        </div> */}
        <div className="py-2 mt-6  font-medium rounded w-full text-black1">
          {isPending ? (
            <div className="w-full bg-none border-2 border-[#fffb00ce] py-2 rounded-md flex justify-center items-center">
              <BounceLoader color="#fff900" size={25} speedMultiplier={2} />
            </div>
          ) : (
            // <motion.button
            //   whileTap={{ scale: 0.99 }}
            //   className="bg-secondary font-medium rounded w-full py-2 text-[14px] cursor-pointer"
            // >
            //   Deposit
            // </motion.button>

            <Button3d  name="Deposit" className="rounded-md text-black1" type="submit"></Button3d>
          )}
        </div>
      </form>
    </div>
  );
};

export default MobileBank;
