import React, { useReducer, useState, useEffect } from "react";
import { Panel, FormItem, CustomSelectOption, Select, Snackbar, Div, Group, Avatar, Placeholder, Button } from "@vkontakte/vkui";
import VKBridge from "@vkontakte/vk-bridge";
import getArgs from "vkappsutils/dist/Args";
import { Icon48Block } from '@vkontakte/icons';
import { useRouter } from "@unexp/router";

import { CustomPanelHeader, Spinner } from "../../components";
import { sendBotPayload } from "../../hooks";
import FormData from "form-data"

export function SendAnonimRp({ id, chatId, chatData }) {
    const [anonim, setAnonim ] = useState('');
    const [mount, setMount] = useState(true);
    const [membersInfo, setMembersInfo] = useState(null);
    const { user_id, client } = getArgs();
    const [error, setError] = useState(null);
    const [choosenUser, setUserRp] = useState("");
    const [choosenRp, setChoosenRp] = useState("");
    const [snackbar, setSnackbar ] = useState(null);
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }

        return spinner;
    }, true);

    const SendRp = () =>{
        var text = `!ановнрп ${chatId}
${choosenRp} https://vk.com/id${choosenUser}`
        sendBotPayload(user_id, text)
        setSnackbar(<Snackbar
          onClose = {() => setSnackbar(null)}
          >
         Отправлено!
        </Snackbar>);
    }

    const GetAllConverstationMembers = async () => {
        let peerId = 2000000000 + chatId;
        var data = await VKBridge.send("VKWebAppCallAPIMethod", {"method": "messages.getConversationMembers", "request_id": "hotaruRequest", "params": {"peer_id": peerId, "v":"5.131", "access_token":"375ce2d067e46841d5c655cc65e80cc7b04f0fda46dd66549ee82a55601ce378d148fe4a7c6985da3bdaf"}});
        console.log(data);
        var memberIds = data.response.items.map(member => member.member_id);
        var usersData = await VKBridge.send("VKWebAppCallAPIMethod", {"method": "users.get", "request_id": "hotaruRequest", "params": {"user_ids": memberIds.join(","), "fields": "photo_50", "v":"5.131", "access_token":"375ce2d067e46841d5c655cc65e80cc7b04f0fda46dd66549ee82a55601ce378d148fe4a7c6985da3bdaf"}});
        console.log(usersData);
        setMembersInfo(usersData.response);
        setSpinner(false);
    }

    useEffect( async () => {
        setSpinner(true);
         await GetAllConverstationMembers();
         return () => setMount(false);
    }, []);

    if(chatData.rps.length < 1) return (
        <Panel id = {id}>
            <CustomPanelHeader status="О нет..."/>
            <Placeholder
              icon={<Icon48Block />}
            >
              В беседе нет каких-либо созданных рп команд... Но их можно создать!
            </Placeholder>
        </Panel>
    )

    return (
        <Panel id={id}>
            { !spinner ?
            <Group>
            <CustomPanelHeader status="Отправляем анонимную рп!"/>
         <FormItem top="Рп команда">
        <Select
        placeholder = "Не выбрана"
        value = {choosenRp}
          options={chatData.rps.map(rp => ({ label: `${rp.smile} ${rp.name}`, value:`${rp.name}` }))}
          renderOption={({ option, ...restProps }) => (
            <CustomSelectOption {...restProps} />
          )}
          onChange = {e => {
            setChoosenRp(e.currentTarget.value);
          }}
        />
      </FormItem>

      <FormItem top="Пользователь">
        <Select
        placeholder = "Не выбран"
          value={choosenUser}
          options={membersInfo.map(user => ({ label: `${user.first_name} ${user.last_name}`, value: `${user.id}`, avatar: user.photo_50 }))}
          renderOption={({ option, ...restProps }) => (
            <CustomSelectOption {...restProps} before={<Avatar size={24} src={option.avatar}/>}/>)}
            onChange = { value => setUserRp(value.currentTarget.value) }
        />
      </FormItem>

            <Div>
             <Button mode="commerce" onClick={() => SendRp()}>Отправить</Button>
            </Div>
            </Group>
            :
            <Group>
            <CustomPanelHeader status="Загружаем информацию о участниках..."/>
            <Spinner/>
            </Group>}
            {snackbar}
        </Panel>
    )
}
