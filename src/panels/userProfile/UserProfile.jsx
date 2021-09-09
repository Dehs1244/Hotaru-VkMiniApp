import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";
import { Panel, Group, spinner } from "@vkontakte/vkui";

import { CustomPanelHeader, OfflineBlock, Spinner } from "../../components";

import { Form } from "./Form";

export function UserProfile({ id, chatId, userId }) {

    const [mount, setMount] = useState(true);
    const [error, setError] = useState(null);
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }
        return spinner;
    }, true);

    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser();
        return () => setMount(false);
    }, []);

    const getUser = () => {
        setSpinner(true);
        axios.get(`https://blowoutbots.somee.com/api/hotaru/GetUserProfileChat?chatId=${chatId}&userId=${userId}`)
            .then(({ data }) => {
                setUser(data);
                setSpinner(false);
            })
    };

    return (
           !spinner ?
            <Panel id={id}>
            <CustomPanelHeader status="Информация об игроке"/>
                <Form id = {id}
                userProfile = {user}/>
            </Panel>
            :
            <Panel id={id}>
            <CustomPanelHeader status="Идёт загрузка вашего профиля..."/>
            <Spinner/>
            </Panel>
            
    )
}
