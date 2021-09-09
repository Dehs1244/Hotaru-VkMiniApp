import React, { Fragment, useState, useReducer, useEffect } from "react";
import { Panel, SimpleCell, Group } from "@vkontakte/vkui";
import { Icon28Notification, Icon28PenKeyholeOutline, Icon28SnowflakeOutline, Icon28BookOutline, Icon28MessagesCircleFillYellow, Icon28LockOutline, Icon28StarsCircleFillViolet, Icon28GhostSimleOutline, Icon28AccessibilityOutline } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { useRouter } from "@unexp/router";

const settingsPanel = [
    {
        id: "settings_main",
        title: "Настройки чата",
        description: "Настройка нейрогенераторов, основных функций, работа с участниками и т.д",
        icon: <Icon28MessagesCircleFillYellow/>
    },
    {
        id: "nortification",
        title: "Оповещения",
        description: "Настройка отправки различных оповещений в беседу",
        icon: <Icon28Notification/>
    },
    {
        id: "qurantineZoneSettings",
        title: "Карантинная зона беседы",
        description: "Настройка макс. игроков, темы карантинной зоны, время сброса груза и т.д",
        icon: <Icon28SnowflakeOutline/>
    },
    {
        id: "limitsSettings",
        title: "Лимиты для участников",
        description: "Настройка максимального кол-ва сбора карт общения.",
        icon: <Icon28LockOutline/>
    },
    {
        id: "forbiddenCommands",
        title: "Запрещённые команды",
        description: "Отключение различных команд для беседы.",
        icon: <Icon28PenKeyholeOutline/>
    },
    {
        id: "chatmodeSettings",
        title: "Режим беседы",
        description: "Настройка режима работы Хотару в беседе. Важный пункт настройки.",
        icon: <Icon28StarsCircleFillViolet/>
    },
    {
        id: "exodusSettings",
        title: "Исходы",
        description: "Настройка исходов для различных событий в беседе (проигрыш в города, в дуэли и т.д).",
        icon: <Icon28GhostSimleOutline/>
    },
    {
        id: "rolesSettings",
        title: "Роли",
        description: "Настройка и создание различных ролей для беседы.",
        icon: <Icon28AccessibilityOutline/>
    }
];

export function SettingsMenu({ id, chatId, chatData }) {
    const [mount, setMount] = useState(true);
    const [error, setError] = useState(null);
    const { push } = useRouter();
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }
        return spinner;
    }, true);

    useEffect(() => {
        return () => setMount(false);
    }, []);

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Настройки беседы"/>
            <Group mode="plain">
                        {
                            settingsPanel.map(({ id, title, description, icon }, index) => {
                                return (
                                    <Fragment key={id}>
                                            <SimpleCell before={icon}
                                                        onClick={() => push({panel: id})}
                                                        size="m"
                                                        multiline
                                                        description={description}
                                            >
                                                {
                                                    title
                                                }
                                            </SimpleCell>
                                    </Fragment>
                                );
                            })
                        }
             </Group>
        </Panel>
    )
}
