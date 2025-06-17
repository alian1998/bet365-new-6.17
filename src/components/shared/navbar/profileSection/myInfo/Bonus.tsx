'use client';
import PersonalInfocontainer from "@/components/shared/container/PersonalInfocontainer";
import SidebarPageHeader from "../SidebarPageHeader";
import { FiRefreshCw } from "react-icons/fi";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosConfig";

const Bonus = ({
  handlePersonalInfo,
}: {
  handlePersonalInfo: (e: string) => void;
}) => {
  const [bonuses, setBonuses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterValue, setFilterValue] = useState<string>("7");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchBonuses(7); // default 7 days
  }, []);

  const fetchBonuses = async (days: number) => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/BonusReport?days=${days}`);
      const records = Array.isArray(res?.data) ? res.data : [];

      setBonuses(records);
    } catch (error) {
      console.error("❌ Error fetching bonus report:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchBonuses(parseInt(filterValue));
  };

  return (
    <PersonalInfocontainer>
      <div className="min-h-screen overflow-auto mainBgColor">
        <SidebarPageHeader
          title="Bonus"
          handleClose={handlePersonalInfo}
        />

        {/* Filters + Refresh */}
        <div className="cardColor2 mx-3 rounded flex items-center mt-5 justify-between p-2">
          <select
            value={filterValue}
            onChange={(e) => {
              const newVal = e.target.value;
              setFilterValue(newVal);
              fetchBonuses(parseInt(newVal));
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
                <tr className="cardColor2 text-white sticky top-0 font-normal">
                  <th className="text-left px-2 py-2 font-normal">Bonus Type</th>
                  <th className="text-center px-2 py-2 font-normal">Bonus</th>
                  <th className="text-right px-2 py-2 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {bonuses.length > 0 ? (
                  bonuses.map((item, index) => (
                    <tr key={index} className="allCards borderColor">
                      <td className="px-2 py-2 text-left text-white1">{item.BonusType}</td>
                      <td className="px-2 py-2 text-center text-white1">
                        {typeof item.BonusAmount === 'number'
                          ? `${item.BonusAmount.toFixed(2)}`
                          : <span className="italic text-yellow-300">{item.BonusAmount}</span>}
                      </td>
                      <td className="px-2 py-2 text-right">
                        <span
                          className={`font-medium ${item.Status ? 'text-[#0DBC84]' : 'text-red-500'}`}
                        >
                          {item.Status ? 'Claimed' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-white1 text-center py-4">
                      No bonuses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PersonalInfocontainer>
  );
};

export default Bonus;
