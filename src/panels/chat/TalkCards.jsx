import React, { useState } from "react";
import { Panel, Group, FormItem, Header, Slider, InfoRow, Button, SimpleCell } from "@vkontakte/vkui";
import { Icon24Privacy } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { sendBotPayload, useDatabaseProvider, useVkSnackbar } from "../../hooks";
import { GetPeerIdFromChatId } from "../../utils/hotaruServerApi";
import { declOfNum } from "../../functions";

export function TalkCards({ id }) {

  const snackbar = useVkSnackbar();
  const [takeCards, setTakeCards] = useState(1);
  const { chat, user } = useDatabaseProvider();
  const [cards, SetTalkCards] = useState(chat.cards);

  const TakeCards = () => {
    sendBotPayload(GetPeerIdFromChatId(chat.id), `!забрать карту ${takeCards}`);
    snackbar.invokeSnackbar(`Вы взяли ${takeCards} ${declOfNum(takeCards, ["карту", "карты", "карт"])}"`, <Icon24Privacy />);
    SetTalkCards(cards - takeCards);
    chat.cards -= takeCards;

  }

  return (<Panel id={id}>
    <CustomPanelHeader status="Сбор карт общения" />
    <Group mode="plain" header={<Header>Карты общения беседы</Header>}>
      <SimpleCell disabled>
        Всего карт общения: {cards}
      </SimpleCell>
      <FormItem top="Кол-во собираемых карт">
        <Slider
          step={1}
          min={1}
          max={Math.min(Number(chat.settings.limits.takeTalkCards.limit), Number(cards))}
          value={Number(takeCards)}
          onChange={value2 => {
            setTakeCards(value2);
          }}
          disabled={cards < 1}
        />
        <InfoRow>
          {takeCards}
        </InfoRow>
      </FormItem>
    </Group>
    <Button mode="commerce" onClick={() => TakeCards()}>Применить</Button>
    {snackbar.snackbar}

  </Panel>)
}