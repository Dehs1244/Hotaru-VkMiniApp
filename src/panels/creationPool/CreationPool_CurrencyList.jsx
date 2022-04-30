import React, { Fragment, useState,} from "react";
import { Panel, Snackbar, Alert, Cell, Placeholder } from "@vkontakte/vkui";
import { Icon16Clear, Icon48Block } from '@vkontakte/icons';
import { sendBotPayload, useDatabaseProvider } from "../../hooks";
import { CustomPanelHeader } from "../../components";

export function CreationPollCurrencyList({ id, setPopoutElement }) {
    const [snackbar, setSnackbar ] = useState(null);
    const { chat: chatData } = useDatabaseProvider(); 

    const AlertRemoveValute = (index) => {
      setPopoutElement(
        <Alert
          actions={[{
            title: 'Отмена',
            autoclose: true,
          }, {
            title: 'Удалить',
            autoclose: true,
            action: () => RemoveValute(index),
          }]}
          actionsLayout="horizontal"
          onClose={() => setPopoutElement(null)}
          header="Удаление валюты"
          text="Вы уверены, что хотите удалить эту валюту?"
        />)
    }
  
    const RemoveValute = (index) => {
      let peerId = 2000000000 + chatData.id;
      sendBotPayload(peerId, `-рпвалюта ${chatData.customValutes[index].name}`);
      chatData.settings.roles.splice(index, 1);
      setSnackbar(<Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon16Clear />}
      >
        Валюта была удалена
      </Snackbar>);
    }

    if(chatData.customValutes.length < 1) return (
      <Panel id = {id}>
          <CustomPanelHeader status="Упс..."/>
          <Placeholder
            icon={<Icon48Block />}
          >
            В беседе нет каких-либо созданных валют... Но их можно создать!
          </Placeholder>
      </Panel>
  )

    return (
      <>
      <CustomPanelHeader status="Список всех валют" />
      <Panel id={id}>
        {
          chatData.customValutes.map((valute, index) => {
            return (
              <Fragment key={id}>
                <Cell key={valute.name} description={`Обладателей: ${Object.keys(valute.ownerUsers).length}`} removable onRemove={() => {
                  AlertRemoveValute(index)
                }}>{valute.name}</Cell>
              </Fragment>
            );
          })
        }
        {snackbar}
      </Panel>
      </>
    )
}
