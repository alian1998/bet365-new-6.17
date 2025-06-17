'use client';
import React from 'react';

const promotions = [
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_230795.jpg',
    title: '৳10 Crore Prize Pool',
    description: 'Cricket Draw Madness',
    period: '2025/05/29 21:30:00 ~ 2025/09/14 21:29:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_222940.jpg',
    title: '100% First Week Refund Bonus',
    description: 'IPL 2025 Welcome Gift',
    period: '2025/03/21 00:00:00 ~ 2025/06/03 23:59:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_223119.jpg',
    title: 'Win BMW iX3 M Sport',
    description: 'IPL Prediction Battle Board',
    period: '2025/03/13 21:30:00 ~ 2025/06/03 21:29:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_223769.jpg',
    title: '৳3.1 Crore Fortune Pot',
    description: 'IPL Triple-Hit Draw',
    period: '2025/03/20 21:30:00 ~ 2025/06/03 21:29:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_218408.jpg',
    title: 'All Games with 100% Bonus',
    description: 'Welcome Gift',
    period: '2025/01/20 00:00:00 ~ 2025/12/31 23:59:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_118732.png',
    title: '50% Sports Refund',
    description: 'Welcome Gift',
    period: '2023/11/14 21:30:00 ~ 2025/12/31 21:29:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_86141.jpg',
    title: '৳7,777 Slot & Fishing Bonus',
    description: 'Welcome Gift',
    period: '2023/11/14 21:30:00 ~ 2025/12/31 21:29:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_130939.jpg',
    title: 'Unlimited Slot Free Spins',
    description: 'Welcome Gift',
    period: '2024/05/29 00:00:00 ~ 2025/12/31 23:59:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_230610.jpg',
    title: '1st Week ৳10,000 Refund Bonus',
    description: 'T20 Blast Welcome Gift',
    period: '2025/05/29 00:00:00 ~ 2025/09/14 23:59:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_229168.jpg',
    title: 'Seize More Out of Every VIP Point!',
    description: 'VIP Instant Rebate',
    period: 'Long term ~',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_228530.jpg',
    title: '2.3% Non-stop Cash Rebate',
    description: 'Cricket Craze Hour',
    period: '2025/05/07 21:00:00 ~ 2025/12/31 23:59:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_228416.jpg',
    title: '3.4% Slots Rebate Daily',
    description: 'Andre Russell’s Happy Hour',
    period: '2025/05/07 00:00:00 ~ 2025/12/31 23:59:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_227886.png',
    title: 'Fish Game Frenzy',
    description: 'JILI Daily Win',
    period: '2025/04/22 11:00:00 ~ 2025/06/24 11:00:00',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_227804.png',
    title: 'Crash & Win',
    description: 'JILI Daily Win',
    period: '2025/04/22 11:00:00 ~ 2025/06/24 11:00:00',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_227673.png',
    title: 'Table Game Battle',
    description: 'JILI Daily Win',
    period: '2025/04/22 11:00:00 ~ 2025/06/24 11:00:00',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_227850.png',
    title: 'Slot Rush Play',
    description: 'JILI Daily Win',
    period: '2025/04/22 11:00:00 ~ 2025/06/24 11:00:00',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_227137.jpg',
    title: '10.66% Infinite Cashback',
    description: 'Weekly Gift (Crash & Lottery)',
    period: '2025/04/23 21:30:00 ~ 2025/12/31 23:59:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_143223.jpg',
    title: '279 Free Bonus',
    description: 'Gift Delight',
    period: '2025/03/29 11:30:00 ~ 2025/12/31 23:59:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_172595.jpg',
    title: '50% Bonus With Evolution Gaming',
    description: 'Welcome Gift',
    period: '2025/01/03 00:00:00 ~ 2025/12/31 23:59:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_172171.jpg',
    title: 'Refer to Earn ৳3,00,000 Monthly',
    description: 'RAF Leaderboard',
    period: '2024/10/01 00:00:00 ~ 2025/12/31 23:59:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_180866.png',
    title: 'Infinite Referral Cash + Bonuses',
    description: 'Refer A Friend',
    period: '2024/09/26 21:30:00 ~ 2025/12/31 23:59:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_169051.jpg',
    title: 'Unlimited Cashback on All Games',
    description: 'Daily Gift',
    period: '2024/09/17 21:30:00 ~ 2025/12/31 23:59:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_86221.jpg',
    title: '25% Cashback',
    description: 'Welcome Gift (Live Casino & Table Game)',
    period: '2023/11/14 21:30:00 ~ 2025/12/31 21:29:59',
    registerUrl: '/deposit',
  },
  {
    image: 'https://img.j189eb.com/upload/h5Announcement/image_169090.jpg',
    title: '17% Slots Endless Cashback',
    description: 'Weekly Gift',
    period: '2024/09/17 21:30:00 ~ 2025/12/31 23:59:59',
    registerUrl: '/deposit',
  }
];


const PromotionCard = ({ promo }: { promo: typeof promotions[0] }) => (
  <div className="mainBgColor rounded-lg shadow-lg overflow-hidden w-full max-w-md mx-auto border border-yellow-400">
    <div className="relative">
      <img src={promo.image} alt={promo.title} className="w-full h-48 object-cover" />
      <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">NEW</span>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold text-white">{promo.title}</h3>
      <p className="text-sm text-gray-200">{promo.description}</p>
      <div className="flex items-center text-xs text-gray-300 mt-1">
        <span className="mr-1">🕒</span>
        {promo.period}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => window.location.href = promo.registerUrl}
          className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-4 py-2 rounded"
        >
          Click Now
        </button>

      </div>
    </div>
  </div>
);

const Page = () => {
  return (
    <>
      <div className="relative cardColor2 mt-2 py-1 flex flex-col justify-center gap-5">
        <div className="flex justify-center items-center px-3 md:px-5">
          <h6 className="text-white1 font-bold text-sm md:text-base">Promotion</h6>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4">
        {promotions.map((promo, index) => (
          <PromotionCard key={index} promo={promo} />
        ))}
      </div>
    </>
  );
};

export default Page;
