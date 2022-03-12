import React, { Fragment, useState, useReducer, useEffect, useRef } from "react";
import { Panel, SimpleCell, Group, InfoRow, Spacing, FormItem, Input, Header, CardGrid, Button, Card, File, Snackbar } from "@vkontakte/vkui";
import { Icon24Camera } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { Icon16DoneCircle } from '@vkontakte/icons';
import { sendBotPayloadWithAttachment, sendBotPayload } from "../../hooks";
import { EmojiPicker, unifiedToNative } from 'react-twemoji-picker';
import EmojiData from "react-twemoji-picker/data/twemoji.json";
import "react-twemoji-picker/dist/EmojiPicker.css"
import { convertFileToBase64 } from "../../functions";

export function CreationPoolAchievements({ id, chatId, chatData }) {
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

    const [ achivement_level, setAchivementLevel ] = useState(1);
    const [ achivement_name, setAchivementName ] = useState(null);
    const [attachmentBase64, setAttachmentBase64 ] = useState(null);

    const [snackbar, setSnackbar] = useState(null);

    const CreateRpCommand = () => {
        let peerId = 2000000000 + chatId;
        var text =  `+ачивка ${achivement_level}/${emojiSet}/${achivement_name}`;
        if(attachmentBase64 == null) sendBotPayload(peerId, text);
        else sendBotPayloadWithAttachment(peerId, text, attachmentBase64);
        console.log(text);
        setSnackbar(<Snackbar
            onClose = {() => setSnackbar(null)}
            before={<Icon16DoneCircle/>}
            >
           Ачивка была создана!
          </Snackbar>);
    }


    return (
        <Panel id={id}>
            <CustomPanelHeader status="Создаём кастомную ачивку для беседы"/>
            <Group  header={<Header>Основные параметры</Header>}>
            <FormItem top = "Уровень ачивки">
               <Input pattern="[0-9]*" onChange={(e) =>{
                   e.target.validity.valid ? setAchivementLevel(e.target.value) : setAchivementLevel(achivement_level);
                }}/>
            </FormItem>

            <FormItem top = "Название ачивки">
               <Input onChange={(e) =>{
                    setAchivementName(e.target.value);
                }}/>
            </FormItem>
            </Group>

            <Group  header={<Header>Дополнительные параметры</Header>}>
                <FormItem top="Загрузите вложение (фото)">
              <File before={<Icon24Camera />} controlSize="m" onChange={(e) => convertFileToBase64(e.target.files[0]).then(data => setAttachmentBase64(data))}
                     accept = "image/*">
                Прикрепить фото к ачивке
                </File>
                </FormItem>
                { attachmentBase64 != null &&
                  <CardGrid size="s">
                  <Card>
                    <img width="100%" height="100%" src={attachmentBase64} />
                 </Card>
                  </CardGrid>
                }
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
             <Button mode="secondary" disabled = {emojiSet == "" || achivement_name == "" ? true : false} onClick={() => CreateRpCommand()}>Создать ачивку</Button>
        {snackbar}
        </Panel>
    )
}
