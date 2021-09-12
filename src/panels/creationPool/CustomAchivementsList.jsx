import React, { Fragment, useState, useReducer, useEffect } from "react";
import { Panel, Placeholder, Group, Snackbar, Alert, Cell, List } from "@vkontakte/vkui";
import { Icon16Clear, Icon48Block } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { useRouter } from "@unexp/router";

export function CustomAchivementsList({ id, chatId, chatData, setPopoutElement }) {
    const [mount, setMount] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar ] = useState(null);
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

    const AlertRemoveAchivement = (index) => {
        setPopoutElement(
            <Alert
            actions={[{
              title: 'Отмена',
              autoclose: true,
            }, {
              title: 'Удалить',
              autoclose: true,
              action: () => RemoveAchivement(index),
            }]}
            actionsLayout="horizontal"
            onClose={OnClosePopout}
            header="Удаление кастомной ачивки"
            text="Вы уверены, что хотите удалить эту ачивку?"
          />)
    }

    const RemoveAchivement = (index) => {
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
                                                AlertRemoveAchivement(index)
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
