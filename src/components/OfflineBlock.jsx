import React from "react";

import { Button } from "@vkontakte/vkui";

import { Error } from "./Error";

export function OfflineBlock({ botDisabled, appBlockClass }) {
    return (
        <Error header="Ой..."
               action={
                   <Button size="l"
                           stretched
                           target="_blank"
                           mode="tertiary"
                           href="https://vk.com/hotarutyyan"
                   >
                       Группа
                   </Button>
               }
        >
            { botDisabled ?
            "Хотару Мейд-бот сейчас отключена, дождитесь включения бота и тогда мейд-приложение снова заработает."
            :
            appBlockClass != null ?
            appBlockClass.reason
            :
            "Возможно пропало подключение к серверу!"
}
            <br/>
            Эта вкладка будет доступна как появится соединение.
        </Error>
    );
}
