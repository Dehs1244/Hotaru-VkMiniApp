import React, { useState, useEffect } from "react";
import { ModalPage, Spinner, useAdaptivity, ViewWidth, MiniInfoCell } from "@vkontakte/vkui";
import { useParams, useRouter } from "@unexp/router";
import { currencyString } from "../../functions";

import { HeightAnimation } from "../../animation";
import { IconMoney } from "../../icons";
import { FavoriteList, ModalHeader } from "../../components";
import { Icon28MoneyWadOutline } from '@vkontakte/icons';

export function MoneyPreview({ id }) {

    const { viewWidth } = useAdaptivity();
    const { back } = useRouter();

    const [spinner, setSpinner] = useState(false);
    const [ profile, setProfileInfo ] = useState(useParams().userProfile);

    const info = (
        <>
            <MiniInfoCell
            before={<IconMoney />}
          >
            Деньги: {currencyString(profile.balance)}
          </MiniInfoCell>
        </>
    );

    return (
        <ModalPage id={id}
                   header={
                       <ModalHeader>
                           Ваши денежные средства
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
