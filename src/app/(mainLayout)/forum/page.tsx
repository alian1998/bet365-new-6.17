'use client';
import React from 'react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Arjun S.',
    avatar: 'https://i.pravatar.cc/50?img=3',
    comment: 'Withdrawals are super fast. I won ₹10,000 and got it in less than 5 minutes!',
  },
  {
    name: 'Priya M.',
    avatar: 'https://i.pravatar.cc/50?img=5',
    comment: 'Love the cricket betting interface. Feels real and smooth. 10/10!',
  },
  {
    name: 'Rahul K.',
    avatar: 'https://i.pravatar.cc/50?img=8',
    comment: 'The live casino games are on another level. Real dealers, real action!',
  },
];

const Page = () => {
  return (
    <div>
      {/* Header Section */}
      <div className="relative cardColor2 mt-2 py-1 flex flex-col justify-center gap-5">
        <div className="flex justify-center items-center px-3 md:px-5">
          <h6 className="text-white1 font-bold text-sm md:text-base">Forum</h6>
        </div>
      </div>

      {/* Forum Content */}
      <div className="p-4 text-white text-sm md:text-base space-y-6 max-w-4xl mb-[50px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          Welcome to the Official bet365all.live Forum
        </h2>

        <p>
          This is the official community forum for all things related to <strong>bet365all.live</strong> — your trusted platform
          for online gaming and sportsbook betting. Whether you&apos;re a new player looking to learn more or a regular bettor seeking
          the best promotions, you&apos;re in the right place.
        </p>

        {/* Why Choose Us */}
        <div>
          <h3 className="text-xl font-semibold">🌟 Why Choose bet365all?</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>🎰 Over 3000+ live and slot games powered by top-tier providers</li>
            <li>⚽ Sportsbook with live odds and instant betting across cricket, football, tennis, and more</li>
            <li>💳 Fast deposits and withdrawals with 24/7 processing</li>
            <li>🛡️ Fully licensed and encrypted platform ensuring safe &amp; secure gaming</li>
            <li>🎁 Free spins, reload bonuses, welcome offers, and seasonal promos</li>
            <li>📲 Seamless experience across mobile, tablet, and desktop</li>
            <li>🔧 Transparent gameplay, real-time betting stats, and high RTP rates</li>
          </ul>
        </div>

        {/* Top Game Providers */}
        <div>
          <h3 className="text-xl font-semibold">🎮 Game Providers You Can Trust</h3>
          <p>We work with the world&apos;s best gaming studios to bring you premium quality entertainment. Providers include:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Evolution Gaming</li>
            <li>Pragmatic Play</li>
            <li>NetEnt</li>
            <li>Playtech</li>
            <li>Microgaming</li>
            <li>JILI, Spadegaming, AE Sexy, and more</li>
          </ul>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-xl font-semibold">💬 What Our Players Say</h3>
          <div className="space-y-4">
            {testimonials.map((t, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/10 p-3 rounded-lg">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full border border-orange-500"
                />
                <div>
                  <p className="italic">&quot;{t.comment}&quot;</p>
                  <p className="text-orange-400 mt-1 font-semibold">– {t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsible Gaming */}
        <div>
          <h3 className="text-xl font-semibold">🧠 Responsible Gaming</h3>
          <p>
            bet365all.live promotes responsible betting. We offer player limits, self-exclusion tools, and full support
            to ensure that gaming remains a fun and safe experience for everyone.
          </p>
        </div>

        {/* FAQs */}
        <div>
          <h3 className="text-xl font-semibold">❓ Frequently Asked Questions</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>How do I withdraw my winnings?</strong> — Simply go to your wallet and request a withdrawal via your preferred method.
            </li>
            <li>
              <strong>Is it safe to play here?</strong> — Yes, we use SSL encryption and licensed game providers.
            </li>
            <li>
              <strong>Do you offer bonuses?</strong> — Yes! Check out our promotions page for latest offers.
            </li>
          </ul>
        </div>

        {/* Community Rules */}
        <div>
          <h3 className="text-xl font-semibold">📜 Forum Guidelines</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Be respectful to other members.</li>
            <li>Do not share personal or financial information publicly.</li>
            <li>Use appropriate language and stay on topic.</li>
            <li>Report abuse or suspicious activity to moderators.</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold">🛠️ Need Help?</h3>
          <p>
            Our support team is available 24/7. Contact us via live chat.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <h3 className="text-xl font-semibold">🚀 Ready to Start?</h3>
          <p>
            Join thousands of players who trust <strong>bet365all.live</strong> for gaming and betting excitement. Sign up
            now and claim your welcome bonus!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
