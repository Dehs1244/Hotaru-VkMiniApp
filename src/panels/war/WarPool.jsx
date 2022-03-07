import React, { Fragment } from "react";
import { Panel, SimpleCell, Group } from "@vkontakte/vkui";
import { Icon28PlaneOutline } from '@vkontakte/icons';
import { Icon24EmployeeOutline } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { useRouter } from "@unexp/router";

const settingsPanel = [
    {
        id: "war_projects",
        title: "Проекты беседы",
        description: "Проекты по созданию глобальных орудий",
        icon: <Icon28PlaneOutline width={28} height={28}/>
    },
    {
        id: "war_tech",
        title: "Военная техника",
        description: "Информация о военных технологиях",
        icon: <Icon24EmployeeOutline width={28} height={28}/>
    }
];

export function WarPool({ id }) {
    const { push } = useRouter();

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Военная структура беседы"/>
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
