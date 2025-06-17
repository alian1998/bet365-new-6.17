// import Cookies from "js-cookie";

// const TOKEN_NAME = "gameToken";
// const ACTIVITY_KEY = "lastActivity";
// const TAB_KEY = "openTabs";
// const ACTIVITY_TIMEOUT = 60 * 60 * 1000;

// export const setGameTokenInCookie = (token: string): void => {
//   Cookies.set(TOKEN_NAME, token, { expires: undefined });
//   updateActivity();
// };

// export const getGameToken = (): string | undefined => Cookies.get(TOKEN_NAME);

// export const removeGameToken = (): void => Cookies.remove(TOKEN_NAME);

// const updateActivity = (): void => {
//   Cookies.set(ACTIVITY_KEY, Date.now().toString());
// };

// const getLastActivity = (): number =>
//   parseInt(Cookies.get(ACTIVITY_KEY) || "0", 10);

// const isInactive = (): boolean =>
//   Date.now() - getLastActivity() > ACTIVITY_TIMEOUT;

// const updateTabCount = (delta: number): number => {
//   const currentCount = parseInt(Cookies.get(TAB_KEY) || "0", 10);
//   const newCount = Math.max(0, currentCount + delta);
//   Cookies.set(TAB_KEY, newCount.toString());
//   return newCount;
// };

// export const initializeTokenManager = (): void => {
//   updateTabCount(1);

//   window.addEventListener("beforeunload", handleBeforeUnload);
//   window.addEventListener("storage", handleStorageEvent);

//   ["mousedown", "keydown", "touchstart", "scroll"].forEach((event) => {
//     window.addEventListener(event, updateActivity);
//   });

//   resetInactivityCheck();
// };

// const handleBeforeUnload = (): void => {
//   const remainingTabs = updateTabCount(-1);
//   if (remainingTabs === 0 && isInactive()) {
//     removeGameToken();
//   }
// };

// const handleStorageEvent = (event: StorageEvent): void => {
//   if (event.key === ACTIVITY_KEY) {
//     resetInactivityCheck();
//   }
// };

// const resetInactivityCheck = (): void => {
//   const checkInactivity = (): void => {
//     if (isInactive()) {
//       const remainingTabs = parseInt(Cookies.get(TAB_KEY) || "0", 10);
//       if (remainingTabs === 0) {
//         removeGameToken();
//       }
//     }
//     setTimeout(checkInactivity, 10000);
//   };

//   setTimeout(checkInactivity, ACTIVITY_TIMEOUT);
// };
