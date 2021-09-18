import { createContext, useContext } from "react";

export const BotVersionContext = createContext({
    miniAppVersion: "",
    botVersion: "",
    setMiniAppVersion: () => {},
    setBotVersion: () => {}
});

export const useVersionProvider = () => {
    return useContext(BotVersionContext);
};
