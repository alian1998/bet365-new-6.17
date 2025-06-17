"use client";
import HistoryContainer from "@/components/shared/container/HistoryContainer";
import FadeLoaderSpin from "@/components/shared/loading/FadeLoader";
import Td from "@/components/shared/TabileComponent/Td";
//import { Images } from "@/lib/store/Index";
import axiosInstance from "@/utils/axiosConfig";
import { useGetData } from "@/utils/fetchData/FetchData/FetchData";
import { ToastAlert } from "@/utils/ToastAlert/ToastAlert";
import { useMutation } from "@tanstack/react-query";
//import Image from "next/image";
import { useState, useEffect } from "react"; // Import useEffect
import { RxCross1 } from "react-icons/rx";
import { TbCurrencyTaka } from "react-icons/tb";
import Swal from "sweetalert2";

export interface IProps {
  handleHistory: (e: string) => void;
}

interface IWithdrawData {
  id: string;
  withdrawMethod: string;
  withdrawChannel: string;
  accountNumber: string;
  amount: number;
  typeAddress: string | null;
  msg: string | null;
  status: string;
  userId: string;
  agentId: string;
  createdAt: string;
  updatedAt: string;
}

const Withdrawhistory = ({ handleHistory }: IProps) => {
  const [selectedDays, setSelectedDays] = useState("7");

  const {
    data,
    isLoading,
    refetch,
  } = useGetData("withdrawData", `/player-withdraw?days=${selectedDays}`);
  const withdrawData = (data?.data)
  console.log(isLoading)

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.patch(
        `/player-withdraw/cancel-withdraw/${id}`
      );
      return response;
    },
    onSuccess: (data: any) => {
      if (data?.success == true) {
        ToastAlert("Canceled Successfully");
        refetch();
      }
    },
  });

  const handleClick = async (id: string) => {
    const result = await Swal.fire({
      text: "You want to cancel withdraw?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "  Yes  ",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "custom-swal-modal",
      },
    });
    if (result.isConfirmed) {
      mutate(id);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    refetch()
    const days = e.target.value;
    setSelectedDays(days);
  };

  // Use useEffect to refetch data when selectedDays changes
  useEffect(() => {
    refetch();
  }, [selectedDays, refetch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const datePart = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }).format(date);


    return `${datePart}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const timePart = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);

    return `${timePart}`;
  };

  return (
    <>
      <HistoryContainer>
        <div className="min-h-screen mainBgColor overflow-auto">
          <div className="relative p-3 flex flex-col justify-center gap-5 mainBgColor">
            <div className="flex justify-center items-center">
              <h6 className="text-white1 font-bold">Withdraw History</h6>
              <div
                onClick={() => handleHistory("")}
                className="size-8 rounded bg-[#ff1515] p-2 absolute right-5 cursor-pointer"
              >
                <RxCross1 className="size-full" />
              </div>
            </div>
          </div>
          <div className="cardColor2 mx-3 rounded flex items-center mt-5 justify-between p-2">
            <select
              name="daysFilter"
              id="daysFilter"
              className="cardColor2 rounded-lg py-1 font-medium text-white px-4"
              value={selectedDays}
              onChange={handleSelectChange}
            // className="cardColor2 text-white px-4 py-1 rounded"
            >
              <option className="text-white bg-black1" value="7">Last 7 Days</option>
              <option className="text-white bg-black1" value="14">Last 14 Days</option>
              <option className="text-white bg-black1" value="30">Last 30 Days</option>
              <option className="text-white bg-black1" value="60">Last 60 Days</option>
            </select>
          </div>
          {isLoading ? (
            <FadeLoaderSpin />
          ) : (
            <div className="mx-3 mt-4 overflow-auto max-h-[60vh]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="cardColor2 text-white sticky top-0">
                    <th className="text-left text-xs px-2 py-2 font-normal">
                      Date
                    </th>
                    <th className="px-2 py-2 text-xs text-center font-normal">
                      Withdraw
                    </th>
                    <th className="px-2 py-2 text-xs text-center font-normal">
                      Amount
                    </th>
                    <th className="px-2 py-2 text-xs text-center font-normal">
                      Account
                    </th>
                    <th className="px-2 py-2 text-xs text-center font-normal">
                      Status
                    </th>
                    <th className="px-2 py-2 text-xs text-right font-normal">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawData.map((item: IWithdrawData) => (
                    <tr
                      key={item?.id}
                      className="allCards borderColor"
                    >
                      <Td>
                        <p className="px-2 py-2 text-xs text-white1">{item?.createdAt ? formatDate(item.createdAt) : ""}</p>
                        <span className="px-2 py-2 text-xs text-white1"> {item?.createdAt ? formatTime(item.createdAt) : ""}</span>
                      </Td>

                      <Td className="px-2 py-2 text-xs text-white1">{item?.withdrawChannel}</Td>
                      <Td>
                        <div className="flex text-xs items-center">
                          <TbCurrencyTaka className="" />
                          {item?.amount}
                        </div>
                      </Td>
                      <Td className="px-2 py-2 text-xs text-white1">{item?.accountNumber}</Td>
                      <Td>
                        <div
                          className={` text-xs ${item?.status === "PENDING"
                            ? "text-secondary"
                            : item?.status === "CANCELLED"
                              ? "text-red-500"
                              : item?.status === "APPROVED"
                                ? "text-primary2"
                                : ""
                            }`}
                        >
                          {item?.status}
                        </div>
                      </Td>
                      <Td>
                        {item?.status === "PENDING" ? (
                          <div
                            onClick={() => handleClick(item?.id)}
                            className="text-white cursor-pointer bg-red-500 p-1 rounded-md font-medium text-xs"
                          >
                            Cancel
                          </div>
                        ) : (
                          ""
                        )}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </HistoryContainer>
    </>
  );
};

export default Withdrawhistory;