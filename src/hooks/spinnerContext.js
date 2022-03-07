import React, { useState } from "react";
import { Panel } from "@vkontakte/vkui";
import { CustomPanelHeader, Spinner, MainFooterInfo } from "../components";

export const useSpinnerState = (id) => {
    const getSpinnerUi = (id) =>{
        return (<Panel id={id}>
            <CustomPanelHeader status={text}
                left={false}
            />
            <Spinner />
        </Panel>)
    }

    const [spinner, setSpinnerState] = useState(true);
    const [ text, setText ] = useState("");
    return { spinner: spinner, setSpinnerState: setSpinnerState, text: text, setText: setText, spinnerRender: getSpinnerUi(id) };
};
