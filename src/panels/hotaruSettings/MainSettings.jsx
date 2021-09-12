import React, { useReducer, useState } from "react";
import { Panel, Radio, Checkbox, Group, Header, FormItem, Slider, InfoRow, Snackbar, Button } from "@vkontakte/vkui";
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { Icon16DoneCircle } from '@vkontakte/icons';

export function MainSettings({ id, chatData, chatId, setUserChatData }) {

  const [anonymRpPrice, setAnonymRpPrice] = useState(chatData.settings.costs.anonimRp);
  const [createRpPrice, setCreateRpPrice] = useState(chatData.settings.costs.rp);
  const [maxTimers, setMaxTimers] = useState(chatData.settings.maxTimers);
  const [wasChangedMaxTimers, setWasChangedMaxTimers] = useState(false);
  const [wasChangedAnonymRpPrice, setWasChangedAnonymRpPrice] = useState(false);
  const [wasChangedCreateRpPrice, setWasChangedCreateRpPrice] = useState(false);
  const [generation_mode, setGenerationMode] = useState(chatData.settings.textGeneration);

  const changedSettings = [];

  const [snackbar, setSnackbar] = useState(null);

  const convertValueToSettings = (value) => {
    var typeVariable = typeof value;
    if (typeVariable == "number") return value;
    return value == true ? "вкл" : "выкл";
  }

  const setMessageGenerationVersion = (mode) => {
    if (chatData.settings.textGeneration == mode) return;
    setGenerationMode(mode);
  }

  const OnDoneSettings = () => {
    let peerId = 2000000000 + chatId;

    if (chatData.settings.textGeneration != generation_mode) sendBotPayload(peerId, `!чн 11 ${generation_mode}`);
    if (IsNeedChangeSettings("messageGenerator")) sendBotPayload(peerId, `!чн 12 ${convertValueToSettings(chatData.settings.messageGenerator)}`);
    if (IsNeedChangeSettings("demotivatorGenerator")) sendBotPayload(peerId, `!чн 15 ${convertValueToSettings(chatData.settings.demotivatorGenerator)}`);
    if (IsNeedChangeSettings("risovachGenerator")) sendBotPayload(peerId, `!чн 14 ${convertValueToSettings(chatData.settings.risovachGenerator)}`);
    if (IsNeedChangeSettings("lobsterGenerator")) sendBotPayload(peerId, `!чн 13 ${convertValueToSettings(chatData.settings.lobsterGenerator)}`);
    if (IsNeedChangeSettings("easterEggs")) sendBotPayload(peerId, `!чн 18 ${convertValueToSettings(chatData.settings.easterEggs)}`);
    if (IsNeedChangeSettings("talkHotaruNeuron")) sendBotPayload(peerId, `!чн 17 ${convertValueToSettings(chatData.settings.talkHotaruNeuron)}`);
    if (IsNeedChangeSettings("viewWidget")) sendBotPayload(peerId, `!чн 16 ${convertValueToSettings(chatData.settings.viewWidget)}`);
    if (IsNeedChangeSettings("buttonsForbid")) sendBotPayload(peerId, `!чн 19 ${convertValueToSettings(chatData.settings.buttonsForbid)}`);
    if (wasChangedAnonymRpPrice) sendBotPayload(peerId, `!чн 9 ${convertValueToSettings(anonymRpPrice)}`);
    if (wasChangedMaxTimers) sendBotPayload(peerId, `!чн 10 ${convertValueToSettings(maxTimers)}`);

    changedSettings.splice(0, changedSettings.length);
    chatData.settings.textGeneration = generation_mode;
    setWasChangedAnonymRpPrice(false);
    setWasChangedCreateRpPrice(false);
    setWasChangedMaxTimers(false);
    setSnackbar(<Snackbar
      onClose={() => setSnackbar(null)}
      before={<Icon16DoneCircle />}
    >
      Настройки были применены!
    </Snackbar>);
  }

  const OnChangeSettings = (element) => {
    changedSettings.unshift(element);
  }

  const IsNeedChangeSettings = (settingId) => changedSettings.some((x) => x == settingId);

  return (
    <Panel id={id}>
      <CustomPanelHeader status="Основные настройки чата" />

      <FormItem top={<Header>Версия нейрогенератора</Header>}>
        <Radio name="radioGeneration" value="1" description="Обычный нейрогенератор" defaultChecked={chatData.settings.textGeneration == 1} onChange={() => setMessageGenerationVersion(1)}>
          Нейрогенератор V1
        </Radio>
        <Radio name="radioGeneration" value="1" description="Нейрогенератор, основанный полностью на нейронных сетях" defaultChecked={chatData.settings.textGeneration == 2} onChange={() => setMessageGenerationVersion(2)} disabled={!chatData.vip}>
          Нейрогенератор V2
        </Radio>
        <Radio name="radioGeneration" value="1" description="Нейрогенератор, который генерирует уникальные сообщения" defaultChecked={chatData.settings.textGeneration == 3} onChange={() => setMessageGenerationVersion(3)} disabled={!chatData.vip}>
          Нейрогенератор V3
        </Radio>
      </FormItem>

      <Group mode="plain" header={<Header>Нейрогенерации</Header>}>
        <Checkbox defaultChecked={chatData.settings.messageGenerator} onChange={(e) => {
          chatData.settings.messageGenerator = e.target.checked;
          OnChangeSettings("messageGenerator");
        }}>
          Нейрогенерация сообщений
        </Checkbox>
        <Checkbox defaultChecked={chatData.settings.demotivatorGenerator} onChange={(e) => {
          chatData.settings.demotivatorGenerator = e.target.checked;
          OnChangeSettings("demotivatorGenerator")
        }}>
          Нейрогенерация демотиваторов
        </Checkbox>
        <Checkbox defaultChecked={chatData.settings.risovachGenerator} onChange={(e) => {
          chatData.settings.risovachGenerator = e.target.checked;
          OnChangeSettings("risovachGenerator")
        }}>
          Нейрогенерация рисовача
        </Checkbox>
        <Checkbox defaultChecked={chatData.settings.lobsterGenerator} onChange={(e) => {
          chatData.settings.lobsterGenerator = e.target.checked;
          OnChangeSettings("lobsterGenerator")
        }}>
          Нейрогенерация лобстеров
        </Checkbox>
      </Group>

      <Group mode="plain" header={<Header>Цены</Header>}>
        <FormItem
          top="Цена аноним Рп команд в бронзовых картах"
        >
          <Slider
            step={1}
            min={0}
            max={100}
            value={Number(anonymRpPrice)}
            onChange={value2 => {
              setWasChangedAnonymRpPrice(true);
              setAnonymRpPrice(value2)
            }}
          />
          <InfoRow>
            {anonymRpPrice}
          </InfoRow>
        </FormItem>

        <FormItem
          top="Цена создания Рп команд в серебряных картах"
        >
          <Slider
            step={1}
            min={0}
            max={100}
            value={Number(createRpPrice)}
            onChange={value2 => {
              setWasChangedCreateRpPrice(true);
              setCreateRpPrice(value2);
            }}
          />
          <InfoRow>
            {createRpPrice}
          </InfoRow>
        </FormItem>
        <FormItem
          top="Максимальное кол-во таймеров в беседе"
        >
          <Slider
            step={1}
            min={1}
            max={6}
            value={Number(maxTimers)}
            onChange={value2 => {
              setWasChangedMaxTimers(true);
              setMaxTimers(value2)
            }}
          />
          <InfoRow>
            {maxTimers}
          </InfoRow>
        </FormItem>
      </Group>

      <Group mode="plain" header={<Header>Прочие настройки</Header>}>
        <Checkbox defaultChecked={chatData.settings.talkHotaruNeuron} onChange={(e) => {
          chatData.settings.talkHotaruNeuron = e.target.checked;
          OnChangeSettings("talkHotaruNeuron");
        }}>
          Модуль общения Хотару на нейронных сетях
        </Checkbox>
        <Checkbox defaultChecked={chatData.settings.easterEggs} onChange={(e) => {
          chatData.settings.easterEggs = e.target.checked
          OnChangeSettings("easterEggs")
        }}>
          Пасхалки
        </Checkbox>
        <Checkbox defaultChecked={chatData.settings.buttonsForbid} onChange={(e) => {
          chatData.settings.buttonsForbid = e.target.checked
          OnChangeSettings("buttonsForbid")
        }}>
          Защита кнопок
        </Checkbox>
        <Checkbox defaultChecked={chatData.settings.viewWidget} onChange={(e) => {
          chatData.settings.viewWidget = e.target.checked;
          OnChangeSettings("viewWidget")
        }}>
          Отображение в виджете
        </Checkbox>
      </Group>

      <Button mode="commerce" onClick={() => OnDoneSettings()}>Применить</Button>
      {snackbar}

    </Panel>
  )
}
