'use client';

import { RxCross1 } from "react-icons/rx";
import { IProps } from "./Withdrawhistory";
import Td from "@/components/shared/TabileComponent/Td";
import HistoryContainer from "@/components/shared/container/HistoryContainer";
import FadeLoaderSpin from "@/components/shared/loading/FadeLoader";

import { TbCurrencyTaka } from "react-icons/tb";
import { useState } from "react";
import { useGetData } from "@/utils/fetchData/FetchData/FetchData";

const DepositHistory = ({ handleHistory }: IProps) => {
  const [selectedDays, setSelectedDays] = useState("7");
  const { data, isLoading, refetch } = useGetData(
    "withdrawData",
    `/player-deposit/get-my-deposit-history?days=${selectedDays}`
  );
  console.log(isLoading);
  const depostiHistory = data?.data;


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

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const days = e.target.value;
    await setSelectedDays(days);
    refetch();
  };

  // useEffect(() => {
  //   refetch();
  // }, [selectedDays, refetch]);
  console.log(depostiHistory);


  return (
    <HistoryContainer>
      <div className="min-h-screen mainBgColor overflow-auto overflow-y-auto">
        <div className="relative p-3 flex flex-col justify-center gap-5 mainBgColor">
          <div className="flex justify-center items-center">
            <h6 className="text-white1 font-bold">Deposit History</h6>
            <div
              onClick={() => handleHistory("")}
              className="size-8 rounded bg-[#ff1515] p-2 absolute right-5 cursor-pointer"
            >
              <RxCross1 className="size-full" />
            </div>
          </div>
        </div>
        {isLoading ? (
          <FadeLoaderSpin />
        ) : (
          <>
            <div className="cardColor2 mx-3 rounded flex items-center mt-5 justify-between p-2">
              <select
                onChange={handleSelectChange}

                name="transactionPeriod"
                id="transactionPeriod"
                className="cardColor2 text-white px-4 py-1 rounded"
              >
                <option className="text-white bg-black1" value="7">Last 7 Days</option>
                <option className="text-white bg-black1" value="14">Last 14 Days</option>
                <option className="text-white bg-black1" value="30">Last 30 Days</option>
              </select>
            </div>

            <div className="mx-3 mt-4 overflow-auto max-h-[60vh]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="cardColor2 text-white sticky top-0">
                    <th className="text-left text-xs px-2 py-2 font-normal">
                      Date
                    </th>
                    <th className="px-2 py-2 text-xs text-center font-normal">
                      Deposit
                    </th>
                    <th className="px-2 py-2 text-xs text-center font-normal">
                      Agent
                    </th>
                    <th className="px-2 py-2 text-xs text-center font-normal">
                      Amount
                    </th>
                    <th className="px-2 py-2 text-xs text-center font-normal">
                      Txn ID
                    </th>
                    <th className="px-2 py-2 text-xs text-right font-normal">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {depostiHistory?.map((item: any) => (
                    <tr
                      key={item.id}
                      className="allCards borderColor"
                    >
                      <Td>
                        <p className="px-2 py-2 text-xs text-white1">{item?.createdAt ? formatDate(item.createdAt) : ""}</p>
                        <span className="px-2 py-2 text-xs text-white1"> {item?.createdAt ? formatTime(item.createdAt) : ""}</span>
                      </Td>
                      <Td className="px-2 py-2 text-xs text-white1">{item?.depositChannel}</Td>
                      <Td className="px-2 py-2 text-xs text-white1">{item?.senderNumber}</Td>
                      <Td>
                        <div className="flex text-xs items-center">
                          <TbCurrencyTaka className=" " />
                          {item?.amount}
                        </div>
                      </Td>
                      <Td className="px-2 py-2 text-xs text-white1">{item?.transitionNumber}</Td>
                      <Td>
                        <div
                          className="font-medium text-xs"
                          style={{
                            color:
                              item?.status === "PENDING"
                                ? "#FFA500" // You can replace this with your 'secondary' color code if different
                                : item?.status === "APPROVE" || item?.status === "AUTO"
                                  ? "#35e33d"
                                  : item?.status === "REJECT"
                                    ? "#ff4d4f"
                                    : undefined,
                          }}
                        >
                          {item?.status === "PENDING"
                            ? "Pending"
                            : item?.status === "APPROVE"
                              ? "Approved"
                              : item?.status === "REJECT"
                                ? "Rejected"
                                : item?.status === "AUTO"
                                  ? "Approved"
                                  : ""}
                        </div>

                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </HistoryContainer>
  );
};

export default DepositHistory;
