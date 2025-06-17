/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IMeta {
  limit: number;
  page: number;
  total: number;
}
export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
  success?: boolean;
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IProfileData = {
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  agent: string;
  countryCode: string;
  birthday: string | null;
  profileImage: string | null;
  referCode: string | null;
  myReferalCode: string;
  isVerified: boolean;
  role: "USER" | "ADMIN" | "MODERATOR";
  status: "ACTIVE" | "INACTIVE" | "BANNED";
  lastPassChange: string | null;
  createdAt: string;
  updatedAt: string;
  admin: {
    name: string | null;
    whatsApp: string;
    userName: string;
  };
};

export type IGameData = {
  id: string;
  name: string;
  image: string;
  link: string;
  isGlobalActive: boolean;
  adminGame: {
    isActive: boolean;
  }[];
  canPlay: boolean;
};
