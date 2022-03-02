import React, { Fragment, useState, useReducer, useEffect } from "react";
import getArgs from "vkappsutils/dist/Args";
import VKBridge from "@vkontakte/vk-bridge";
import axios from "axios";
import { useRouter } from "@unexp/router";
import { Panel, Div, Group, CardGrid, Card, SimpleCell, Avatar, Button, ViewWidth, RichCell, useAdaptivity, Gradient, Title, PullToRefresh } from "@vkontakte/vkui";
import { Icon28Settings, Icon28EditOutline, Icon28BookOutline, Icon28SparkleOutline, Icon28Smiles2Outline, Icon28UserSquareOutline, Icon24Gallery, Icon28StatisticsOutline, Icon32Graffiti, Icon28AddOutline, Icon24Globe, Icon28GraphOutline } from "@vkontakte/icons";

import { CustomPanelHeader, Spinner } from "../../components";
import { IconServer, IconCalculator, IconHotaru } from "../../icons";

const panels = [
    {
        id: "userInfoProfile",
        title: "Профиль",
        isAdmin: false,
        description: "Просмотр своего игрового профиля в этой беседе",
        icon: <Icon28UserSquareOutline/>
    },
    {
        id: "settings",
        title: "Настройки беседы",
        isAdmin: true,
        description: "Настройка Хотару для этой беседы",
        icon: <Icon28Settings/>
    },
    {
        id: "sendAnonimRp",
        title: "Отправить анонимку",
        description: "Отправить анонимную Рп команду в беседу",
        icon: <Icon28Smiles2Outline/>
    },
    {
        id: "creationPool",
        title: "Кастомная площадка",
        isAdmin: true,
        description: "Создание кастомных Рп, ачивок и т.д",
        icon: <Icon28SparkleOutline/>
    },
    {
        id: "sendMessage",
        title: "Отправить сообщение в беседу",
        isAdmin: false,
        description: "Отправка сообщения от имени Хотару",
        icon: <Icon28EditOutline/>
    }
];

export function Home({ id, chatData, setUserChatData, userId }) {

    const { viewWidth } = useAdaptivity();
    const { push } = useRouter();
    const { user_id, client } = getArgs();
    const [mount, setMount] = useState(true);
    const [error, setError] = useState(null);
    const [isUserAdmin, setUserAdmin] = useState(false);
    const [fetching, setFecthing ] = useState(false);

    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }

        return spinner;
    }, false);

    useEffect(() => {
        for(var i = 0; i < chatData.chatAdmins.length; i++)
        {
            if(chatData.chatAdmins[i] == userId) setUserAdmin(true);
        }
        if(chatData.OwnerId == userId) setUserAdmin(true);
        return () => setMount(false);
    }, []);

    const onRefresh = () => {
        setFecthing(true);
        let chatId = chatData.id;
        axios.get(`https://blowoutbots.somee.com/api/hotaru/GetChat/${chatId}`)
            .then(({ data }) => {
                setUserChatData(data)
                setFecthing(false);
            })
    }

    return (
        <Panel id={id}>
            <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
            <CustomPanelHeader status= {spinner ? 'Идёт загрузка...' : 'Приложение для горничных!'}
                               left={false}
            />
            {
                        spinner && <Spinner/>
            }
            {
            !spinner && 
            <Group>
               <Gradient style={{
               margin:'-10px -7px 0 -7px',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'left',
               justifyContent: 'left',
               textAlign: 'left',
               padding: 32,
             }}>
                 <Avatar size={76} mode="app" src={chatData.avatar}/>
                 <Title style={{ marginBottom: 8, marginTop: 20 }} level="2" weight="medium">Беседа «{chatData.title}»</Title>
             </Gradient>
             <Div>
                <Group mode="plain">
                    <CardGrid style={{ marginBottom: "12px", marginTop: viewWidth > ViewWidth.MOBILE ? "8px" : "0" }}
                              size="l"
                    >
                        {
                            panels.map(({ id, title, description, icon, isAdmin, checkClient }, index) => {
                                if (checkClient && client === "ok") {
                                    return;
                                }

                                return isAdmin && !isUserAdmin ? null : (
                                    <Fragment key={id}>
                                        <Card>
                                            <SimpleCell before={icon}
                                                        onClick={() =>  push({panel: id})}
                                                        size="m"
                                                        multiline
                                                        description={description}
                                            >
                                                {
                                                    title
                                                }
                                            </SimpleCell>
                                        
                                        </Card>
                                        {
                                            client !== "ok" && index === 2 &&
                                            <Card>
                                                <RichCell multiline
                                                          disabled
                                                          before={
                                                              <Avatar mode="image"
                                                                      id="hotaru-maid"
                                                                      size={64}
                                                              >
                                                                  <IconHotaru height={64} width={64}/>
                                                              </Avatar>
                                                          }
                                                          size="l"
                                                          text="Больше новостей и обновлений в нашей группе ВК!"
                                                          actions={
                                                              <Button mode="secondary"
                                                                      target="_blank"
                                                                      href="https://vk.com/hotarutyyan"
                                                                      rel="noreferrer"
                                                              >
                                                                  Открыть
                                                              </Button>
                                                          }
                                                >
                                                    Хотару | Мейд-бот
                                                </RichCell>
                                            </Card>
                                        }
                                    </Fragment>
                                );
                            })
                        }
                        {
                            user_id && VKBridge.supports("VKWebAppAddToCommunity") &&
                            <Card>
                                <SimpleCell before={
                                    <Icon28AddOutline/>
                                }
                                            onClick={() => VKBridge.send("VKWebAppAddToCommunity", {})}
                                            size="m"
                                            multiline
                                            description="Установите приложение в свое сообщество за один клик"
                                >
                                    Установить приложение
                                </SimpleCell>
                                <SimpleCell before={<Icon28BookOutline/>}
                                                        onClick={() => setUserChatData(null)}
                                                        size="m"
                                                        multiline
                                                        description="Выбор другой беседы"
                                            >
                                                Вернуться к списку бесед
                                </SimpleCell>
                            </Card>
                        }
                    </CardGrid>
                </Group>
                </Div>
            </Group>
        }
        </PullToRefresh>
        </Panel>
    )
}
