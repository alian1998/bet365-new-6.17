export interface IDepositChannel {
  id: string;
  depositChannel: { channelName: string }[];
}
export interface IChannel {
  channelName: string;
}

export interface ISpecificChannel {
  id: string;
  channelName: string;
  type: string | null;
  branch: string;
  accountNo: string;
  description: string;
  status: string;
  defaultChannel?: {
    image: string;
  };
  createdAt: string;
  updatedAt: string;
  paymentMethodId: string;
  adminId: string;
}

export interface IPaymentMethod {
  id: string;
  paymentName: string;
  currency: string;
  img: string;
  image: string;
  minAmount: number;
  maxAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  depositChannel: ISpecificChannel[];
}

export interface IPaymentMethods {
  data: IPaymentMethod[];
}

export interface IDepositChannels {
  id: string;
  channelName: string;
  type: string;
  branch: string | null;
  accountNo: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentMethodId: string;
  adminId: string;
}

export interface IPaymentMethodA {
  id: string;
  paymentName: string;
  currency: string;
  img: string;
  maxAmount: number;
  minAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  depositChannel: IDepositChannel[];
}
