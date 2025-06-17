// hooks/useDepositData.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosConfig";

const fetchDeposit = async () => {
  const response = await axiosInstance(`/payment-method/get-payment-methods`);
  return response.data; 
};

export const useDepositData = () => {
  return useQuery({
    queryKey: ["depositData"],
    queryFn: fetchDeposit,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
