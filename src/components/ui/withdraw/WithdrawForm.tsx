"use client";
import Form from "@/components/Form/Form";
import FormInputField from "@/components/Form/FormInputField";
import FormSelectField from "@/components/Form/FormSelectField";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
export const validationSchema = z.object({
  amount: z.string().min(1, "This field is required."),
});

const agentOption = [
  {
    label: "bkash",
    value: "bkash",
  },
  {
    label: "nagad",
    value: "nagad",
  },
];
const agentMethod = [
  {
    label: "mobile bank",
    value: "mobile bank",
  },
  {
    label: "bank",
    value: "bank",
  },
];

const WithdrawForm = () => {
  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  return (
    <div className="mt-10">
      <Form
        onSubmit={formSubmit}
        resolver={zodResolver(validationSchema)}
        defaultValues={{
          amount: "",
          accountNumber: "",
          withdrawChannel: "",
          withdrawMethod: "",
          typeAddress: "",
        }}
      >
        <div className="space-y-4">
          <div className="relative">
            <p className="text-white1 text-[14px] mb-1 font-normal">
              Withdraw Method
            </p>
            <FormSelectField
              name="withdrawMethod"
              className="bg-transperant signup-select"
              options={agentMethod}
              type="string"
              defaultValue={1}
            />
          </div>
          <div className="relative">
            <p className="text-white1 text-[14px] mb-1 font-normal">
              Withdraw Channel
            </p>
            <FormSelectField
              name="withdrawMethod"
              className="bg-transperant signup-select"
              options={agentOption}
              type="string"
              defaultValue={1}
            />
          </div>
          <div className="relative">
            <FormInputField
              title="Account Number"
              name="number"
              type="number"
              className="px-3 bg-transperant"
              placeholder="Account Number"
            />
          </div>
          <div className="relative">
            <FormInputField
              title="Amount"
              name="amount"
              type="number"
              className="px-3 bg-transperant"
              placeholder="Amount"
            />
          </div>

          <button className="bg-secondary font-medium rounded w-full py-2">
            Withdraw
          </button>

          {/* <div className="py-2 font-medium rounded w-full text-black1">
            {isPending ? (
              <div className="w-full bg-none border border-[#fffb00b1] py-2 rounded-md flex justify-center items-center">
                <BounceLoader color="#fff900" size={25} speedMultiplier={2} />
              </div>
            ) : (
              <button className="bg-secondary font-medium rounded w-full py-2">
                Log in
              </button>
            )}
          </div> */}
        </div>
      </Form>
    </div>
  );
};

export default WithdrawForm;
