import React from "react";
import { Avatar, PanelHeaderBack, PanelHeaderContent, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";
import { Icon28MoonOutline, Icon28SunOutline } from "@vkontakte/icons";
import { useRouter } from "@unexp/router";

import { IconHotaru } from "../icons";

import { useAppearance } from "../hooks";

export function CustomPanelHeader({ status, onBack = null, isback = true, left = true }) {

    const { back } = useRouter();
    const { scheme, toggleScheme } = useAppearance();

    const Back = (event) =>{
        if(onBack != null) onBack();
        if(isback) back();
    }

    return (
        <PanelHeader left={
            left && <PanelHeaderBack onClick={(e) => Back(e)}/>
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
