import PersonalInfocontainer from "@/components/shared/container/PersonalInfocontainer";
//import { Images } from "@/lib/store/Index";
//import { useGetData } from "@/utils/fetchData/FetchData/FetchData";
//import { formatDate } from "@/utils/fromatDate";
//import Image from "next/image";
import SidebarPageHeader from "../SidebarPageHeader";

//import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosConfig";
import { FiRefreshCw } from "react-icons/fi";


const TotalLoss = ({
  handlePersonalInfo,
}: {
  handlePersonalInfo: (e: string) => void;
}) => {
  const [turnovers, setTurnovers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterValue, setFilterValue] = useState<string>("7");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchTurnoverData(7); // Fetch default 7 days on load
  }, []);

  const fetchTurnoverData = async (days: number) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/user-turnover?days=${days}`);

      const records = Array.isArray(res?.data) ? res.data : res?.data?.data;

      if (Array.isArray(records)) {
        setTurnovers(records);
      } else {
        console.warn("⚠️ Unexpected response format:", res);
      }
    } catch (error) {
      console.error("❌ Error fetching turnover data:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };


  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchTurnoverData(parseInt(filterValue));
  };

  const handleClaimBonus = async (depositId: string) => {
    try {
      await axiosInstance.post("/user-turnover/claim", {
        depositId,
        days: parseInt(filterValue), // 👈 pass selected days from dropdown
      });

      // update the UI state to mark it claimed
      setTurnovers((prev) =>
        prev.map((item) =>
          item.depositId === depositId ? { ...item, bonusClaimed: true } : item
        )
      );
    } catch (error: any) {
      alert(error?.response?.data?.message || "Failed to claim bonus.");
    }
  };


  return (
    <PersonalInfocontainer>
      <div className="min-h-screen overflow-auto mainBgColor">
        <SidebarPageHeader
          title="Total Loss"
          handleClose={handlePersonalInfo}
        ></SidebarPageHeader>

        {/* Filters + Table */}
        <div className="cardColor2 mx-3 rounded flex items-center mt-5 justify-between p-2">
          <select
            value={filterValue}
            onChange={(e) => {
              const newVal = e.target.value;
              setFilterValue(newVal);
              fetchTurnoverData(parseInt(newVal));
            }}
            className="cardColor2 text-white px-4 py-1 rounded"
          >
            <option className="text-white bg-black1" value="7">Last 7 Days</option>
            <option className="text-white bg-black1" value="14">Last 14 Days</option>
            <option className="text-white bg-black1" value="30">Last 30 Days</option>
          </select>
          <div
            onClick={handleRefresh}
            className="rounded-md size-10 p-2 cursor-pointer flex items-center justify-center"
          >
            <FiRefreshCw
              className={`text-white w-6 h-6 transition-transform  text-yellow-400 duration-300 ease-in-out ${isRefreshing ? "animate-spin" : ""
                }`}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-white1 text-center mt-10">Loading...</p>
        ) : (
          <div className="mx-3 mt-4 overflow-auto max-h-[60vh]">
            <table className="w-full text-sm">
              <thead>
                <tr className="cardColor2 text-white sticky top-0">
                  <th className="text-left px-2 py-2 font-normal ">Deposit</th>
                  <th className="px-2 py-2 text-center font-normal ">Turnover</th>
                  <th className="px-2 py-2 text-center font-normal ">P/L</th>
                  <th className="px-2 py-2 text-center font-normal ">Status</th>
                  <th className="px-2 py-2 text-right font-normal ">Bonus</th>
                </tr>
              </thead>
              <tbody>
                {turnovers
                  .filter((item) => item.turnoverComplete && item.profitLoss <= 0)
                  .map((item, index) => (
                    <tr key={index} className="allCards borderColor">
                      <td className="px-2 py-2 text-white1 text-left">{item.depositAmount}</td>
                      <td className="px-2 py-2 text-white1 text-center">{item.turnover}</td>
                      <td
                        className={`px-2 py-2 text-center ${item.profitLoss < 0
                          ? "text-red-500"
                          : item.profitLoss > 0
                            ? "text-[#20da00]"
                            : "text-white"
                          }`}
                      >
                        {item.profitLoss}
                      </td>
                      <td className="px-2 py-2 text-center">
                        <span className="text-[#0DBC84]">Complete</span>
                      </td>
                      <td className="px-2 py-2 text-right">
                        {item.bonus > 0 ? (
                          <button
                            disabled={item.bonusClaimed}
                            onClick={() => handleClaimBonus(item.depositId)}
                            className={`px-2 py-1 rounded-md text-sm font-medium transition ${item.bonusClaimed
                              ? "bg-gray-500 text-white cursor-not-allowed"
                              : "bg-[#049b6a] text-black hover:bg-[#0DBC84]"
                              }`}
                          >
                            {item.bonusClaimed ? "Claimed" : "Claim"}
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-2 py-1 rounded-md text-sm font-medium bg-gray-500 text-white cursor-not-allowed"
                          >
                            No Bonus
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>

            </table>
            {turnovers.filter((item) => item.turnoverComplete && item.profitLoss <= 0).length === 0 && (
              <p className="text-white1 text-center mt-6">No records found.</p>
            )}
          </div>
        )}
      </div>
    </PersonalInfocontainer>
  );
};

export default TotalLoss;

