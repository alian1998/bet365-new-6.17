"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosConfig";
import { Dialog } from "@headlessui/react";
import { FiRefreshCw } from "react-icons/fi";
import SidebarPageHeader from "../SidebarPageHeader";
import HistoryContainer from "@/components/shared/container/HistoryContainer";

/* ----------- Types ----------- */
type BetRow = {
  gameType: string;
  productTitle: string;
  game: string;
  betAmount: number;
  profitLoss?: number;
  transaction_id: string;
  betTime: string;
};

/* ----------- Component ----------- */
export default function Bettingrecord({
  handleHistory,
}: {
  handleHistory: (e: string) => void;
}) {
  /* ---------- State ---------- */
  const [tab, setTab] = useState<"1" | "2">("1"); // '1' = Settled (default), '2' = Unsettled
  const [days, setDays] = useState(7);
  const [grouped, setGrouped] = useState<
    Record<string, Record<string, BetRow[]>>
  >({});
  const [selectedGameType, setSelectedGameType] = useState("");
  const [currentRows, setCurrentRows] = useState<BetRow[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<BetRow[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [spin, setSpin] = useState(false);

  /* ---------- Fetch helper ---------- */
  const fetchTabData = async (d: number, which: "1" | "2") => {
    try {
      const url =
        which === "1"
          ? `/history/settle?days=${d}`
          : `/history/Unsettle?days=${d}`;
      const res = await axiosInstance.get(url);

      const rows: BetRow[] = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      // group { gameType: { productTitle : rows[] } }
      const grp: Record<string, Record<string, BetRow[]>> = {};
      rows.forEach((r) => {
        if (!grp[r.gameType]) grp[r.gameType] = {};
        if (!grp[r.gameType][r.productTitle])
          grp[r.gameType][r.productTitle] = [];
        grp[r.gameType][r.productTitle].push(r);
      });

      setGrouped(grp);
      setCurrentRows(rows);

      // ensure valid gameType is selected
      const firstGT = Object.keys(grp)[0] || "";
      if (!grp[selectedGameType]) setSelectedGameType(firstGT);
    } catch (err) {
      console.error("fetchTabData error:", err);
      setGrouped({});
      setCurrentRows([]);
    }
  };

  /* ---------- Initial load ---------- */
  useEffect(() => {
    fetchTabData(days, "1"); // default-load Settled
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- Switch tabs ---------- */
  const switchTab = (which: "1" | "2") => {
    if (tab === which) return;
    setTab(which);
    fetchTabData(days, which);
  };

  /* ---------- Refresh ---------- */
  const handleRefresh = () => {
    setSpin(true);
    fetchTabData(days, tab).finally(() => setSpin(false));
  };

  /* ---------- Modal ---------- */
  const openHistoryModal = (platform: string) => {
    const rows = currentRows.filter(
      (r) => r.gameType === selectedGameType && r.productTitle === platform
    );
    setSelectedHistory(rows);
    setShowModal(true);
  };

  /* ---------- Derived values ---------- */
  const gameTypes = Object.keys(grouped);
  const platforms = grouped[selectedGameType]
    ? Object.keys(grouped[selectedGameType])
    : [];

  /* ========== RENDER ========== */
  return (
    <HistoryContainer>
      <div className="min-h-screen overflow-auto mainBgColor">
        <SidebarPageHeader
          title="Betting Records"
          handleClose={handleHistory}
        />

        {/* Tabs (Settled / Unsettled) */}
        <div className="flex justify-between px-6 md:px-14 mt-4 font-semibold">
          <h6
            className={`cursor-pointer ${
              tab === "1" ? "text-secondary" : "text-white"
            }`}
            onClick={() => switchTab("1")}
          >
            Settled
          </h6>
          <h6
            className={`cursor-pointer ${
              tab === "2" ? "text-secondary" : "text-white"
            }`}
            onClick={() => switchTab("2")}
          >
            Unsettled
          </h6>
        </div>

        {/* Game-type chips */}
        <div className="px-3 py-4 flex gap-2 overflow-x-auto hide-scrollbar">
          {gameTypes.length === 0 && (
            <p className="text-gray-400">No records found</p>
          )}
          {gameTypes.map((gt) => (
            <button
              key={gt}
              onClick={() => setSelectedGameType(gt)}
              className={`allCards px-3 py-2 rounded border ${
                selectedGameType === gt
                  ? "text-white1 border-yellow-400"
                  : "text-gray-400"
              }`}
            >
              {gt.replace(/_/g, " ")}
            </button>
          ))}
        </div>

        {/* Days filter + refresh */}
        <div className="cardColor2 text-white mx-3 rounded flex items-center justify-between p-2">
          <select
            value={days}
            onChange={(e) => {
              const d = Number(e.target.value);
              setDays(d);
              fetchTabData(d, tab);
            }}
            className="cardColor2 text-white px-4 py-1 rounded"
          >
            {[7, 14, 30].map((d) => (
              <option className="text-white bg-black1" key={d} value={d}>
                Last {d} Days
              </option>
            ))}
          </select>

          <FiRefreshCw
            onClick={handleRefresh}
            className={`cursor-pointer w-6 h-6 text-yellow-400  ${
              spin ? "animate-spin" : ""
            }`}
          />
        </div>

        {/* Platform list */}
        <div className="mx-3 mt-4 overflow-auto max-h-[60vh]">
          <table className="w-full text-sm">
            <thead className="font-normal">
              <tr className="cardColor2 text-white sticky top-0">
                <th className="text-left px-2 py-2 font-normal">Platform</th>
                <th className="px-2 py-2 text-center font-normal">Total Bet</th>
                {tab === "1" && (
                  <th className="px-2 py-2 text-center font-normal">
                    Total P/L
                  </th>
                )}
                <th className="px-2 py-2 text-right font-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {platforms.length === 0 && (
                <tr>
                  <td
                    colSpan={tab === "1" ? 4 : 3}
                    className="text-center text-gray-200 py-4"
                  >
                    No records for this game type.
                  </td>
                </tr>
              )}
              {platforms.map((p, idx) => {
                const platformRows = grouped[selectedGameType][p];
                const totalBet = platformRows.reduce(
                  (sum, r) => sum + r.betAmount,
                  0
                );
                const totalPL =
                  tab === "1"
                    ? platformRows.reduce(
                        (sum, r) => sum + (r.profitLoss ?? 0),
                        0
                      )
                    : 0;

                return (
                  <tr key={idx} className="allCards borderColor">
                    <td className="px-2 py-2 text-white1">{p}</td>
                    <td className="px-2 py-2 text-center text-white1">
                      {totalBet.toFixed(2)}
                    </td>
                    {tab === "1" && (
                      <td
                        className={`px-2 py-2 text-center ${
                          totalPL < 0
                            ? "text-red-500"
                            : totalPL > 0
                            ? "text-[#20da00]"
                            : "text-white"
                        }`}
                      >
                        {totalPL.toFixed(2)}
                      </td>
                    )}
                    <td className="px-2 py-2 text-right">
                      <button
                        onClick={() => openHistoryModal(p)}
                        className="bg-yellow-400 px-2 py-1 rounded text-black text-xs font-semibold"
                      >
                        Show History
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* History modal */}
        <Dialog
          open={showModal}
          onClose={() => setShowModal(false)}
          className="fixed inset-0 z-40"
        >
          <div className="flex items-center justify-center min-h-screen px-3">
            <Dialog.Panel className="allCards w-full max-w-md p-5 rounded border-2 border-yellow-400">
              <Dialog.Title className="font-bold text-lg text-center text-white1 mb-4">
                Game History
              </Dialog.Title>
              <div className="max-h-[60vh] overflow-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary text-black sticky top-0">
                      <th className="px-2 py-2 text-left">Game</th>
                      <th className="px-2 py-2">TxID</th>
                      <th className="px-2 py-2">Bet</th>
                      {tab === "1" && <th className="px-2 py-2">P/L</th>}
                      <th className="px-2 py-2 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedHistory.map((row, i) => (
                      <tr key={i} className="borderColor">
                        <td className="px-2 py-2 text-white1">{row.game}</td>
                        <td className="px-2 py-2 text-center text-white1">
                          {row.transaction_id}
                        </td>
                        <td className="px-2 py-2 text-center text-white1">
                          {row.betAmount}
                        </td>
                        {tab === "1" && (
                          <td
                            className={`px-2 py-2 text-center ${
                              row.profitLoss! < 0
                                ? "text-red-500"
                                : row.profitLoss! > 0
                                ? "text-[#20da00]"
                                : "text-white"
                            }`}
                          >
                            {row.profitLoss}
                          </td>
                        )}
                        <td className="px-2 py-2 text-right text-white1">
                          {new Date(row.betTime).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-secondary px-8 py-2 rounded text-black font-semibold"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </HistoryContainer>
  );
}
