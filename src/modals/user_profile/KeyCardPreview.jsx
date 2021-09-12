import React, { useState, useEffect } from "react";
import { ModalPage, Spinner, useAdaptivity, ViewWidth, MiniInfoCell, Placeholder } from "@vkontakte/vkui";
import { useParams, useRouter } from "@unexp/router";
import { Icon56BlockOutline } from '@vkontakte/icons';

import { HeightAnimation } from "../../animation";
import { IconKeysPassQuarantine, IconKeysPassTraining } from "../../icons";
import { FavoriteList, ModalHeader } from "../../components";

export function KeyCardPreview({ id }) {

    const { viewWidth } = useAdaptivity();
    const { back } = useRouter();

    const [spinner, setSpinner] = useState(false);
    const [ profile, setProfileInfo ] = useState(useParams().userProfile);

    useEffect(() => () =>{
    }, []);

    const info = (
        <>
        { profile.keyCardQuarantine == false && profile.keyCardTrainingField == false && 
        <Placeholder
        icon={<Icon56BlockOutline />}
      >
        К сожалению, у вас нет никаких пропусков...
      </Placeholder>
        }
        {
          profile.keyCardQuarantine &&
          <MiniInfoCell
          before={<IconKeysPassQuarantine />}
        >
          Пропуск «Карантинной зоны»
        </MiniInfoCell>
        }
        {
          profile.keyCardTrainingField &&
          <MiniInfoCell
          before={<IconKeysPassTraining />}
        >
          Пропуск «Тренировочного поля»
        </MiniInfoCell>
        }
        </>
    );

    return (
        <ModalPage id={id}
                   header={
                       <ModalHeader>
                           Ваши пропуски
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
