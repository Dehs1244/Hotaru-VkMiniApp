import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";
import { Panel, Group, spinner } from "@vkontakte/vkui";

import { CustomPanelHeader, OfflineBlock, Spinner } from "../../components";

import { Form } from "./Form";
import { useDatabaseProvider } from "../../hooks";

export function UserProfile({ id, chatId, userId }) {


    const { user } = useDatabaseProvider();

    return (
            <Panel id={id}>
            <CustomPanelHeader status="Информация об игроке"/>
                <Form id = {id}
                userProfile = {user}/>
            </Panel>
            
    )
}
