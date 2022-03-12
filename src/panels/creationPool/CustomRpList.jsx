import React, { Fragment, useState, useEffect } from "react";
import { Panel, Placeholder, Group, Snackbar, Cell, List } from "@vkontakte/vkui";
import { Icon16Clear, Icon48Block } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { AlertActionsParameters, sendBotPayload, useAlert } from "../../hooks";

export function CustomRpList({ id, chatId, chatData }) {
    const [mount, setMount] = useState(true);
    const [snackbar, setSnackbar ] = useState(null);
    const summonPopout = useAlert();

    useEffect(() => {
        return () => setMount(false);
    }, []);

    const AlertRemoveRpCommand = (index) => {
        summonPopout([new AlertActionsParameters("Отмена", true), new AlertActionsParameters("Удалить", true, () => RemoveRpCommand(index))], "Удаление кастомной Рп команды", "Вы уверены, что хотите удалить эту Рп команду?");
    }

    const RemoveRpCommand = (index) => {
        let peerId = 2000000000 + chatId;
        sendBotPayload(peerId, `-рп ${index + 1}`);
        chatData.rps.splice(index, 1);
        setSnackbar(<Snackbar
            onClose = {() => setSnackbar(null)}
            before={<Icon16Clear/>}
            >
           РП Команда была удалена
          </Snackbar>);
    }

    if(chatData.rps.length < 1) return (
        <Panel id = {id}>
            <CustomPanelHeader status="О нет..."/>
            <Placeholder
              icon={<Icon48Block />}
            >
              В беседе нет каких-либо созданных рп команд... Но их можно создать!
            </Placeholder>
        </Panel>
    )

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Список всех кастомных рп команд"/>
            <Group mode="plain">
            <List>
                        {
                            chatData.rps.map((item, index) => {
                                return (
                                    <Fragment key={id}>
                                            <Cell key={item} removable onRemove={() => {
                                                AlertRemoveRpCommand(index)
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
