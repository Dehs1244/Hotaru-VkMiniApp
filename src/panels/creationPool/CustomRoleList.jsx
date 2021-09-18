import React, { Fragment, useState,} from "react";
import { Panel, Snackbar, Alert, Cell, Placeholder } from "@vkontakte/vkui";
import { Icon16Clear, Icon48Block } from '@vkontakte/icons';
import { sendBotPayload } from "../../hooks";
import { CustomPanelHeader } from "../../components";

export function CustomRoleList({ id, chatId, chatData, setPopoutElement }) {
    const [snackbar, setSnackbar ] = useState(null);

    const AlertRemoveRole = (index) => {
      setPopoutElement(
        <Alert
          actions={[{
            title: 'Отмена',
            autoclose: true,
          }, {
            title: 'Удалить',
            autoclose: true,
            action: () => RemoveRole(index),
          }]}
          actionsLayout="horizontal"
          onClose={() => setPopoutElement(null)}
          header="Удаление роли"
          text="Вы уверены, что хотите удалить эту роль?"
        />)
    }
  
    const RemoveRole = (index) => {
      let peerId = 2000000000 + chatId;
      sendBotPayload(peerId, `-роль ${chatData.settings.roles[index].name}`);
      chatData.settings.roles.splice(index, 1);
      setSnackbar(<Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon16Clear />}
      >
        Роль была удалена
      </Snackbar>);
    }

    if(chatData.settings.roles.length < 1) return (
      <Panel id = {id}>
          <CustomPanelHeader status="Упс..."/>
          <Placeholder
            icon={<Icon48Block />}
          >
            В беседе нет каких-либо созданных ролей... Но их можно создать!
          </Placeholder>
      </Panel>
  )

    return (
      <>
      <CustomPanelHeader status="Список все ролей" />
      <Panel id="settings_roles_list">
        {
          chatData.settings.roles.map((role, index) => {
            return (
              <Fragment key={id}>
                <Cell key={role.name} description={`Разрешённых команд: ${role.allowCommands.length}`} removable onRemove={() => {
                  AlertRemoveRole(index)
                }}>{role.emoji} {role.name}</Cell>
              </Fragment>
            );
          })
        }
        {snackbar}
      </Panel>
      </>
    )
}
