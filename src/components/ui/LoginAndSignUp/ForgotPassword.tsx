"use client";

import Form from "@/components/Form/Form";
 import FormInputField3d from "@/components/Form/FormInputField3d";
import LoadingAndButton3d from "@/components/shared/LoadingAndButton/LoadingAndButton3d";
import { baseUrl } from "@/utils/api";
import { ErrorToastAlert, ToastAlert } from "@/utils/ToastAlert/ToastAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FieldValues, SubmitHandler } from "react-hook-form";
 import { z } from "zod";

export const validationSchema = z.object({
  email: z.string().min(1, "Enter Your Email"),
});

const ForgotPassword = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FieldValues) =>
      axios.post(`${baseUrl}/auth/forgot-password`, data),
    onSuccess: (data: any) => {
      ToastAlert(data?.data?.message);
    },
    onError: (err: any) => {
      ErrorToastAlert(err?.response?.data?.message);
    },
  });

  const formSubmit: SubmitHandler<FieldValues> = async (data) => {
    mutate(data);
  };
  return (
    <div className="flex flex-col items-center justify-center px-2 w-full min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="w-full max-w-md  p-6 rounded-xl shadow-md">
        <h2 className="text-white text-2xl font-semibold mb-6 ">
          Reset Your Password
        </h2>

        <Form
          onSubmit={formSubmit}
          resolver={zodResolver(validationSchema)}
          defaultValues={{
            email: "",
          }}
        >
          <div className="space-y-4">
            <FormInputField3d
              title="Email"
              name="email"
              type="email"
              className="px-3 bg-transperant"
              placeholder="Enter Your Email"
            />

            <LoadingAndButton3d isPending={isPending} buttonName="Submit" />
          </div>
        </Form>
      </div>
    </div>

  );
};
export default ForgotPassword;
