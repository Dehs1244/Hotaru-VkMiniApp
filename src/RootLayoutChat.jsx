import React, { Fragment, useState, useEffect, useReducer } from "react";
import { Panel, Group, Header, SimpleCell, Avatar, IconButton, Footer } from "@vkontakte/vkui";
import { Icon28LinkOutline } from "@vkontakte/icons";
import axios from "axios";
import VKBridge from "@vkontakte/vk-bridge";
import { useVersionProvider } from "./hooks/versionProvider";

import { CustomPanelHeader, Spinner, MainFooterInfo } from "./components";

import { Layout } from "./Layout";

export function RootLayoutChat({ id }) {
    const [mount, setMount] = useState(true);
    const { setMiniAppVersion, setBotVersion } = useVersionProvider();
    const [ chatsData, setDataChat] = useState(null);
    const [ chatUserData, setCorrectDataChat] = useState(null);
    const [ userId, setVkUserId ] = useState(0);
    const [error, setError] = useState(null);
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }

        return spinner;
    }, true);

    useEffect( async() => {
		var vkData = await VKBridge.send("VKWebAppGetUserInfo");
        var userId = vkData.id;
        setVkUserId(userId);
        getUserChats(userId);
        return () => setMount(false);
    }, []);

    const getUserChats = (userId) => {
        setSpinner(true);
        axios.get(`https://blowoutbots.somee.com/api/GetUserChats?userId=${userId}`)
            .then(({ data }) => {
                setDataChat(data);
                setSpinner(false);
            })
    };

    if(spinner) return (
        <Panel id={id}>
            <CustomPanelHeader status="Загружаем беседы, подождите..."
                               left={false}
            />
             <Spinner/>
            <MainFooterInfo/>
        </Panel>
    )

    return (
        <Panel id={id}>
        {
        (chatUserData == null) ?
        <Fragment key="RootLayout__">
            <CustomPanelHeader status="Выберите свой чат"
                               left={false}
            />
        <Group>
            <Group mode="plain">
                  <Header mode="secondary">Список доступных бесед</Header>
                  {
                  chatsData.map((chat, index) => {
                    return ( <Fragment key={id}>
                  <SimpleCell onClick={()=> { setCorrectDataChat(chat)}} expandable before={<Avatar src= {chat.avatar == "" ? "https://sun9-43.userapi.com/gfufLV5NUTMENAtQ9Yo-m6huuJmgx0hFlYG2nA/oYS0Abp0iAw.jpg" : chat.avatar}/>} after={<IconButton onClick={() => { setCorrectDataChat(chat);}}><Icon28LinkOutline/></IconButton>}>{chat.title}</SimpleCell>
                    </Fragment>
                    )
                  })
                }
            </Group>
        </Group>
        </Fragment>
        : <Layout chatId = {chatUserData.id} chatData = {chatUserData} userId = {userId} setUserChatData = {setCorrectDataChat}/>
        }
        <MainFooterInfo/>
        </Panel>
    )
}
