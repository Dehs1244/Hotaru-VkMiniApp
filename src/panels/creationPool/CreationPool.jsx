import React, { Fragment, useState, useReducer, useEffect } from "react";
import { Panel, SimpleCell, Group } from "@vkontakte/vkui";
import { Icon28MessageAddBadgeOutline, Icon28DonateCircleFillYellow, Icon28MessageUnreadOutline } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { useRouter } from "@unexp/router";
import { CreationPoolRp } from "./CreationPoolRp";

const settingsPanel = [
    {
        id: "creationPool_rp",
        title: "Создание Рп команд",
        description: "Создание и модифицирование кастомных РП команд",
        icon: <Icon28MessageAddBadgeOutline/>
    },
    {
        id: "creationPool_customRpList",
        title: "Список всех Рп команд",
        description: "Менеджмент всех созданных Рп команд",
        icon: <Icon28MessageUnreadOutline/>
    },
    {
        id: "creationPool_achiviments",
        title: "Создание ачивок",
        description: "Создание и модифицирование ачивок, получаемые за XP опыт",
        icon: <Icon28DonateCircleFillYellow/>
    }
];

export function CreationPool({ id, chatId, chatData }) {
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
            <CustomPanelHeader status="Добро пожаловать в кастомную мастерскую беседы!"/>
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
