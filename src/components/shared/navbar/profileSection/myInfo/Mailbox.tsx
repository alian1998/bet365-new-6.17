import PersonalInfocontainer from "@/components/shared/container/PersonalInfocontainer";
import { Images } from "@/lib/store/Index";
import { useGetData } from "@/utils/fetchData/FetchData/FetchData";
import { formatDate } from "@/utils/fromatDate";
import Image from "next/image";
import React, { useState } from "react";
import SidebarPageHeader from "../SidebarPageHeader";

const Mailbox = ({
  handlePersonalInfo,
}: {
  handlePersonalInfo: (e: string) => void;
}) => {
  const [selectedDays, setSelectedDays] = useState("7");
  const {
    data,
    // isLoading,
    refetch: referRefetch,
  } = useGetData(
    "inbox",
    `/player-deposit/get-my-inbox?days=${selectedDays}`
  );
  const referralDatas = data?.data;

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const days = e.target.value;
    await setSelectedDays(days);
    referRefetch();
  };


  return (
    <PersonalInfocontainer>
      <div className="min-h-screen overflow-auto mainBgColor ">

        <SidebarPageHeader
          title="Inbox"
          handleClose={handlePersonalInfo}
        ></SidebarPageHeader>

        <div className=" w-full  text-white1 px-6 h-[calc(100vh-100px)] pt-5 space-y-3">
          <div className="cardColor2 rounded-md flex justify-between items-center p-2">
            <select
              name="daysFilter"
              id="daysFilter"
              onChange={handleSelectChange}
              className="cardColor2 text-white px-4 py-1 rounded"
            >
              <option className="text-white bg-black1" value="7">Last 7 Days</option>
              <option className="text-white bg-black1" value="14">Last 14 Days</option>
              <option className="text-white bg-black1" value="30">Last 30 Days</option>
            </select>

            <div className="bg-secondary rounded-md size-10 p-2">
              <Image
                className="size-full"
                src={Images.filter}
                alt="img"
                width={100}
                height={100}
              />
            </div>
          </div>


          {
            referralDatas?.map((inbox: any, index: number) => {
              return (
                <div className="" key={index}>
                  <div className="bg-deepSlate py-3 px-3 rounded-t-lg flex justify-between items-center">
                    <p className="text-[12px]">{formatDate(inbox?.createdAt)}</p>
                    {/* <p className="text-slateFont text-[12px]">GMT +6</p> */}
                  </div>
                  <div className="py-3 bg-deepslate1 px-3 rounded-b-lg flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="size-6 rounded-full bg-gradient-to-r from-orange-600 to-orange-300"></div>
                      <div className="flex flex-col">
                        {/* <p className="font-medium">Approved Deposit</p> */}
                        <p className="text-[12px] text-slateFont">
                          {inbox?.message}. Lorem ipsum dolor sit amet.
                        </p>
                      </div>
                    </div>
                    {/* <p className="text-slateFont text-[12px]">00.4.47</p> */}
                  </div>
                </div>
              )
            })
          }




          {/* <div className="">
            <div className="bg-deepSlate py-3 px-3 rounded-t-lg flex justify-between items-center">
              <p className="text-[12px]">14/09/2024</p>
              <p className="text-slateFont text-[12px]">GMT +6</p>
            </div>
            <div className="py-3 bg-deepslate1 px-3 rounded-b-lg flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="size-6 rounded-full bg-gradient-to-r from-orange-600 to-orange-300"></div>
                <div className="flex flex-col">
                  <p className="font-medium">Approved Deposit</p>
                  <p className="text-[12px] text-slateFont">
                    You Have a $19 Deposit Has Been ......
                  </p>
                </div>
              </div>
              <p className="text-slateFont text-[12px]">00.4.47</p>
            </div>
          </div> */}
        </div>
      </div>
    </PersonalInfocontainer>
  );
};

export default Mailbox;
