import { createContext, useContext } from "react";

export const DatabaseContext = createContext({
    user: "",
    chat: "",
    setUserData: () => {},
    setChatData: () => {},
    updateBaseUser: (userId, chatId) => {},
    updateBaseChat: (chatId) => {}
});

export class UpdateParameters{
    constructor(){
    }

    invokeEnd(data){
        this.end(data);
    }

    onEnd(func){
        this.end = func;
    }
}

export const useDatabaseProvider = () => {
    return useContext(DatabaseContext);
};
