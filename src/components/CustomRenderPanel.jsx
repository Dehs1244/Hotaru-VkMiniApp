import React, { Fragment, useEffect } from "react";
import { Avatar, Panel, PanelHeaderBack, PanelHeaderContent, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";
import { Icon28MoonOutline, Icon28SunOutline } from "@vkontakte/icons";
import { useRouter } from "@unexp/router";

import { IconHotaru } from "../icons";

import { useAppearance, useVkSnackbar } from "../hooks";
import { MainFooterInfo } from "./MainFooterInfo";

export function CustomRenderPanel({ PanelRender, id = PanelRender.props.children.props.id }) {

   // const snackbar = useVkSnackbar();

   console.log(PanelRender.props.children);

    return (
        <Panel id={PanelRender.props.children.id} {...PanelRender.props.children.props}>
            <Fragment>
            {PanelRender.props.children}
            </Fragment>
            <MainFooterInfo />
            
        </Panel>
    );
}
