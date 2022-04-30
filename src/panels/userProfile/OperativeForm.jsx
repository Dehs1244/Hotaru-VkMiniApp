import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "@unexp/router";
import { Panel, Group, SimpleCell, Header, Div, Title, MiniInfoCell, CardGrid, Card, Button } from "@vkontakte/vkui";
import { CustomPanelHeader } from "../../components";
import { sendBotPayload, useDatabaseProvider, useVkSnackbar } from "../../hooks";
import { IconWeapon, IconAttention, IconSurvive, IconDurability } from "../../icons";
import { Icon28FavoriteCircleFillYellow, Icon28BrainOutline, Icon16Crown, Icon16Done } from '@vkontakte/icons';
export function OperativeForm({ id }) {

    const [operative, setOperative] = useState(useParams().operative);
    const [card, setCard] = useState(useParams().cardInfo);
    const [operativeIndex, setOperativeIndex] = useState(useParams().operIndx);
    const [isMainOper, setIsMainOper] = useState(operative.isMainOperative);
    const snackbar = useVkSnackbar();
    const { chat } = useDatabaseProvider();

    const setMainOper = () => {
        let peerId = 2000000000 + chat.id;
        operative.isMainOperative = true;
        setIsMainOper(true);
        sendBotPayload(peerId, "!оперосн " + operativeIndex + 1);
        snackbar.invokeSnackbar("Оперативник" + "\"" + operative.name + "\"" + " установлен как основной", (<Icon16Done/>));
    }


    return (
        <Panel id={id}>
            <CustomPanelHeader status="Информация о оперативнике" />
            <Div>
                <Title level="1" weight="semibold" style={{ marginBottom: 16 }}>
                    Это оперативник «{operative.name}»
                </Title>
            </Div>

            <CardGrid size="l">
                <Card>
                    <div style={{ background: "url('" + card.src + "')", backgroundSize: "102%", backgroundRepeat: "no-repeat", backgroundPosition: "90%", borderRadius: "5px", paddingBottom: "30%" }} />
                </Card>
            </CardGrid>

            <Group header={<Header mode="secondary">Характеристики</Header>}>
            <MiniInfoCell
            before={<Icon28FavoriteCircleFillYellow />}
          >
            Уровень: {operative.level}
          </MiniInfoCell>
          <MiniInfoCell
            before={<IconWeapon />}
          >
            Владение оружием: {operative.skills.weapon}
          </MiniInfoCell>
          <MiniInfoCell
            before={<Icon28BrainOutline />}
          >
            Интеллект: {operative.skills.intelligence}
          </MiniInfoCell>
          <MiniInfoCell
            before={<IconAttention />}
          >
            Внимательность: {operative.skills.observation}
          </MiniInfoCell>
          <MiniInfoCell
            before={<Icon16Crown width={28} height={28} />}
          >
            Лидерство: {operative.skills.leadership}
          </MiniInfoCell>

          <MiniInfoCell
            before={<IconDurability />}
          >
            Дисциплина: {operative.skills.durability}
          </MiniInfoCell>

          <MiniInfoCell
            before={<IconSurvive />}
          >
            Умение выживать: {Number(operative.skills.survivor).toFixed(2)}%
          </MiniInfoCell>
            </Group>

            <Div>
            <Button
              before={<IconWeapon/>}
              mode="secondary"
              stretched = {true}
              disabled={isMainOper}
              onClick={setMainOper}
              size="l"
            >
              Установить как основного оперативника
            </Button>
          </Div>
          {snackbar.snackbar}
        </Panel>

    )
}