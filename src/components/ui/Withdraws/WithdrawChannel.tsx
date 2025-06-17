// import { Images } from "@/lib/store/Index";
import Image from "next/image";
import ButtonTick from "@/components/shared/buttonTick/ButtonTick";
import {
  IChannel,
  IPaymentMethod,
  IPaymentMethods,
  ISpecificChannel,
} from "@/types/depositChannel/DepositChannel";
export type IProps = {
  paymentMethodId: string;
  depositData: IPaymentMethods;
  handleDepositChannel: (e: IChannel) => void;
  depositChannel: string;
};

const WithdrawChannel = ({
  paymentMethodId,
  depositData,
  handleDepositChannel,
  depositChannel,
}: IProps) => {
  return (
    <div className="py-3 px-2">
      <p className="text-textColor font-medium mb-2">Withdraw Channel</p>
      {Array.isArray(depositData?.data) &&
        depositData?.data?.map((item: IPaymentMethod) => (
          <div key={item.id}>
            {item.id == paymentMethodId && (
              <div
                className={`grid  gap-2 ${
                  item?.paymentName == "Mobile Bank"
                    ? "grid-cols-4"
                    : "grid-cols-3"
                }`}
              >
                {Array.isArray(item.depositChannel) &&
                  item.depositChannel?.map((channel: ISpecificChannel) => (
                    <div
                      key={channel.id}
                      onClick={() => handleDepositChannel(channel)}
                      className={`cardColor2 rounded w-full p-2 relative ${
                        channel.channelName == depositChannel
                          ? "border-2 border-[#ffb50a]"
                          : "border-2 border-black"
                      }`}
                    >
                      {item.paymentName == "Bank" ? (
                        <>
                          <p className="text-white text-[12px] capitalize font-medium">
                            {channel.channelName}
                          </p>
                        </>
                      ) : (
                        <>
                          <Image
                            className={`size-full rounded cursor-pointer object-cover `}
                            src={channel?.defaultChannel?.image ?? ""}
                            alt="img"
                            width={100}
                            height={100}
                          />
                        </>
                      )}
                      {channel.channelName == depositChannel ? (
                        <ButtonTick className="absolute right-0 bottom-0 size-6" />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default WithdrawChannel;
