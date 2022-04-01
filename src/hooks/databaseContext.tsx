import { createContext, useContext } from "react";

interface IDatabase {
    account: any;
    user: String | Number;
    chat: String | Number;
    setAccountData: (data: any) => void;
    setUserData: (data: any) => void;
    setChatData: (data: any) => void;
    updateAccountData: (userId: Number) => UpdateParameters;
    updateBaseUser: (userId : Number, chatId : Number) => UpdateParameters;
    updateBaseChat: (chatId : Number) => UpdateParameters;
}

export function GetDatabaseObject() : IDatabase {
    return {
        account: "",
        user: "",
        chat: "",
        setAccountData: () => {},
        setUserData: () =>{},
        setChatData: () => {},
        updateAccountData: () => new UpdateParameters(),
        updateBaseChat: () => new UpdateParameters(),
        updateBaseUser: () => new UpdateParameters()
    }
}

export const DatabaseContext = createContext(GetDatabaseObject());

export class UpdateParameters {
    end: (data: any) => void;

    constructor(){
        this.end = () => {};
    }

    invokeEnd(data : any) : void{
        this.end(data);
    }

    onEnd(func : (data : any) => void){
        this.end = func;
    }
}

export function useDatabaseProvider() : IDatabase
{
    return useContext(DatabaseContext);
}
