import React from 'react';
interface PrizePopupProps {
  isOpen: boolean;
  onClaim: () => void;
  prize: string;
}

const PrizePopup: React.FC<PrizePopupProps> = ({ isOpen, onClaim, prize }) => {
  if (!isOpen) return null;

  return (
    <div className="result-popup flex">
      <div className="bg-white p-8 rounded-lg text-center max-w-md mx-auto" style={{ border: '4px solid #FF6A00' }}>
        <h2 className="text-3xl font-bold mb-4 text-orange-600">Congratulations!</h2>
        <p className="text-xl mb-6">
          You won <span className="font-bold text-red-600 text-2xl">{prize}</span>!
        </p>
        <button 
          className="cta-button"
          onClick={onClaim}
        >
          CLAIM NOW
        </button>
      </div>
    </div>
  );
};

export default PrizePopup;
