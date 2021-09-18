import React, { Fragment, useState,} from "react";
import { Panel, IconButton, Group, Snackbar, Alert, FormItem, InfoRow, ChipsInput, Input, Button, Spacing, SimpleCell, Header } from "@vkontakte/vkui";
import { Icon16Clear, Icon16ErrorCircleFill, Icon16DoneCircle } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { IsHotaruCommand } from "../../utils/hotaruServerApi";
import { EmojiPicker, unifiedToNative } from 'react-twemoji-picker';
import EmojiData from "react-twemoji-picker/data/twemoji.json";
import "react-twemoji-picker/dist/EmojiPicker.css"

export function CustomRoleAdd({ id, chatId, chatData }) {
    const [snackbar, setSnackbar ] = useState(null);
    const [addedCommands, setAddedCommands] = useState([]);
    const [ nameRole, setRoleName ] = useState(null);
    const [ smileRole, setSmileRole ] = useState(null);

    const OnAddCommand = async (value) => {
      if (value.length <= addedCommands.length) {
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
  
    const emojiData = Object.freeze(EmojiData);
  
      const handleEmojiSelect = (emoji) => {
          setSmileRole(unifiedToNative(emoji.unicode));
      }
  
    const OnDoneSettings = () => {
      let peerId = 2000000000 + chatId;
      var textCommand = "";
      var commands = [];
  
      for (let command of addedCommands) {
          textCommand += `${command} `;
          commands.push(command);
      }
  
      if(smileRole != null) sendBotPayload(peerId, `+роль ${nameRole} ${smileRole}\n${textCommand}`);
      else sendBotPayload(peerId, `+роль ${nameRole} \n${textCommand}`);
      chatData.settings.roles.push({ name: nameRole, allowCommands:commands, emoji: smileRole });
  
      setSnackbar(<Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon16DoneCircle />}
      >
        Роль была успешно создана!
      </Snackbar>);
    }

    return (
      <Panel id={id}>
         <CustomPanelHeader status="Создание роли" />
      <FormItem top="Название роли">
        <Input onChange ={(e) => setRoleName(e.target.value)} type="text" after={<IconButton hoverMode="opacity" aria-label="Очистить поле" onClick={() => setRoleName(null)}><Icon16Clear/></IconButton>} />
      </FormItem>
      <FormItem top="Команды, которые будут разрешены данной роли">
          <ChipsInput value={addedCommands.map((element, index) => { return ({ value: index, label: element }) })}
            onChange={OnAddCommand}/>
          <InfoRow>
            Внесите команды, которые сможет использовать эта роль как администратор.
          </InfoRow>
     </FormItem>
     <Group mode="plain" header = {<Header>Эмодзи</Header>}>
            <SimpleCell>
          <InfoRow header="Выбранное эмодзи">
            {smileRole}
          </InfoRow>
        </SimpleCell>
        <Spacing size={20} />
          <EmojiPicker theme = "dark" emojiData={emojiData}  onEmojiSelect ={handleEmojiSelect}/>
       </Group>
       <Button mode="secondary" disabled = {nameRole == "" || smileRole == "" || addedCommands.length < 1 ? true : false} onClick={() => OnDoneSettings()}>Создать роль</Button>
        {snackbar}
      </Panel>
    )
}
