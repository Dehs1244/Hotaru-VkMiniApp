import React, { Fragment, useState, useReducer, useEffect } from "react";
import { Panel, SimpleCell, Group, InfoRow, Spacing, FormItem, Input, Header, Text, Button, Select, CustomSelectOption, Snackbar } from "@vkontakte/vkui";
import { Icon28Notification, Icon28PenKeyholeOutline, Icon28BookOutline, Icon28MessagesCircleFillYellow, Icon28LockOutline, Icon28StarsCircleFillViolet, Icon28GhostSimleOutline, Icon28AccessibilityOutline } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { Icon16DoneCircle } from '@vkontakte/icons';
import { sendBotPayload, useDatabaseProvider, useVkSnackbar } from "../../hooks";
import { useRouter } from "@unexp/router";
import { EmojiPicker, unifiedToNative } from 'react-twemoji-picker';
import EmojiData from "react-twemoji-picker/data/twemoji.json";
import "react-twemoji-picker/dist/EmojiPicker.css"

export function CreationPool_Currency({ id }) {
    const [mount, setMount] = useState(true);

    useEffect(() => {
        return () => setMount(false);
    }, []);

    const [ emojiSet, setEmojiInfo ] = useState("");
    const emojiData = Object.freeze(EmojiData);

    const { chat } = useDatabaseProvider();

    const handleEmojiSelect = (emoji) => {
        setEmojiInfo(unifiedToNative(emoji.unicode));
    }

    const [rpText, setCurrencyName] = useState("");

    const snackbarLocate = useVkSnackbar();

    const CreateRpCurrency = () => {
        let peerId = 2000000000 + chat.id;
        let text = "";
        if(emojiSet != "") text = `+рпвалюта ${rpText}${emojiSet}`
        else text = `+рпвалюта ${rpText}`
        sendBotPayload(peerId, text);
        snackbarLocate.invokeSnackbar("Рп валюта создана", (<Icon16DoneCircle/>))
    }
    
    return (
        <Panel id={id}>
            <CustomPanelHeader status="Создаём кастомную РП валюту"/>
            <Group  header={<Header>Основные параметры</Header>}>
            <FormItem top = "Название валюты">
               <Input onChange={(e) =>{
                    setCurrencyName(e.target.value);
                }}/>
            </FormItem>
            </Group>

            <Group mode="plain" header = {<Header>Эмодзи</Header>}>
            <SimpleCell>
          <InfoRow header="Выбранное эмодзи">
            {emojiSet}
          </InfoRow>
        </SimpleCell>
        <Spacing size={20} />
          <EmojiPicker theme = "dark" emojiData={emojiData}  onEmojiSelect ={handleEmojiSelect}/>
             </Group>
             <Button mode="secondary" disabled = {rpText == ""} onClick={() => CreateRpCurrency()}>Создать РП Валюту</Button>
        {snackbarLocate.snackbar}
        </Panel>
    )
}
