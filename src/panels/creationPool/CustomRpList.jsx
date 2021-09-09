import React, { Fragment, useState, useReducer, useEffect } from "react";
import { Panel, Placeholder, Group, Snackbar, Alert, Cell, List } from "@vkontakte/vkui";
import { Icon16Clear, Icon48Block } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { useRouter } from "@unexp/router";

export function CustomRpList({ id, chatId, chatData, setPopoutElement }) {
    const [mount, setMount] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar ] = useState(null);
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

    const OnClosePopout = () => setPopoutElement(null);

    const AlertRemoveRpCommand = (index) => {
        setPopoutElement(
            <Alert
            actions={[{
              title: 'Отмена',
              autoclose: true,
            }, {
              title: 'Удалить',
              autoclose: true,
              action: () => RemoveRpCommand(index),
            }]}
            actionsLayout="horizontal"
            onClose={OnClosePopout}
            header="Удаление кастомной Рп команды"
            text="Вы уверены, что хотите удалить эту Рп команду?"
          />)
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
