import React, { Fragment, useState, useEffect, useReducer } from "react";
import { Panel, Group, Header, SimpleCell, Avatar, IconButton, Footer } from "@vkontakte/vkui";
import { Icon28LinkOutline } from "@vkontakte/icons";
import { Icon28MusicOutline } from '@vkontakte/icons';
import { useStructure, useRouter } from "@unexp/router";
import axios from "axios";
import VKBridge from "@vkontakte/vk-bridge";
import { useSpinnerState, useDatabaseProvider } from "./hooks";

import { CustomPanelHeader, Spinner, MainFooterInfo, OfflineBlock } from "./components";

import { Layout } from "./Layout";
import { GlobalLayout } from "./GlobalLayout";

const globalPanels = [
    {
        id: "mashupNet",
        title: "#MashupNet",
        description: "Мешапы созданные с помощью генератора Хотару",
        icon: <Icon28MusicOutline />
    }
];

export function RootLayoutChat({ id }) {
    const [mount, setMount] = useState(true);
    const [chatsData, setDataChats] = useState(null);
    
    const { chat: chatUserData, setChatData: setCorrectDataChat, updateBaseUser } = useDatabaseProvider();
    const [userId, setVkUserId] = useState(0);
    const [error, setError] = useState(null);
    const [pinged, setHotaruPing] = useState(false);
    const [activeLayout, setActiveLayout] = useState(null);
    const [activeGlobalPanel, setActiveGlobalPanel] = useState(null);
    const [ activeLocalPanel, setActiveLocalPanel ] = useState(false);
    const { spinner, setSpinnerState, setText, text, spinnerRender } = useSpinnerState(id);

    useEffect(async () => {
        setText("Загружаем беседы...");
        setSpinnerState(true);
        var vkData = await VKBridge.send("VKWebAppGetUserInfo");
        var userId = vkData.id;
        setVkUserId(userId);
        hotaruPing();
        getUserChats(userId);
        return () => setMount(false);
    }, []);

    useEffect(() => {
        setActiveLayout(WhichLayout());
    }, [activeGlobalPanel, activeLocalPanel]);

    const getUserChats = (userId) => {
        axios.get(`https://blowoutbots.somee.com/api/GetUserChats?userId=${userId}`)
            .then(({ data }) => {
                setDataChats(data);
                setSpinnerState(false);
            })
    };

    const rootBack = () => {
        setActiveLocalPanel(false);
        setActiveGlobalPanel(null);
    }

    const WhichLayout = () => {
        if (activeGlobalPanel != null && activeGlobalPanel.length > 0) {
            return (<Fragment key="layout__global">
                <GlobalLayout userId={userId} setActiveGlobalPanel={setActiveGlobalPanel} activeGlobalPanel={activeGlobalPanel} />
            </Fragment>)
        } else if (activeLocalPanel != false) {
            return (
                <Fragment key="layout__chat">
                    <Layout chatId={chatUserData.id} chatData={chatUserData} userId={userId} rootBack={rootBack} />
                </Fragment>)
        }
    }

    const hotaruPing = () => {
        axios.get(`https://blowoutbots.somee.com/api/hotaru/Ping`)
            .then(({ data }) => {
                setHotaruPing(data)
            })
    }

    const chooseChat = (chat) => {
        setText("Загружаем вашу информацию в беседе...");
        setSpinnerState(true);
        setCorrectDataChat(chat);
        updateBaseUser(userId, chat.id).onEnd(() => {
            setActiveLocalPanel(true);
            setSpinnerState(false);
        });
    }

    if (spinner) return (<Panel id={id}>
        <CustomPanelHeader status={text}
            left={false}
        />
        <Spinner />
        <MainFooterInfo />
    </Panel>);

    if (!pinged) return (
        <Panel id={id}>
            <CustomPanelHeader status="Бот Хотару на технических работах :("
                left={false}
            />
            <OfflineBlock botDisabled={true} />
            <MainFooterInfo />
        </Panel>
    )

    return (
        <Panel id={id}>
            {
                (activeLayout == null) ?
                    <Fragment key="RootLayout__">
                        <CustomPanelHeader status="Выберите свой чат"
                            left={false}
                        />
                        <Group>
                            <Group mode="plain">
                                <Header mode="secondary">Список доступных бесед</Header>
                                {
                                    chatsData.map((chat, index) => {
                                        return (<Fragment key={id}>
                                            <SimpleCell onClick={() => { chooseChat(chat) }} expandable before={<Avatar src={chat.avatar == "" ? "https://sun9-43.userapi.com/gfufLV5NUTMENAtQ9Yo-m6huuJmgx0hFlYG2nA/oYS0Abp0iAw.jpg" : chat.avatar} />} after={<IconButton onClick={() => { setCorrectDataChat(chat); }}><Icon28LinkOutline /></IconButton>}>{chat.title}</SimpleCell>
                                        </Fragment>
                                        )
                                    })
                                }
                            </Group>
                            <Group mode="plain">
                                <Header mode="secondary">Глобальные сети</Header>
                                {
                                    globalPanels.map((panel, index) => {
                                        return (<Fragment key={`global__${panel.id}`}>
                                            <SimpleCell before={panel.icon}
                                                onClick={() => setActiveGlobalPanel(panel.id)}
                                                size="m"
                                                multiline
                                                description={panel.description}
                                            >
                                                {
                                                    panel.title
                                                }
                                            </SimpleCell>
                                        </Fragment>
                                        )
                                    })
                                }
                            </Group>
                        </Group>
                    </Fragment>
                    : activeLayout
            }
            <MainFooterInfo />
        </Panel>
    )
}
