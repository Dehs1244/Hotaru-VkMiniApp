import React, { useState, useEffect } from "react";
import { ModalPage, Spinner, useAdaptivity, ViewWidth, MiniInfoCell } from "@vkontakte/vkui";
import { useParams, useRouter } from "@unexp/router";

import { HeightAnimation } from "../../animation";
import { IconBronzCard, IconGoldCard, IconSilverCard, IconDupeCard } from "../../icons";
import { FavoriteList, ModalHeader } from "../../components";

export function CardsPreview({ id }) {

    const { viewWidth } = useAdaptivity();
    const { back } = useRouter();

    const [spinner, setSpinner] = useState(false);
    const [ profile, setProfileInfo ] = useState(useParams().userProfile);

    useEffect(() => () =>{
    }, []);

    const info = (
        <>
            <MiniInfoCell
            before={<IconBronzCard />}
          >
            Бронзовые карты: {profile.cardBronz}
          </MiniInfoCell>
          <MiniInfoCell
            before={<IconSilverCard />}
          >
            Серебряные карты: {profile.cardSilver}
          </MiniInfoCell>
          <MiniInfoCell
            before={<IconGoldCard />}
          >
            Золотые карты: {profile.cardGold}
          </MiniInfoCell>
          {
              profile.cardDup > 0 ?
              <MiniInfoCell
            before={<IconDupeCard />}
          >
            Дюп карты: {profile.cardDup}
          </MiniInfoCell>
              : null
          }
        </>
    );

    return (
        <ModalPage id={id}
                   header={
                       <ModalHeader>
                           Ваши карты
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
