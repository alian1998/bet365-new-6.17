import ModalsContainer from '@/components/shared/container/ModalContainer';
import { ContextApi } from '@/lib/provider/Providers';
import { Images } from '@/lib/store/Index';
import Image from 'next/image';
import { useContext } from 'react';

type IProps = {
  openModal: boolean;
  handleModal: () => void;
  openChat: () => void;
  unreadCount?: number; // ✅ add this
};


const HelpDeskModal = ({ openModal, handleModal, openChat, unreadCount }: IProps) => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error('Context not found');
  }

  const { assets } = context;
  const {
    // ownerWs,
    customersSupportWs,
    // customerComplainWs,
    customerSupportTg,
    JoinChannel,
  } = assets ?? {};

  return (
    <ModalsContainer modal={openModal} handleModal={handleModal}>
      <div className="w-full h-screen flex justify-center items-end mb-[300px]">
        <div className="w-11/12 h-fit cardColor2 text-white p-2 rounded-xl">

          <div className='flex justify-between text-center'>
            {/* WhatsApp Contacts */}

            {[
              {
                text: 'Customers Support',
                img: Images.socialBanner1,
                link: customersSupportWs,
              },
              // {
              //   text: 'Customer Complain',
              //   img: Images.socialBanner1,
              //   link: customerComplainWs,
              // },
              // {
              //   text: 'Owner',
              //   img: Images.socialBanner1,
              //   link: ownerWs,
              // },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-1/3 cursor-pointer"
                onClick={() => {
                  window.open(`https://wa.me/${item.link}`, '_blank');
                }}
              >
                <Image className="size-8" src={item.img} alt={item.text} />
                <p className="font-medium text-[12px] leading-4 text-center">
                  {item.text}
                </p>
              </div>
            ))}

            {/* Tawk.to Chat Button */}
            <div
              onClick={() => {
                handleModal();   // ✅ Close HelpDeskModal
                openChat();      // ✅ Open ChatModal
              }}
              className="flex flex-col items-center w-1/3 cursor-pointer"
            >
              <div className="relative" id="chat-container">
                <Image
                  className="size-9"
                  src={Images.socialBanner3}
                  alt="Join Chat"
                />

                {/* 🔴 Unread badge */}
                {(unreadCount ?? 0) > 0 && (
                  <div className="absolute -top-1.5 -left-1.5 bg-red-600 rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center z-10">
                    <span className="text-white text-[10px] text-center font-semibold leading-none">
                      {unreadCount! > 9 ? '9+' : unreadCount}11
                    </span>
                  </div>
                )}


              </div>

              <p className="font-medium text-[12px] leading-4  ">
                Join Chat
              </p>
            </div>


          </div>
          {/* </div> */}
          {/* Telegram Contacts */}
          < div className="flex flex-row justify-between mt-3">
            {[
              {
                text: 'Customer Support',
                img: Images.socialBanner2,
                link: `tg://resolve?phone=${customerSupportTg}`,
                webLink: `https://t.me/${customerSupportTg}`,
              },
              {
                text: 'Join Channel',
                img: Images.socialBanner2,
                link: `tg://resolve?phone=${JoinChannel}`,
                webLink: `https://t.me/${JoinChannel}`,
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = item.link;
                  setTimeout(() => {
                    window.open(item.webLink, '_blank');
                  }, 1000);
                }}
                className="flex flex-col items-center w-1/3 p-2 cursor-pointer"
              >
                <Image className="size-8" src={item.img} alt={item.text} />
                <p className="font-medium text-[12px] leading-4 text-center">
                  {item.text}
                </p>
              </a>
            ))}

          </div>
        </div>
      </div>
    </ModalsContainer>
  );
};

export default HelpDeskModal;