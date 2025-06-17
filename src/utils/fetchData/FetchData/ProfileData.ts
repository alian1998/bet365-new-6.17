import axiosInstance from "@/utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";

const fetchDeposit = async () => {
  const response = await axiosInstance(`/profile`);
  return response.data; 
};

export const useProfileData = () => {
  return useQuery({
    queryKey: ["profileData"],
    queryFn: fetchDeposit,
    staleTime: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};