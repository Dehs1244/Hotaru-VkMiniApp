import React, { Fragment, useState,} from "react";
import { Panel, Placeholder, Group, Snackbar, Cell, List } from "@vkontakte/vkui";
import { Icon16Clear, Icon48Block } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { sendBotPayload, useAlert, AlertActionsParameters } from "../../hooks";

export function CustomAchievementsList({ id, chatId, chatData }) {
    const [snackbar, setSnackbar ] = useState(null);
    const summonPopout = useAlert();

    const AlertRemoveAchievement = (index) => {
      summonPopout([new AlertActionsParameters("Отмена", true), new AlertActionsParameters("Удалить", true, () => RemoveAchievement(index))], "Удаление кастомной ачивки", "Вы уверены, что хотите удалить эту ачивку?");
    }

    const RemoveAchievement = (index) => {
        let peerId = 2000000000 + chatId;
        sendBotPayload(peerId, `-ачивка ${index + 1}`);
        chatData.achievements.splice(index, 1);
        setSnackbar(<Snackbar
            onClose = {() => setSnackbar(null)}
            before={<Icon16Clear/>}
            >
           Ачивка была удалена
          </Snackbar>);
    }

    if(chatData.achievements.length < 1) return (
        <Panel id = {id}>
            <CustomPanelHeader status="О нет..."/>
            <Placeholder
              icon={<Icon48Block />}
            >
              В беседе нет каких-либо созданных ачивок... Но их можно создать!
            </Placeholder>
        </Panel>
    )

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Список всех созданных ачивок"/>
            <Group mode="plain">
            <List>
                        {
                            chatData.achievements.map((item, index) => {
                                return (
                                    <Fragment key={id}>
                                            <Cell key={item} description = {`Уровень XP: ${item.xpLevel}`} removable onRemove={() => {
                                                AlertRemoveAchievement(index)
                                      }}>{item.smile} {item.name}</Cell>
                                    </Fragment>
                                );
                            })
                        }
            </List>
             </Group>
             {snackbar}
        </Panel>
    )
}
