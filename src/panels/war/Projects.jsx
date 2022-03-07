import React, { useEffect, useState, Fragment } from "react"
import { Panel, Placeholder, Group, MiniInfoCell, Headline, FormItem, Button, Counter, Div, Slider, FormLayout } from "@vkontakte/vkui";
import { Icon20ArticleOutline, Icon20Cancel } from "@vkontakte/icons";
import { Icon20VotestTransferCircleFillTurquoise } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { useDatabaseProvider, useSpinnerState } from "../../hooks";
import { currencyString } from "../../functions";
import { sendBotPayload } from "../../hooks";
import axios from "axios";
import { useRouter } from "@unexp/router";

const descriptionTypes = {
    0: "Используется для атаки вражеских бесед, а так же используется во время применение ядерного оружия",
    1: "Мощное и поражающее оружие, которое наносит колоссальный урон беседе, появляется радиация, против которой нужно защищаться с помощью «Противогазов», а так же переводит её в режим «Пустоши», блокируя всю экономику",
    2: "Защита пользователей во время сброса «Ядерной бомбы», помогает пользователям переждать весь ущерб, который будет нанесён ядерным оружием",
    3: "Помогает сбить любые воздушные атаки, включая сброс ядерной бомбы",
    4: "Развед-группа полезна во время локальной войны, помогает получить информацию о всех аванпостах на военных точках, информацию о проектах и оружие",
    5: "Противогазы помогают защититься от радиации, применять следует если по беседу был нанесён урон ядерным оружием и вы не успели попасть в бункер",
    6: "Щит помогает немного защитить урон от военных очков во время локальной войны",
    7: "Аванпост нужен для атаки военной точки",
    8: "Завод помогает производить военные очки без участия оперативников и военных операций",
    9: "Техника помогает защитить клетку от нападения и наносит ответный урон противнику",
    10: "ВВС отражает атаку артобстрела, наносит колоссальный урон по военной точки или устраивает артобстрел на беседу",
    11: "Артобстрел указанной беседы, в этом случае может задеть одного пользователя из беседы, тот теряет финансы и карты"
};

export function Projects({ id }) {

    const { user: userData, chat: chatData } = useDatabaseProvider();

    const { push } = useRouter();

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Информация и инвестирование в проекты беседы" />
            {
                chatData.projects.map((project, index) => {
                    if (project.name == null) return (
                        <Group mode="plain">
                            <Placeholder
                                icon={<Icon20Cancel />}
                            >
                                Ячейка проекта свободна (открыть проект можно в беседе с помощью команды «!чат постройки»)
                            </Placeholder>
                        </Group>)
                    var canInvest = userData.balance - (project.cost - project.invested);
                    if (canInvest < 1) {
                        if (userData.balance > 0) canInvest = userData.balance;
                        else canInvest = 0;
                    }
                    return (
                        <Fragment key={`${id}_${index}`}>
                            <Group mode="plain">
                                <Div>
                                    <Headline weight="semibold" style={{ marginBottom: 16 }}>
                                        {project.name}
                                    </Headline>
                                    <MiniInfoCell
                                        before={<Icon20ArticleOutline />}
                                        textWrap="full"
                                        textLevel="primary"
                                    >
                                        {descriptionTypes[project.type]}
                                    </MiniInfoCell>
                                    <MiniInfoCell
                                        before={<Icon20VotestTransferCircleFillTurquoise />}
                                    >
                                        {currencyString(project.invested)}/{currencyString(project.cost)}
                                    </MiniInfoCell>
                                    <FormItem>
                                        <Button style={{ margin: "20px 0 0 0" }} onClick={() => push({ modal: "project-modal-invest" }, { projectIndex: index })} mode="commerce" size="m" disabled={canInvest < 1} after={<Counter>{currencyString(canInvest)}</Counter>}>
                                            Инвестировать
                                        </Button>
                                    </FormItem>
                                </Div>
                            </Group>
                        </Fragment>
                    );
                })
            }
        </Panel>
    )
}