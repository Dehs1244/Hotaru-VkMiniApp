import React, { useEffect, useReducer, useState } from "react";
import { useRouter } from "@unexp/router";
import { Panel, Group, SimpleCell, Header, Div, Title } from "@vkontakte/vkui";

import { IconCards, IconKeysCarding } from "../../icons";

export function Form({ id, userProfile }) {
    const { push } = useRouter();

    return (
        <Panel id={id}>
                    <Group>
                        <Div>
                            <Title level="3" weight="bold">Профиль пользователя</Title>
                            <Title level="3" weight="semibold">{userProfile.prefix}</Title>
                        </Div>
                    </Group>
                <Group  header={<Header mode="secondary">Валюта</Header>}>
                <SimpleCell onClick={() => push({ modal: "userProfile-cards-preview" }, { userProfile})} expandable before={<IconCards/>}>Карты</SimpleCell>
                </Group>

                <Group  header={<Header mode="secondary">Другое</Header>}>
                <SimpleCell onClick={() => push({ modal: "userProfile-passes-preview" }, { userProfile})} expandable before={<IconKeysCarding/>}>Пропуски</SimpleCell>
                </Group>
        </Panel>
    )
}
