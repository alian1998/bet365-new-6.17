import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import {
  IPaymentMethod,
  IPaymentMethods,
} from "@/types/depositChannel/DepositChannel";
import { useMutation } from "@tanstack/react-query";
import { BounceLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { Amount } from "../Withdraw";
import { ContextApi } from "@/lib/provider/Providers";
import { postData } from "@/utils/postData/postAction/PostAction";
import { useProfileData } from "@/utils/fetchData/FetchData/ProfileData";
import { ErrorToastAlert, ToastAlert } from "@/utils/ToastAlert/ToastAlert";
import Button3d from "../../Button3d";

type IProps = {
  amount: Amount;
  setAmount: React.Dispatch<React.SetStateAction<Amount>>;
  paymentMethodId: string;
  depositData: IPaymentMethods;
  depositChannel: string;
};

const MobileBank = ({
  amount,
  setAmount,
  paymentMethodId,
  depositData,
  depositChannel,
}: IProps) => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("error");
  }

  const { data: profileData } = useProfileData();
  const [chengeValue, setChengeValue] = useState("0");
  console.log(chengeValue);
  
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { amount: amount.amount },
  });

  const bank = depositData?.data?.find(
    (item: IPaymentMethod) => item.id == paymentMethodId
  );

  useEffect(() => {
    setValue("amount", amount.amount);

    if (amount.amount) {
      setChengeValue(amount.amount);
    }
  }, [amount.amount, setValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setChengeValue(value);
    setAmount({ id: "", amount: value });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (depositData: FieldValues) => {
      const amount = parseFloat(depositData.amount);

      if (!profileData?.phone) {
        ErrorToastAlert("Please add your phone number");
        return;
      }
      const withdrawData = {
        accountNumber: profileData?.phone,
        amount,
        withdrawMethod: bank?.paymentName,
        withdrawChannel: depositChannel,
      };
      const response = await postData({
        data: withdrawData,
        postUrl: "/player-withdraw/create-withdraw",
      });
      return response;
    },
    onSuccess: (data: any) => {
      console.log(data);
      if (data?.success == true) {
        ToastAlert(data?.message);
        router.push("/");
      } else {
        ErrorToastAlert(data?.message);
      }
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    mutate(data);
  };
  return (
    <div className="px-2 py-3 pb-14">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <div>
            <p className="text-textColor font-medium mb-1 text-[14px]">Amount</p>
            <input
              type="number"
              className="deposit-form text-[14px] cardColor2 placeholder:text-white2"
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
            {errors.amount?.message &&
              typeof errors.amount.message === "string" && (
                <p className="text-red-500 mt-1 text-[12px]">
                  {errors.amount.message}
                </p>
              )}
          </div>
          <div className="relative">
            <p className="text-textColor font-medium mb-1 text-[14px]">
              Account number
            </p>
            <input
              type="string"
              className="deposit-form cardColor2 placeholder:text-white2 xs:text-[14px] text-[14px]"
              placeholder="Account number"
              {...register("accountNumber")}
              value={profileData?.phone}
              readOnly
              required
            // onChange={handleTransitionChange}
            />

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
              <div className="text-white2">Withdraw Method : </div>
              <div className="font-medium text-white1">{bank?.paymentName}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-white2">Withdraw Channel : </div>
              <div className="font-medium text-white1">{depositChannel}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-white2">Withdraw Amount : </div>
              <div className="font-medium text-white1">
                <p>{chengeValue}.00 BDT</p>
              </div>
            </div>
          </div>
        </div> */}
        <div className="py-2 mt-6 font-medium rounded w-full text-black1">
          {isPending ? (
            <div className="w-full bg-none border border-[#fffb00b1] py-2 rounded-md flex justify-center items-center">
              <BounceLoader color="#fff900" size={25} speedMultiplier={2} />
            </div>
          ) : (
            // <Button3d name="Withdraw"  >
            //  </Button3d>
            <Button3d name="Withdraw" className="rounded-md" type="submit"></Button3d>

          )}

        </div>
      </form>
    </div>
  );
};

export default MobileBank;
