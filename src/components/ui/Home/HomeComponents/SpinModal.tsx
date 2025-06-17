"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import SpinWheel from "./SpinWheel";
import PrizePopup from "./PrizePopup"; // also import this if needed

interface Props {
  isOpen: boolean;
  onClose: () => void;
  availableSpins: number;
  setSpinCount: (count: number) => void;
  setSpinAvailable: (available: boolean) => void;
}



const SpinModal: React.FC<Props> = ({ isOpen,
  onClose,
  availableSpins,
  setSpinCount,
  setSpinAvailable, }) => {
  const [prize, setPrize] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handlePrizeWon = (wonPrize: string) => {
    setPrize(wonPrize);
    setShowPopup(true);
  };

//  const closePopup = () => {
//    setShowPopup(false);
//    onClose(); // optional: close modal after prize
//  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      <div
        className="rounded-xl z-50 max-w-md w-full p-6 relative"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
      >
        <div className="bg-black/60 text-white px-4 py-2 rounded-full text-center mb-16">
  <Dialog.Title className="text-sm font-semibold">
    {availableSpins > 0
      ? `You have ${availableSpins} spin${availableSpins > 1 ? 's' : ''} available! 🎉`
      : "No spin available right now. Come back later!"}
  </Dialog.Title>
</div>


        <SpinWheel
  onPrizeWon={handlePrizeWon}
  availableSpins={availableSpins}
  setSpinCount={setSpinCount}
  setSpinAvailable={setSpinAvailable}
/>


        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black/60 hover:bg-black text-white font-semibold rounded-lg"
          >
            Close
          </button>
        </div>
      </div>

      <PrizePopup isOpen={showPopup} onClaim={() => setShowPopup(false)} prize={prize} />

    </Dialog>
  );
};


export default SpinModal;
