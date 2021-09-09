import React, { useReducer, useState } from "react";
import { Panel, FormItem, Div, Button, Input } from "@vkontakte/vkui";

import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import FormData from "form-data"

export function SendMessage({ id, chatId }) {
    const [messageText, setTextMessage ] = useState('');

    const SendMessage = () =>{

        let peerId = 2000000000 + chatId;
        sendBotPayload(peerId, `!скажи ${messageText}`)
    }

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Отсылаем сообщение!"/>
            <FormItem
              top="Текст сообщения в беседу" 
              status={messageText == '' ? 'error' : 'valid'}
              bottom={messageText == '' ? 'Вы не ввели текст сообщения' : ''}
            >
                <Input
                onChange={(e) =>{
                    console.log(e);
                    setTextMessage(e.target.value);
                }}
              />
            </FormItem>

            <Div>
             <Button mode="commerce" onClick={() => SendMessage()}>Отправить</Button>
            </Div>
        </Panel>
    )
}
