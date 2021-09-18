import React, { Fragment, useState } from "react";
import { Panel, Alert, FormItem, SliderSwitch, Spacing, Snackbar, Button, Placeholder } from "@vkontakte/vkui";
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { Icon16DoneCircle, Icon48Block } from '@vkontakte/icons';
import { PageText } from "../../components";
import * as utils from "../../functions";

export function ChatModeSettings({ id, chatData, chatId, SetPopout }) {

  const [snackbar, setSnackbar] = useState(null);
  const chatModes = [
    {
      name: "Игровой",
      value: "game_mode",
      descriptionMode: "Игровой режим включает в себя абсолютно все модули, которые существуют в Хотару. Этот режим позволяет выйти беседе на глобальный уровень и взаимодействовать с другими беседами. \n\n• Устанавливая этот режим, у вас не будет никаких ограничений на использование команд (их нет), а так же каких-либо ограничений в самих командах. \n• Включая этот режим, ваша беседа выходит на глобальный уровень во вселенной Хотару (т.е позволяет взаимодействовать вашей беседе с другими беседами и наоборот) \n• Советуем включать этот режим, игра в Хотару становится более интересной! \n• Все обновления тестируются на этом режиме \n• Больше вариантов получения чат-опыта"
    },
    {
      name: "Ламповый",
      value: "love_mode",
      descriptionMode: "Ламповый режим - стандартный режим Хотару, когда вы только добавляете её и активируете в беседе. Ламповый режим позволяет взаимодействовать с развлекательными функциями Хотару, так же доступны некоторые игровые модули, которые не связаны с глобальным уровнем. Этот режим очень полезен для тех бесед, которые не хотят участвовать в глобальных событиях Хотару. \n\n• Режим устанавливает ограничения на множество игровых модулей \n• Режим закрывает беседу, что не позволит другим беседам взаимодействовать с ней (и вы так же не сможете взаимодействовать с другими беседами) \n• В этом режиме так же можно получать чат-опыт, но уже другими способами (актив, XP опыт, ачивки и т.д) \n• Так же, эксклюзивно для этого режима: вы можете получать чат-опыт за использование ваших созданных Рп команд \n• Советуем ставить этот режим, только в случае если вы не хотите использовать игровые функции Хотару, а лишь развлекательные (демотиваторы, нейрогенераторы, обработки аудио, гифок и так далее, что может предложить Хотару)"
    }
  ]

  const [chatModeSetted, setChatMode] = useState(chatData.type);
  const [ lastChangeModeTime, setLastChangeModeType ] = useState(chatData.lastChangeModeTime);

  const onSetChatMode = (value) => {
    if(value == "game_mode") setChatMode(0);
    else setChatMode(1);
  }

  const OnCloseAlert = () => SetPopout(null);

  const AlertChangeMode = (index) => {
    console.log(new Date(lastChangeModeTime).addHours(48));
    console.log(utils.getUtcTime());
    SetPopout(
        <Alert
        actions={[{
          title: 'Нет',
          autoclose: true,
        }, {
          title: 'Да',
          autoclose: true,
          action: () => OnDoneSettings(index),
        }]}
        actionsLayout="horizontal"
        onClose={OnCloseAlert}
        header="Смена режима"
        text="Вы уверены, что хотите сменить режим в беседе?• Следующая смена режима будет доступна только через два дня!"
      />)
}

  const OnDoneSettings = () => {
    let peerId = 2000000000 + chatId;
    sendBotPayload(peerId, `!чн режим ${chatModeSetted + 1}`);
    chatData.type = chatModeSetted;
    setSnackbar(<Snackbar
      onClose={() => setSnackbar(null)}
      before={<Icon16DoneCircle />}
    >
      Режим беседы был успешно выбран!
    </Snackbar>);
  }

  var optionsDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  if(new Date(lastChangeModeTime).addHours(48) > utils.getUtcTime()){
    return(
      <Panel id={id}>
      <CustomPanelHeader status="Пипец!" />
      <Placeholder
              icon={<Icon48Block />}
            >
              Режим беседы был недавно сменён. Следующая смена режима будет доступна: {new Date(lastChangeModeTime).addHours(48).toLocaleDateString("ru", optionsDate)}
      </Placeholder>
      </Panel>
    )
  }

  return (
    <Panel id={id}>
      <CustomPanelHeader status="Выбор режима работы Хотару в беседе" />

      <FormItem top="Режим беседы">
          <SliderSwitch 
            options={chatModes}
            onSwitch={onSetChatMode}
            activeValue={chatModes[chatModeSetted].value}
          />
          <Spacing size={30}/>
          <PageText text={chatModes[chatModeSetted].descriptionMode}/>
        </FormItem>

      <Button mode="commerce" onClick={() => AlertChangeMode()} disabled={chatData.type == chatModeSetted}>Применить</Button>
      {snackbar}

    </Panel>
  )
}
