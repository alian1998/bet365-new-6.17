// hooks/useDepositData.ts
import axiosInstance from "@/utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (dataUrl: string) => {
  const response = await axiosInstance(dataUrl);
  return response.data;
};

export const useGetDataWithToken = (queryKey: string, dataUrl: string, token: string | undefined) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchData(dataUrl),
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!token,
  });
};
