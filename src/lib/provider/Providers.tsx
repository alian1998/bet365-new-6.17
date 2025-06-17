"use client";

import axiosInstance from "@/utils/axiosConfig";
import { getGameToken } from "@/utils/token";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  useEffect,
} from "react";

type IContext<T> = Dispatch<SetStateAction<T>>;

interface IContextType {
  balance: string;
  personalInfo: string;
  setPersonalInfo: IContext<string>;
  history: string;
  setHistory: IContext<string>;
  copyTime: boolean;
  setCopyTime: IContext<boolean>;
  showMenu: boolean;
  setShowMenu: IContext<boolean>;
  profile: boolean;
  setProfile: IContext<boolean>;
  galleryOpen: boolean;
  setGalleryOpen: IContext<boolean>;
  token: string | null;
  activeCard: string;
  setActiveCard: React.Dispatch<React.SetStateAction<string>>;
  assets: any;
}

export const ContextApi = createContext<IContextType | undefined>(undefined);

const Providers = ({ children }: { children: ReactNode }) => {
  const balance = "0";

  const [personalInfo, setPersonalInfo] = useState<string>("");
  const [history, setHistory] = useState<string>("");
  const [copyTime, setCopyTime] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  const [galleryOpen, setGalleryOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const [activeCard, setActiveCard] = useState<string>("JetX");
  const [assets, setAssets] = useState<string | null>(null);

  const getdata = async () => {
    const res = await axiosInstance.get("/assets");
    setAssets(res.data);
  };
  useEffect(() => {
    if (!token) {
      const gameToken = getGameToken();
      setToken(gameToken);
    }
  }, [token]);

  useEffect(() => {
    getdata();
  }, []);

  const authInfo: IContextType = {
    balance,
    personalInfo,
    setPersonalInfo,
    history,
    setHistory,
    copyTime,
    setCopyTime,
    showMenu,
    setShowMenu,
    profile,
    setProfile,
    galleryOpen,
    setGalleryOpen,
    token,
    activeCard, // manage home page tab
    setActiveCard,
    assets,
  };

  const queryClient = new QueryClient();
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ContextApi.Provider value={authInfo}>{children}</ContextApi.Provider>
    </QueryClientProvider>
  );
};

export default Providers;
