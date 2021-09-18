import React, { useState, useRef } from "react";
import { Panel, FormItem, Header, Snackbar, Button, Group, InfoRow, Slider } from "@vkontakte/vkui";
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { Icon16DoneCircle } from '@vkontakte/icons';

export function LimitsSettings({ id, chatData, chatId }) {
  const [snackbar, setSnackbar] = useState(null);
  const changedSettings = useRef([]);


  const [talkCardsLimit, setTalkCardsLimit] = useState(chatData.settings.limits.takeTalkCards.limit);


  const transformSetting = (setting_id, value) => {
    if (changedSettings.current.some((element) => element.settingId == setting_id)) {
      var indexSetting = changedSettings.current.indexOf((element) => element.settingId == setting_id);
      changedSettings.current.splice(indexSetting, 1);
    } 
    changedSettings.current.push({ settingId: setting_id, value: value });
  }

  const convertValueToSettings = (value) => {
    var typeVariable = typeof value;
    if (typeVariable == "number") return value;
    return value == true ? "вкл" : "выкл";
  }

  const OnDoneSettings = () => {
    console.log(changedSettings.current);
    let peerId = 2000000000 + chatId;
    for (let setting of changedSettings.current) {
      console.log(setting);
     sendBotPayload(peerId, `!чн ${setting.settingId} ${convertValueToSettings(setting.value)}`);
    }
    changedSettings.current.splice(0, changedSettings.current.length);
    setSnackbar(<Snackbar
      onClose={() => setSnackbar(null)}
      before={<Icon16DoneCircle />}
    >
      Настройки лимитов применены!
    </Snackbar>);
  }

  return (
    <Panel id={id}>
      <CustomPanelHeader status="Настройки лимитов" />
      <Group mode="plain" header={<Header>Основные настройки</Header>}>

        <FormItem top="Максимальный сбор карт общения раз в 30 минут">
          <Slider
            step={1}
            min={1}
            max={10}
            value={Number(talkCardsLimit)}
            onChange={value2 => {
              transformSetting(24, value2);
              setTalkCardsLimit(value2);
            }}
          />
          <InfoRow>
            {talkCardsLimit}
          </InfoRow>
        </FormItem>
      </Group>
      <Button mode="commerce" onClick={() => OnDoneSettings()}>Применить</Button>
      {snackbar}

    </Panel>
  )
}
