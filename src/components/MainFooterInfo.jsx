import React from "react";
import { Div, Footer } from "@vkontakte/vkui";
import { useVersionProvider } from "../hooks";

export function MainFooterInfo() {

    const { botVersion } = useVersionProvider();
    const { miniAppVersion } = useVersionProvider();

    return (
        <Div>
    <Footer>Версия мейд-приложения: v{miniAppVersion}</Footer>
    <Footer>Актуально для версии бота: v{botVersion}</Footer>
    </Div>
    );
}
