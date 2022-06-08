import React, { Fragment, useEffect } from "react";
import { CustomRenderPanel } from "./CustomRenderPanel";

export function CustomRenderPanels({ id, PanelsToRender }) {

    return PanelsToRender.map(item => {
        return (<Fragment key={item.props.children.id}><CustomRenderPanel id={item.props.children.props.id} PanelRender={item}/></Fragment>);
    })
}
