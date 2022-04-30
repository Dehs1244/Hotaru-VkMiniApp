import { useLocalStorage } from "./localStorageHook";

export const useUserToken = () => useLocalStorage("user_access_token", null);