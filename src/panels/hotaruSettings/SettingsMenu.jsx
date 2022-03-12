import React, { Fragment, useState, useReducer, useEffect } from "react";
import { Panel, SimpleCell, Group } from "@vkontakte/vkui";
import { Icon28Notification, Icon28PenKeyholeOutline, Icon28SnowflakeOutline, Icon28BookOutline, Icon28MessagesCircleFillYellow, Icon28LockOutline, Icon28StarsCircleFillViolet, Icon28GhostSimleOutline, Icon28AccessibilityOutline } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { useRouter } from "@unexp/router";
import * as panelIds from "../../panelsId"

const settingsPanel = [
    {
        id: panelIds.SETTINGS_MAIN_ID,
        title: "Настройки чата",
        description: "Настройка нейрогенераторов, основных функций, работа с участниками и т.д",
        icon: <Icon28MessagesCircleFillYellow/>
    },
    {
        id: panelIds.SETTINGS_NOTIFICATIONS_ID,
        title: "Оповещения",
        description: "Настройка отправки различных оповещений в беседу",
        icon: <Icon28Notification/>
    },
    {
        id: panelIds.SETTINGS_NOTIFICATIONS_ID,
        title: "Карантинная зона беседы",
        description: "Настройка макс. игроков, темы карантинной зоны, время сброса груза и т.д",
        icon: <Icon28SnowflakeOutline/>
    },
    {
        id: panelIds.SETTINGS_LIMIT_ID,
        title: "Лимиты для участников",
        description: "Настройка максимального кол-ва сбора карт общения.",
        icon: <Icon28LockOutline/>
    },
    {
        id: panelIds.SETTINGS_FORBIDDEN_COMMANDS_ID,
        title: "Запрещённые команды",
        description: "Отключение различных команд для беседы.",
        icon: <Icon28PenKeyholeOutline/>
    },
    {
        id: panelIds.SETTINS_CHAT_MODE_ID,
        title: "Режим беседы",
        description: "Настройка режима работы Хотару в беседе. Важный пункт настройки.",
        icon: <Icon28StarsCircleFillViolet/>
    },
    {
        id: panelIds.SETTINGS_EXODUS_ID,
        title: "Исходы",
        description: "Настройка исходов для различных событий в беседе (проигрыш в города, в дуэли и т.д).",
        icon: <Icon28GhostSimleOutline/>
    },
    {
        id: panelIds.SETTINGS_ROLE_ID,
        title: "Роли",
        description: "Настройка и создание различных ролей для беседы.",
        icon: <Icon28AccessibilityOutline/>
    }
];

export function SettingsMenu({ id }) {

    const { push } = useRouter();

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
