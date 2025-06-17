import axiosInstance from "../axiosConfig";

export const fetchDeposit = async () => {
  const response = await axiosInstance(
    `/player-deposit/get-my-deposit-history`
  );
  return response.data;
};
