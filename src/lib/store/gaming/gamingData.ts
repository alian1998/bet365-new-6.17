
// menuItemGallery
// import gpopular from "@/assets/icon/menuItem/gallery1/popular.svg";
import garchard from "@/assets/icon/menuItem/gallery1/archard.svg";
import gfishing from "@/assets/icon/menuItem/gallery1/fishing.svg";
import glotto from "@/assets/icon/menuItem/gallery1/lotto.svg";
import gcasino from "@/assets/icon/menuItem/gallery1/casino.svg";
import gslot from "@/assets/icon/menuItem/gallery1/slot.svg";
import gsports from "@/assets/icon/menuItem/gallery1/sports.svg";
import gtable from "@/assets/icon/menuItem/gallery1/table.svg";
import gcrash from "@/assets/icon/menuItem/gallery1/crash.svg";
import { popularItem } from "./popular";
import { lotteryData } from "./lottery";
import { archard } from "./archard";
import { fishingData } from "./Fishing";
import { crashData } from "./crash";
import { tableData } from "./table";
import { slotData } from "./slot";
import { sportsData } from "./sports";
import { casinoData } from "./casino";

export const gamesItem = [
  {
    id: "1",
    item: "JetX",
    image: '/popularSvg.gif',
    itemData: popularItem,
  },
  {
    id: "2",
    item: "Sports",
    image: gsports,
    itemData: sportsData,
  },
  {
    id: "3",
    item: "Casino",
    image: gcasino,
    itemData: casinoData,
  },
  {
    id: "4",
    item: "Slot",
    image: gslot,
    itemData: slotData,
  },
  {
    id: "5",
    item: "Table",
    image: gtable,
    itemData: tableData,
  },
  {
    id: "6",
    item: "Crash",
    image: gcrash,
    itemData: crashData,
  },
  {
    id: "7",
    item: "Fishing",
    image: gfishing,
    itemData: fishingData,
  },
  {
    id: "8",
    item: "Archard",
    image: garchard,
    itemData: archard,
  },
  {
    id: "9",
    item: "Lottery",
    image: glotto,
    itemData: lotteryData,
  },
];
