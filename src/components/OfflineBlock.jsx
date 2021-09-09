import React from "react";

import { Button } from "@vkontakte/vkui";

import { Error } from "./Error";

export function OfflineBlock() {
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
            Возможно пропало подключение к серверу!
            <br/>
            Эта вкладка будет доступна как появится соединение.
        </Error>
    );
}
