import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "@unexp/router";
import { Panel, Group, FormItem, Header, Slider, InfoRow, Button } from "@vkontakte/vkui";
import { CustomPanelHeader } from "../../components";
import { useVkSnackbar } from "../../hooks";

export function TalkCards({ id, chatData }) {

    const snackbar = useVkSnackbar();
    const { takeCards, setTakeCards } = useState(1);



    return (<Panel id={id}>
      <CustomPanelHeader status="Сбор карт общения" />
      <Group mode="plain" header={<Header>Карты общения беседы</Header>}>

        <FormItem top="Кол-во собираемых карт">
          <Slider
            step={1}
            min={1}
            max={Number(chatData.limits.takeTalkCards.limit)}
            value={Number(takeCards)}
            onChange={value2 => {
              setTakeCards(value2);
            }}
          />
          <InfoRow>
            {takeCards}
          </InfoRow>
        </FormItem>
      </Group>
      <Button mode="commerce" onClick={() => OnDoneSettings()}>Применить</Button>
      {snackbar}

    </Panel>)
}