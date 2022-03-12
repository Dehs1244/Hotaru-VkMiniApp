import React, { useReducer, useState, useEffect } from "react";
import { Panel, FormItem, CustomSelectOption, Select, Snackbar, Div, Group, Avatar, Placeholder, Button } from "@vkontakte/vkui";
import { VkApiCaller } from "../../utils";
import getArgs from "vkappsutils/dist/Args";
import { Icon48Block } from '@vkontakte/icons';
import { Icon16ErrorCircleFill, Icon16Like } from '@vkontakte/icons';
import { useRouter } from "@unexp/router";

import { CustomPanelHeader, Spinner } from "../../components";
import { sendBotPayload, useVkSnackbar } from "../../hooks";
import FormData from "form-data"

export function SendAnonymRp({ id, chatId, chatData }) {
    const [anonim, setAnonim ] = useState('');
    const [mount, setMount] = useState(true);
    const [membersInfo, setMembersInfo] = useState(null);
    const { user_id, client } = getArgs();
    const [error, setError] = useState(null);
    const [choosenUser, setUserRp] = useState("");
    const [choosenRp, setChoosenRp] = useState("");
    const snackbar = useVkSnackbar();
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }

        return spinner;
    }, true);

    const SendRp = () =>{
      if(choosenUser.length == 0) return snackbar.invokeSnackbar("Вы не указали пользователя", (<Icon16ErrorCircleFill />));
        var text = `!ановнрп ${chatId}
${choosenRp} https://vk.com/id${choosenUser}`
        sendBotPayload(user_id, text);
        snackbar.invokeSnackbar("Отправлено!", (<Icon16Like />));
    }

    const GetAllConverstationMembers = async () => {
        let peerId = 2000000000 + chatId;
        var data = await VkApiCaller.vkCall("messages.getConversationMembers", { "peer_id": peerId });
        var memberIds = data.items.map(member => member.member_id);
        var usersData = await VkApiCaller.vkCall("users.get", { "user_ids": memberIds.join(","), "fields": "photo_50" });
        setMembersInfo(usersData);
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
            {snackbar.snackbar}
        </Panel>
    )
}
