import React, { useState, useEffect } from "react";
import { ConfigProvider } from "@vkontakte/vkui";
import axios from "axios";

import { DatabaseContext, UpdateParameters } from "../hooks/databaseContext";

export function DatabaseProvider({ children }) {

    const [ user, setUserData ] = useState(null);
    const [ chat, setChatData ] = useState(null);
    const [ account, setAccountData ] = useState(null);

    const updateBaseUser = (userId, chatId) =>
    {
        var updateEnd = new UpdateParameters();
        axios.get(`https://blowoutbots.somee.com/api/hotaru/GetUserProfileChat?chatId=${chatId}&userId=${userId}`)
            .then(({ data }) => {
                setUserData(data);
                updateEnd.invokeEnd(data);
            });
        return updateEnd;
    }

    const updateBaseChat = (chatId) =>{
        var updateEnd = new UpdateParameters();
        axios.get(`https://blowoutbots.somee.com/api/hotaru/GetChat/${chatId}`)
        .then(({ data }) => {
            setChatData(data);
            updateEnd.invokeEnd(data);
        });
        return updateEnd;
    }

    const updateAccount = (userId) =>{
        var updateEnd = new UpdateParameters();
        axios.get(`https://blowoutbots.somee.com/api/hotaru/GetAccount/${userId}`)
        .then(({ data }) => {
            setAccountData(data);
            updateEnd.invokeEnd(data);
        });
        return updateEnd;
    }

    return (
        <DatabaseContext.Provider value={{
            account,
            user,
            chat,
            setAccountData,
            setUserData,
            setChatData,
            updateAccountData: updateAccount,
            updateBaseUser,
            updateBaseChat
        }}>
            <ConfigProvider 
            >
                {
                    children
                }
            </ConfigProvider>
        </DatabaseContext.Provider>
    );
}
