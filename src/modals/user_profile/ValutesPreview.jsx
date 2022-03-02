import React, { useState, useEffect, useMemo } from "react";
import { ModalPage, Placeholder, useAdaptivity, ViewWidth, MiniInfoCell } from "@vkontakte/vkui";
import { useParams, useRouter } from "@unexp/router";

import { HeightAnimation } from "../../animation";
import { IconBillets, IconMetall, IconCases, IconSecretCases, IconStudyPoints, IconTokenCoins } from "../../icons";
import { FavoriteList, ModalHeader } from "../../components";
import { Icon56BlockOutline } from "@vkontakte/icons";

export function ValutesPreview({ id }) {

    const { viewWidth } = useAdaptivity();
    const { back } = useRouter();

    const [spinner, setSpinner] = useState(false);
    const [ profile, setProfileInfo ] = useState(useParams().userProfile);
    const information = [
      {
        name: "Билеты",
        icon: <IconBillets/>,
        value: profile.billets
      },
      {
        name: "Металл",
        icon: <IconMetall/>,
        value: profile.metall
      },
      {
        name: "Кейсы",
        icon: <IconCases/>,
        value: profile.cases
      },
      {
        name: "Секретные кейсы",
        icon: <IconSecretCases/>,
        value: profile.secretCases
      },
      {
        name: "Гены навыков",
        icon: <IconStudyPoints/>,
        value: profile.studyPoints
      },
      {
        name: "Токен-коины",
        icon: <IconTokenCoins/>,
        value: profile.tokenCoins
      }
    ]

    const accesedValutes = useMemo(() => information.filter((element) => element.value > 0), [profile]);

    const info = () => { 
      if(accesedValutes.length < 1) return (<Placeholder
        icon={<Icon56BlockOutline />}
      >
        К сожалению, у вас нет никаких других валют...
      </Placeholder>)
      else return accesedValutes.map((element) => {
        return(
            <>
              <MiniInfoCell
              before={element.icon}
            >
              {element.name}: {element.value}
            </MiniInfoCell>
          </>)
        })
    }

    return (
        <ModalPage id={id}
                   header={
                       <ModalHeader>
                           Ваши другие валюты
                       </ModalHeader>
                   }
                   onClose={back}
        >
            {
                viewWidth > ViewWidth.MOBILE ?
                    <HeightAnimation>
                        {
                            info()
                        }
                    </HeightAnimation>
                    :
                    <div>
                        {
                            info()
                        }
                    </div>
            }
        </ModalPage>
    );
}
