import React, { createContext, useContext, ReactNode } from "react";
import { JSXElementConstructor } from "react";

export class AlertActionsParameters
{
    title: string;
    autoClose: Boolean;
    action: () => void;

    constructor(title : string, autoClose : Boolean, action : () => void){
        this.title = title;
        this.autoClose = autoClose;
        this.action = action;
    }
}

export const PopoutContext = createContext({
    rootPopout: <></>,
    updatePopout: (popout: ReactNode) => {}, 
    invokeAlert: (alertParameters : AlertActionsParameters[], header : string, text : string, layout = "horizontal") => {}
});


export function useAlert () : (alertParameters : AlertActionsParameters[], header : string, text : string, layout : string) => void
{
    let context = useContext(PopoutContext);
    return context.invokeAlert;
}

export function useRootPopout() : ([ReactNode, (popout: any) => void]) 
{
    let context = useContext(PopoutContext);
    return [context.rootPopout, context.updatePopout];
}
