import React from 'react';
//import Image from 'next/image';

const ambassadors = [
  {
    name: 'Chris Gayle',
    image: 'https://ossimg.jetx365.live/promo/Gayle.jpg',
    title: 'Cricket Superstar • Universe Boss',
    bio: 'Chris Gayle is a West Indian cricket icon known for his explosive batting and global fanbase. A true entertainer on and off the field.',
    link: 'https://en.wikipedia.org/wiki/Chris_Gayle',
  },
  {
    name: 'David Warner',
    image: 'https://ossimg.jetx365.live/promo/David.jpg',
    title: 'Cricket Powerhouse • Aussie Opener',
    bio: 'David Warner is one of Australia’s most prolific openers, famous for his aggressive style and fearless approach.',
    link: 'https://en.wikipedia.org/wiki/David_Warner_(cricketer)',
  },
  {
    name: 'MS Dhoni',
    image: 'https://ossimg.jetx365.live/promo/Dhoni.jpg',
    title: 'Captain Cool • Legendary Finisher',
    bio: 'Mahendra Singh Dhoni, former captain of India, is celebrated for his calm leadership and unmatched finishing abilities in high-pressure games.',
    link: 'https://en.wikipedia.org/wiki/MS_Dhoni',
  },
  {
    name: 'Mahiya Mahi',
    image: 'https://ossimg.jetx365.live/promo/Mahi.jpg',
    title: 'Actress • Silver Screen Star',
    bio: 'Mahiya Mahi is a popular Bangladeshi film actress, known for redefining modern cinema with bold roles and strong performances.',
    link: 'https://en.wikipedia.org/wiki/Mahiya_Mahi',
  },
  {
    name: 'Rashid Khan',
    image: 'https://ossimg.jetx365.live/promo/Rashid.jpg',
    title: 'Spin Wizard • Afghan Sensation',
    bio: 'Rashid Khan is an Afghan cricketer and T20 legend, renowned worldwide for his magical leg-spin and game-changing abilities.',
    link: 'https://en.wikipedia.org/wiki/Rashid_Khan_(cricketer)',
  },
  {
    name: 'Shakib Al Hasan',
    image: 'https://ossimg.jetx365.live/promo/Shakib.jpg',
    title: 'Cricket Legend • Brand Ambassador',
    bio: 'Shakib is one of the greatest all-rounders in world cricket, known for his sharp performance and smart plays.',
    link: 'https://en.wikipedia.org/wiki/Shakib_Al_Hasan',
  },
];


const Page = () => {
  return (
    <div>
      {/* Header */}
      <div className="relative cardColor2 mt-2 py-1 flex flex-col justify-center gap-5">
        <div className="flex justify-center items-center px-3 md:px-5">
          <h6 className="text-white1 font-bold text-sm md:text-base">Ambassador</h6>
        </div>
      </div>

      {/* Ambassador Section */}
      <div className="max-w-6xl mx-auto px-4 py-6 mb-[50px] text-white space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">🇧🇩 Our Ambassadors</h2>

        <div className="grid grid-cols-1 gap-6">
          {ambassadors.map((amb, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4 shadow-lg border border-yellow-400 backdrop-blur">
              <img
                src={amb.image}
                alt={amb.name}
                width={300}
                height={300}
                className="rounded-md w-full h-60 object-cover"
              />
              <h3 className="mt-3 text-lg font-semibold text-orange-400">{amb.name}</h3>
              <p className="text-sm italic">{amb.title}</p>
              <p className="mt-2 text-sm">{amb.bio}</p>
              <a
                href={amb.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-orange-400 text-sm font-medium hover:underline"
              >
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
