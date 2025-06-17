import axiosInstance from "@/utils/axiosConfig";
import React, { useState, useEffect, useRef } from 'react';
import { triggerConfetti } from './confetti';
import { playSpinSound, playWinSound } from './audio';
import { GiftBox } from './GiftBox';

interface SpinWheelProps {
  onPrizeWon: (prize: string) => void;
  availableSpins: number;
  setSpinCount: (count: number) => void;
  setSpinAvailable: (available: boolean) => void;
}



const SpinWheel: React.FC<SpinWheelProps> = ({ onPrizeWon,
  availableSpins,
  setSpinCount,
  setSpinAvailable, }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const lightsContainerRef = useRef<HTMLDivElement>(null);
  
  // Prize segments (clockwise from top) - 12 segments as in the JeetWin image
  const prizes = ['100৳', '200৳', 'JACKPOT', '1000৳', '500৳', '300৳', '100৳', '200৳', '500৳', '100৳', '1000৳', '100৳'];
  
  // Define segment colors to match the JeetWin image exactly (for 12 segments)
  const segmentColors = ['#027353', '#009c9d', '#01eff1', '#027353', '#009c9d', '#01eff1', '#027353', '#009c9d', '#01eff1', '#027353', '#009c9d', '#01eff1'];
  
  // Setup wheel lights on component mount
  useEffect(() => {
    if (lightsContainerRef.current) {
      createWheelLights();
    }
  }, []);
  
  // Create wheel lights
  const createWheelLights = () => {
    const lightsContainer = lightsContainerRef.current;
    if (!lightsContainer) return;
    
    lightsContainer.innerHTML = '';
    const wheelRadius = 145;
    const numberOfLights = 32;
    
    for (let i = 0; i < numberOfLights; i++) {
      const angle = (i / numberOfLights) * 2 * Math.PI;
      const x = wheelRadius * Math.cos(angle) + 150;
      const y = wheelRadius * Math.sin(angle) + 150;
      
      const light = document.createElement('div');
      light.className = 'light';
      light.style.left = `${x - 3}px`;
      light.style.top = `${y - 3}px`;
      light.style.animationDelay = `${i * 0.10}s`;
      
      lightsContainer.appendChild(light);
    }
  };
  
  // Function to get random angle for spinning
//  const getRandomAngle = () => {
    // Get a random index for prizes
//    const prizeIndex = Math.floor(Math.random() * prizes.length);
    
    // Calculate degree to land on the selected prize
    // Each segment is 30 degrees (360 / 12)
    // We subtract from 360 because the wheel spins clockwise
//    const baseDegree = 360 - (prizeIndex * 30) - 15; // 15 is half segment to land in middle
    
    // Add several full rotations for spinning effect
//    const fullRotations = 5 * 360; // 5 full rotations
    
//    return {
//      angle: fullRotations + baseDegree,
//      prizeIndex
//    };
//  };
  
  // Spin the wheel
const spinWheel = async () => {
  if (isSpinning || availableSpins <= 0) {
    console.warn("❌ No spins available or already spinning.");
    return;
  }

  setIsSpinning(true);
  playSpinSound();

  try {
    const res = await axiosInstance.get("/profile");
    const profile = res.data;

    // ✅ Get latest unused spin
    const currentSpin = profile?.DailySpin?.find((spin: any) => !spin.isUsed);
    const spinId = currentSpin?.id;
    const spinSource = currentSpin?.source ?? null;

    if (!spinId) {
      console.error("❌ No valid spin found.");
      setIsSpinning(false);
      return;
    }

    // ✅ Determine prize based on spin source + deposit
    const latestDeposit = profile?.depositHistory?.[0];
    const amount = latestDeposit?.amount ?? 0;

    let allowedPrize = '100৳';

    if (spinSource === 'signup') {
      allowedPrize = '100৳';
    } else if (spinSource === 'daily') {
      if (amount >= 25001) allowedPrize = 'JACKPOT';
      else if (amount >= 15001) allowedPrize = '1000৳';
      else if (amount >= 3001) allowedPrize = '500৳';
      else if (amount >= 2001) allowedPrize = '300৳';
      else if (amount >= 1001) allowedPrize = '200৳';
      else if (amount >= 200) allowedPrize = '100৳';
    }

    // ✅ Calculate angle to land on correct prize
    const prizeIndex = prizes.findIndex(p => p === allowedPrize);
    const baseDegree = 360 - (prizeIndex * 30) - 15;
    const fullRotations = 5 * 360;
    const angle = fullRotations + baseDegree;

    setRotationAngle(angle);

    setTimeout(async () => {
      onPrizeWon(allowedPrize);
      playWinSound();

      if (['JACKPOT', '1000৳', '500৳'].includes(allowedPrize)) {
        triggerConfetti();
      }

      try {
        // ✅ Claim spin on backend
        await axiosInstance.post('/luckyspin/claim', {
          prize: allowedPrize,
          spinId: spinId,
        });

        // ✅ Refresh profile
        const updatedRes = await axiosInstance.get("/profile");
        const updatedProfile = updatedRes.data;

        const spins = updatedProfile?.DailySpin?.filter((s: any) => !s.isUsed) || [];
        setSpinCount(spins.length);
        setSpinAvailable(spins.length > 0);

      } catch (claimErr) {
        console.error("❌ Failed to claim or refresh profile:", claimErr);
      }

      setTimeout(() => {
        setRotationAngle(0);
        if (wheelRef.current) {
          wheelRef.current.style.transition = 'none';
          wheelRef.current.style.transform = `rotate(0deg)`;
          setTimeout(() => {
            wheelRef.current!.style.transition = 'transform 5s cubic-bezier(0.17, 0.67, 0.11, 0.93)';
          }, 50);
        }
        setIsSpinning(false);
      }, 1000);
    }, 5500);
  } catch (error) {
    console.error("❌ Failed to fetch profile or spin:", error);
    setIsSpinning(false);
  }
};

  
  return (
    <div className="wheel-container">
      <div 
        ref={wheelRef}
        className="wheel" 
        style={{ transform: `rotate(${rotationAngle}deg)` }}
      >
        {/* 12 Segments with proper rotation */}
        {Array.from({ length: 12 }).map((_, index) => (
  <div 
    key={`segment-${index}`} 
    className="segment"
    style={{
      backgroundColor: segmentColors[index],
      transform: `rotate(${index * 30}deg)`
    }}
  ></div>
))}


{/* Text – vertical (along the segment angle) */}
{prizes.map((prize, index) => (
  <div
    key={`text-${index}`}
    className="segment-text"
    style={{
      transform: `rotate(${index * 30 + 15}deg) translateY(-110px)`
    }}
  >
    {prize}
  </div>
))}



      </div>
      
      <div className="wheel-center" onClick={spinWheel}>Spin</div>
      <div className="wheel-marker"></div>
      
      {/* Wheel lights */}
      <div ref={lightsContainerRef} id="lights"></div>
    
            {/* Gift boxes */}
            <div className="gift-box-1" style={{ top: '10%', left: '-16%' }}>
          <GiftBox width={80} height={80} />
        </div>
        <div className="gift-box-2" style={{ top: '70%', right: '-1%' }}>
          <GiftBox width={60} height={60} />
        </div>
        <div className="gift-box-3" style={{ bottom: '1%', left: '-3%' }}>
          <GiftBox width={60} height={60} />
        </div>

    </div>
    
  );
};

export default SpinWheel;
