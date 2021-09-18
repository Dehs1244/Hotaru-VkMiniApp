import React, { Fragment, useRef, useState } from "react";
import { Panel, Group, Card, SimpleCell, Header, Switch, Snackbar, Button, Spacing } from "@vkontakte/vkui";
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { Icon16DoneCircle } from '@vkontakte/icons';

export function NotificationSettings({ id, chatData, chatId }) {
  const [snackbar, setSnackbar] = useState(null);
  const blockedNotifications = useRef([]);
  const unblockedNotifications = useRef([]);

  const notifications = [
    {
      id: 0,
      name: "Получение ачивок",
      description: "Оповещение о получении ачивки пользователя, который достиг уровня этой ачивки"
    },
    {
      id: 1,
      name: "Победа глобальной войны",
      description: "Оповещает о победе одной из армии в модуле «Глобальная война»"
    },
    {
      id: 2,
      name: "Окончание захвата",
      description: "Оповещает конец захвата беседы, которую вы захватили в ходе войны (или другим способом)"
    },
    {
      id: 3,
      name: "Сообщения от вражеского чата",
      description: "Сообщение от вражеского чата во время локальной войны. Разрешая такое оповещение, вражеская беседа должна так же включить это оповещение, для отправки сообщений."
    },
    {
      id: 4,
      name: "Сообщения от союзников",
      description: "Сообщение от союзного чата во время локальной войны. Аналог сообщений от вражеского чата, только сообщения вы будете получать от союзной беседы."
    },
    {
      id: 5,
      name: "Получение карт общения",
      description: "Карты общения, которые вы зарабатываете в ходе актива беседы. Хотару может сообщать о получении таких карт."
    },
    {
      id: 6,
      name: "Возможность атаки беседы",
      description: "Оповещение о возможности атаки вражеской беседы, во время локальной войны."
    }
  ]

  const OnDoneSettings = () => {
    let peerId = 2000000000 + chatId;
    for (let notification of blockedNotifications.current) {
      sendBotPayload(peerId, `!оповещение ${notification + 1} выкл`);
      chatData.settings.blockedPushesId.push(notification);
    }
    for (let notification of unblockedNotifications.current) {
      sendBotPayload(peerId, `!оповещение ${notification + 1} вкл`);
      var indexNotification = chatData.settings.blockedPushesId.indexOf(notification);
      if(indexNotification != -1) chatData.settings.blockedPushesId.splice(indexNotification, 1);
    }

    blockedNotifications.current.splice(0, blockedNotifications.current.length);
    unblockedNotifications.current.splice(0, unblockedNotifications.current.length);
    setSnackbar(<Snackbar
      onClose={() => setSnackbar(null)}
      before={<Icon16DoneCircle />}
    >
      Настройки оповещений применены!
    </Snackbar>);
  }

  const OnChangeSettings = (notification_id) => {
    if (blockedNotifications.current.some((element) => element == notification_id) || !IsPushesAllowed(notification_id)) {
      blockedNotifications.current.splice(blockedNotifications.current.indexOf(notification_id), 1);
      unblockedNotifications.current.push(notification_id);
    } else {
      var indexOfUnblock = unblockedNotifications.current.indexOf(notification_id);
      if (indexOfUnblock != -1) unblockedNotifications.current.splice(indexOfUnblock, 1);
      blockedNotifications.current.push(notification_id);
    }
  }

  const IsPushesAllowed = (notification) => !chatData.settings.blockedPushesId.some((element) => element == notification);

  return (
    <Panel id={id}>
      <CustomPanelHeader status="Настройки оповещений" />
      <Group mode="plain" header={<Header>Оповещения в беседу</Header>}>
        {notifications.map((notification, index) => {
          return (
            <Fragment key={index + 1}>
              <Card>
                <SimpleCell onClick={() => OnChangeSettings(notification.id)}
                  size="m"
                  disabled={true}
                  multiline
                  description={notification.description}
                  after={<Switch onClick={() => OnChangeSettings(notification.id)} defaultChecked={IsPushesAllowed(notification.id)} />}
                >
                  {
                    notification.name
                  }
                </SimpleCell>
              </Card>
              <Spacing size={5} />
            </Fragment>
          );
        })}
      </Group>

      <Button mode="commerce" onClick={() => OnDoneSettings()}>Применить</Button>
      {snackbar}

    </Panel>
  )
}
