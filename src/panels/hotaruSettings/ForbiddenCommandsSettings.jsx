import React, { useState } from "react";
import { Panel, FormItem, Header, Snackbar, Button, Group, InfoRow, ChipsInput } from "@vkontakte/vkui";
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { Icon16DoneCircle } from '@vkontakte/icons';
import { Icon16ErrorCircleFill } from '@vkontakte/icons';
import { IsHotaruCommand } from "../../utils/hotaruServerApi";
import { useEffect } from "react/cjs/react.development";

export function ForbiddenCommandsSettings({ id, chatData, chatId }) {
  const [snackbar, setSnackbar] = useState(null);

  const [addedCommands, setAddedCommands] = useState([]);
  const [ previousLenth, setPreviousLenth ] = useState(0);

  const OnChangeCommandSetting = async (value) => {
    if(value.length <= previousLenth){
       setAddedCommands(value);
       return;
    }
    var isCommand = await IsHotaruCommand(value.lastItem.label);
    console.log(isCommand);
    if (!isCommand) {
      setSnackbar(<Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon16ErrorCircleFill />}>
        Такой команды не существует!
      </Snackbar>);
      value.splice(value.length - 1, 1);
    } else {
      setAddedCommands(value.map((element) => element.label));
    }
  }

  useEffect(() => {
    setAddedCommands(chatData.settings.forbidCommands.map((element) => element.nameCommand));
    setPreviousLenth(addedCommands.length);
  }, [])


  const OnDoneSettings = () => {
    let peerId = 2000000000 + chatId;
    var accessedCommands = [];
    for(let forbiddenCommand of chatData.settings.forbidCommands){
      if(!addedCommands.some((element) => element == forbiddenCommand.nameCommand)) accessedCommands.push(forbiddenCommand.nameCommand);
    }

    for (let command of addedCommands) {
      if(!chatData.settings.forbidCommands.some((element) => element.nameCommand == command)){
        sendBotPayload(peerId, `+запрет ${command}`);
        chatData.settings.forbidCommands.push({ nameCommand: command})
      }
    }
    
    for (let command of accessedCommands) {
      sendBotPayload(peerId, `-запрет ${command}`);
      var indexCommand = chatData.settings.forbidCommands.indexOf((element) => element.nameCommand == command);
      if(indexCommand != -1) chatData.settings.forbidCommands.splice(indexCommand, 1);
    }
    setSnackbar(<Snackbar
      onClose={() => setSnackbar(null)}
      before={<Icon16DoneCircle />}
    >
      Настройки запретов команд применены!
    </Snackbar>);
  }

  return (
    <Panel id={id}>
      <CustomPanelHeader status="Настройки использования команд" />
      <Group mode="plain" header={<Header>Запрет команд</Header>}>

        <FormItem top="Запрещённые команды в беседе для обычных участников">
          <ChipsInput value={addedCommands.map((element, index) => { return ({ value: index, label: element }) })}
            onChange={OnChangeCommandSetting}/>
          <InfoRow>
            Всего запрещённых команд: {addedCommands.length}
          </InfoRow>
        </FormItem>
      </Group>
      <Button mode="commerce" onClick={() => OnDoneSettings()}>Применить</Button>
      {snackbar}

    </Panel>
  )
}
