import React, { Fragment, useState, useReducer, useEffect } from "react";
import { Panel, SimpleCell, Group, InfoRow, Spacing, FormItem, Input, Header, Text, Button, Select, CustomSelectOption, Snackbar } from "@vkontakte/vkui";
import { Icon28Notification, Icon28PenKeyholeOutline, Icon28BookOutline, Icon28MessagesCircleFillYellow, Icon28LockOutline, Icon28StarsCircleFillViolet, Icon28GhostSimleOutline, Icon28AccessibilityOutline } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { Icon16DoneCircle } from '@vkontakte/icons';
import { sendBotPayload } from "../../hooks";
import { useRouter } from "@unexp/router";
import { EmojiPicker, unifiedToNative } from 'react-twemoji-picker';
import EmojiData from "react-twemoji-picker/data/twemoji.json";
import "react-twemoji-picker/dist/EmojiPicker.css"

export function CreationPoolRp({ id, chatId, chatData }) {
    const [mount, setMount] = useState(true);
    const [error, setError] = useState(null);
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }
        return spinner;
    }, true);

    useEffect(() => {
        return () => setMount(false);
    }, []);

    const [ emojiSet, setEmojiInfo ] = useState("");
    const emojiData = Object.freeze(EmojiData);

    const handleEmojiSelect = (emoji) => {
        setEmojiInfo(unifiedToNative(emoji.unicode));
    }

    const [rpText, setRpText] = useState("");
    const [resultRp, setResultRp] = useState("");
    const [femaleRpText, setFemaleRpText] = useState("а");
    const [ rpCase, setRpCase ] = useState("");

    const [snackbar, setSnackbar] = useState(null);

    const rpCases = [
        {
            label: "Именительный",
            value: "и"
        },
        {
            label: "Родительный",
            value: "р"
        },
        {
            label: "Творительный",
            value: "т"
        },
        {
            label: "Винительный",
            value: "в"
        },
        {
            label: "Дательный",
            value: "д"
        },
        {
            label: "Предложный",
            value: "п"
        }
    ]

    const CreateRpCommand = () => {
        let peerId = 2000000000 + chatId;
        var rpCaseCommand = rpCase != "" ? `/${rpCase}` : ``;
        var text = "";
        if(femaleRpText != "") text = `+рп ${rpText}(${femaleRpText})/${emojiSet}/${resultRp}${rpCaseCommand}`
        else text = `+рп ${rpText}/${emojiSet}/${resultRp}${rpCaseCommand}`
        sendBotPayload(peerId, text);
        console.log(text);
        setSnackbar(<Snackbar
            onClose = {() => setSnackbar(null)}
            before={<Icon16DoneCircle/>}
            >
           Рп команда была создана!
          </Snackbar>);
    }
    


    return (
        <Panel id={id}>
            <CustomPanelHeader status="Создаём кастомную РП команду"/>
            <Group  header={<Header>Основные параметры</Header>}>
            <FormItem top = "Текст команды">
               <Input onChange={(e) =>{
                    setRpText(e.target.value);
                }}/>
            </FormItem>
            <FormItem top = "Результат команды">
               <Input onChange={(e) =>{
                    setResultRp(e.target.value);
                }}/>
                <Spacing size={20} />
                <Text weight="semibold">
                Например: "Ударил"
                </Text>
            </FormItem>
            </Group>

            <Group header = {<Header>Остальные настройки</Header>}>
            <FormItem top="Падеж команды">
               <Select
            placeholder = "Не выбран"
            value = {rpCase}
          options={rpCases}
          renderOption={({ option, ...restProps }) => (
            <CustomSelectOption {...restProps} />
          )}
          onChange = {e => {
            setRpCase(e.currentTarget.value);
          }}
        />
        </FormItem>

            <FormItem top = "Склонение в женском роде">
               <Input defaultValue="а" onChange={(e) =>{
                    setFemaleRpText(e.target.value);
                }} />
                <InfoRow header="Будет выглядеть в женском роде">
                {resultRp + femaleRpText}
                </InfoRow>
                <Spacing size={20} />
                <Text weight="semibold">
                Поле можно оставить пустым, тогда будет одно склонение, которое указано в поле «Текст команды»
                </Text>
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
             <Button mode="secondary" disabled = {rpText == "" || emojiSet == "" || resultRp == "" ? true : false} onClick={() => CreateRpCommand()}>Создать РП команду</Button>
        {snackbar}
        </Panel>
    )
}
