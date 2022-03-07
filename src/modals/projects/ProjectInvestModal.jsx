import React, { useState, useEffect } from "react";
import { ModalPage, FormLayout, useAdaptivity, ViewWidth, Slider, Button, FormItem, InfoRow } from "@vkontakte/vkui";
import { useParams, useRouter } from "@unexp/router";
import { sendBotPayload, useDatabaseProvider } from "../../hooks";

import { HeightAnimation } from "../../animation";
import { IconKeysPassQuarantine, IconKeysPassTraining } from "../../icons";
import { FavoriteList, ModalHeader } from "../../components";
import { Fragment } from "react/cjs/react.development";
import { currencyString } from "../../functions";

export function ProjectInvestModal({ id }) {

    const { viewWidth } = useAdaptivity();
    const { back } = useRouter();

    const { user: profile, chat: chatData } = useDatabaseProvider();
    const [ projectIndex, setProjectIndex ] = useState(useParams().projectIndex);
    const [ investBalance, setInvestBalance ] = useState(1);

    const investToProject = (projectIndex, count) =>{
        profile.balance -= count;
        let peerId = 2000000000 + chatData.id;
        let text = `+проект вложить ${count} ${projectIndex}`;
        sendBotPayload(peerId, text);
        back();
    }

    const info = (
        <Fragment key={"project_modal_key"}>
            <FormLayout>
        <FormItem top="Сресдтва">
          <Slider
            step={1}
            min={1}
            max={profile.balance}
            value={Number(investBalance)}
            onChange={value2 => {
              setInvestBalance(value2);
            }}
          />
          </FormItem>
          <FormItem>
          <InfoRow>
            {currencyString(investBalance)}
          </InfoRow>
          </FormItem>
          <FormItem>
            <Button size="l" mode="commerce" onClick={() => investToProject(projectIndex + 1, investBalance)}>Инвестировать</Button>
          </FormItem>
        </FormLayout>
        </Fragment>
    );

    return (
        <ModalPage id={id}
            header={
                <ModalHeader>
                    Инвестирование в проект
                </ModalHeader>
            }
            onClose={back}
        >
            {
                viewWidth > ViewWidth.MOBILE ?
                    <HeightAnimation>
                        {
                            info
                        }
                    </HeightAnimation>
                    :
                    <div>
                        {
                            info
                        }
                    </div>
            }
        </ModalPage>
    );
}
