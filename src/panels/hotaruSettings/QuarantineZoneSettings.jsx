import React, { useState, useEffect, useRef } from "react";
import { Panel, FormItem, Header, Radio, Snackbar, Button, Group, InfoRow, Slider } from "@vkontakte/vkui";
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { Icon16DoneCircle } from '@vkontakte/icons';

export function QuarantineZoneSettings({ id, chatData, chatId }) {
  const [snackbar, setSnackbar] = useState(null);
  const changedSettings = useRef([]);


  const [timeAirDrop, setTimeAirdrop] = useState(chatData.settings.timeAirDrop);
  const [maxPlayers, setMaxPlayers] = useState(chatData.settings.maxPlayers);
  const [minimalTime, setMinimalTime] = useState(chatData.settings.minimalTime);

  useEffect(() => {
    console.log("loaded");
  }, [])


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
      Настройки карантинной зоны применены!
    </Snackbar>);
  }

  return (
    <Panel id={id}>
      <CustomPanelHeader status="Настройки карантинной зоны" />
      <FormItem top={<Header>Версия нейрогенератора</Header>}>
        <Radio name="radioTheme" value="1" description="Дефолтная тема карантинной зоны" defaultChecked={chatData.settings.quarantineTheme == 0} onChange={() => transformSetting(20, 1)}>
          Холод
        </Radio>
        <Radio name="radioTheme" value="1" description="Тема, вдохновлённая игрой «Boneworks»" defaultChecked={chatData.settings.quarantineTheme == 1} onChange={() => transformSetting(20, 2)}>
          AI Зона
        </Radio>
        <Radio name="radioTheme" value="1" description="Тема, основанная на сценарии зомби-вируса" defaultChecked={chatData.settings.quarantineTheme == 2} onChange={() => transformSetting(20, 3)}>
          Вирус
        </Radio>
        <Radio name="radioTheme" value="1" description="Тема, вдохновлённая игрой «Cyberpunk 2077» (баги идут в комплекте)" defaultChecked={chatData.settings.quarantineTheme == 3} onChange={() => transformSetting(20, 4)}>
          Киберпанк
        </Radio>
      </FormItem>


      <Group mode="plain" header={<Header>Остальные настройки</Header>}>

        <FormItem top="Время сброса гуманитарного груза">
          <Slider
            step={1}
            min={3}
            max={30}
            value={Number(timeAirDrop)}
            onChange={value2 => {
              transformSetting(21, value2);
              setTimeAirdrop(value2);
            }}
          />
          <InfoRow>
            {timeAirDrop}
          </InfoRow>
        </FormItem>

        <FormItem top="Максимальное кол-во игроков">
          <Slider
            step={1}
            min={5}
            max={10}
            value={Number(maxPlayers)}
            onChange={value2 => {
              transformSetting(22, value2);
              setMaxPlayers(value2);
            }}
          />
          <InfoRow>
            {maxPlayers}
          </InfoRow>
        </FormItem>

        <FormItem top="Минимальное время пребывания">
          <Slider
            step={1}
            min={5}
            max={10}
            value={Number(minimalTime)}
            onChange={value2 => {
              transformSetting(22, value2);
              setMinimalTime(value2);
            }}
          /><InfoRow>
            {minimalTime}
          </InfoRow>
        </FormItem>
      </Group>



      <Button mode="commerce" onClick={() => OnDoneSettings()}>Применить</Button>
      {snackbar}

    </Panel>
  )
}
