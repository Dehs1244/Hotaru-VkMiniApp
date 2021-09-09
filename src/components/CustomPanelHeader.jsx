import React from "react";
import { Avatar, PanelHeaderBack, PanelHeaderContent, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";
import { Icon28MoonOutline, Icon28SunOutline } from "@vkontakte/icons";
import { useRouter } from "@unexp/router";

import { IconHotaru } from "../icons";

import { useAppearance } from "../hooks";

export function CustomPanelHeader({ status, left = true }) {

    const { back } = useRouter();
    const { scheme, toggleScheme } = useAppearance();

    return (
        <PanelHeader left={
            left && <PanelHeaderBack onClick={back}/>
        }
                     right={
                         <PanelHeaderButton onClick={toggleScheme}>
                             {
                                 scheme === "bright_light" ?
                                     <Icon28MoonOutline/>
                                     :
                                     <Icon28SunOutline/>
                             }
                         </PanelHeaderButton>
                     }
        >
            <PanelHeaderContent status={status}
                                before={
                                    <Avatar id="hotaru-maid"
                                            size={36}
                                            shadow={false}
                                    >
                                        <IconHotaru/>
                                    </Avatar>
                                }
            >
                Хотару
            </PanelHeaderContent>
        </PanelHeader>
    );
}
