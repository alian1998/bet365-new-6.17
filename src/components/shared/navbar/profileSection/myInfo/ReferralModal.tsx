import ModalsContainer from "@/components/shared/container/ModalContainer";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type IProps = {
  shareModal: boolean;
  handleShareModal: () => void;
  data: string;
};

const ReferralModal = ({ shareModal, handleShareModal, data }: IProps) => {
  // Share URLs
  const whatsappShare = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    data
  )}`;
  const messengerShare = `fb-messenger://share?link=${encodeURIComponent(
    data
  )}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    data
  )}&text=Join%20now!`;

  return (
    <ModalsContainer modal={shareModal} handleModal={handleShareModal}>
      <div className="w-full h-screen bg-[#0000007e] flex justify-center items-center my-5">
        <div className="w-full rounded-md px-3 py-5 bg-slate-600 text-white">
          <p className="font-medium text-[14px] my-3">Share Link</p>
          <div className="flex items-center gap-7">
            {/* Messenger Share Button */}
            <a
              href={messengerShare}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center items-center"
            >
              <FaFacebookMessenger className="size-6" />
            </a>

            {/* WhatsApp Share Button */}
            <a
              href={whatsappShare}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center items-center"
            >
              <FaWhatsapp className="size-6" />
            </a>

            {/* Twitter Share Button */}
            <a
              href={twitterShare}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center items-center"
            >
              <FaXTwitter className="size-6" />
            </a>
          </div>
        </div>
      </div>
    </ModalsContainer>
  );
};

export default ReferralModal;
