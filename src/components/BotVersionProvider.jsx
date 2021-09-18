import React, { useState, useEffect } from "react";
import VKBridge from "@vkontakte/vk-bridge";
import getArgs from "vkappsutils/dist/Args";
import { ConfigProvider } from "@vkontakte/vkui";
import packageJson from "../../package.json";

import { BotVersionContext } from "../hooks";

export function BotVersionProvider({ children }) {

    const [ botVersion, setBotVersion ] = useState(0);
    const [ miniAppVersion, setMiniAppVersion ] = useState(0);

    useEffect(() => {
        console.log(packageJson.bot_version_valid);
        setBotVersion(packageJson.bot_version_valid);
        setMiniAppVersion(packageJson.version);
    }, []);

    return (
        <BotVersionContext.Provider value={{
            miniAppVersion,
            botVersion,
            setBotVersion,
            setMiniAppVersion
        }}>
            <ConfigProvider 
            >
                {
                    children
                }
            </ConfigProvider>
        </BotVersionContext.Provider>
    );
}
