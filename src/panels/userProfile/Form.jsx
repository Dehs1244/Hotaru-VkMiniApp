import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "@unexp/router";
import { Panel, Group, SimpleCell, Header, Div, Title, Banner, Button, Headline } from "@vkontakte/vkui";

import { IconCards, IconKeysCarding } from "../../icons";
import { Icon28MoneyCircleOutline, Icon28BankOutline } from '@vkontakte/icons';
import operative1Image from "../../assets/imgs/operatives/operative_1.jpg"
import operative2Image from "../../assets/imgs/operatives/operative_2.png"
import { Icon28ZipOutline, Icon28PaymentCardOutline } from '@vkontakte/icons';
import * as panelIds from "../../panelsId";
import * as modalIds from "../../modalsId";

export function Form({ id, userProfile }) {
    const { push } = useRouter();
    const operatives = useMemo(() => userProfile.operatives.filter((element) => element != null), [userProfile]);

    const operative_images = [
        {
            position: "95%",
            src: operative1Image
        },
        {
            position: "50%",
            src: operative2Image
        }
    ]

    return (
        <Panel id={id}>
            <Group>
                <Div>
                    <Title level="3" weight="bold">Профиль пользователя</Title>
                    <Title level="1" weight="heavy">{userProfile.prefix}</Title>
                    <Headline weight="semibold" style={{ marginTop: 16 }}>
          Очки актива в беседе: {userProfile.mesg}
        </Headline>
                </Div>
            </Group>
            <Group header={<Header mode="secondary">Валюта</Header>}>
                <SimpleCell onClick={() => push({ modal: modalIds.USER_PROFILE_CARDS_ID }, { userProfile })} expandable before={<IconCards />}>Карты</SimpleCell>
                <SimpleCell onClick={() => push({ modal: modalIds.USER_PROFILE_MONEY_ID }, { userProfile })} expandable before={<Icon28ZipOutline />}>Денежные средства</SimpleCell>
            </Group>

            {
                operatives.length > 0 &&
                <Group header={<Header mode="secondary">Оперативники</Header>}>
                    {
                        operatives.map(({ name, isMainOperative }, index) => {
                            return (
                                <>
                            <Banner
                                mode="image"
                                header={name}
                                subheader= { isMainOperative ? "Основной оперативник" : ""}
                                background={
                                    <div
                                        style={{
                                            backgroundColor: "#708090",
                                            backgroundImage: "url('" + operative_images[index].src + "')",
                                            backgroundPosition: operative_images[index].position,
                                            backgroundSize: "102%",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    />
                                }
                                actions={<Button onClick = {() => push({ panel: panelIds.USER_PROFILE_OPERATIVES_ID}, { operative: operatives[index], operIndx: index, cardInfo: operative_images[index] })} mode="overlay_primary">Подробнее</Button>}
                            />
                            </>
                            )
                        })
                    }
                </Group>
            }

            <Group header={<Header mode="secondary">Экономика</Header>}>
                <SimpleCell onClick={() => push({ modal: modalIds.USER_PROFILE_CARDS_ID }, { userProfile })} expandable before={<Icon28BankOutline />}>Банк</SimpleCell>
                <SimpleCell onClick={() => push({ modal: modalIds.USER_PROFILE_BANKS_ID })} expandable before={<Icon28PaymentCardOutline />}>Банковские карты</SimpleCell>
            </Group>

            <Group header={<Header mode="secondary">Другое</Header>}>
                <SimpleCell onClick={() => push({ modal: modalIds.USER_PROFILE_VALUTES_ID }, { userProfile })} expandable before={<Icon28MoneyCircleOutline />}>Другая валюта</SimpleCell>
                <SimpleCell onClick={() => push({ modal: modalIds.USER_PROFILE_PASSES_ID }, { userProfile })} expandable before={<IconKeysCarding />}>Пропуски</SimpleCell>
            </Group>
        </Panel>
    )
}
