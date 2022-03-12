import React, { useState } from "react";
import { Alert } from "@vkontakte/vkui";

import { PopoutContext } from "../hooks/popoutContext";

export function PopoutProvider({ children }) {
    const [rootPopout, updatePopout] = useState(null);

    const invokeAlert = (alertActionsParameters, header, text, layout) => {
        updatePopout(
            <Alert
                actions={
                    alertActionsParameters.map(item => {
                        return {
                            title: item.title,
                            autoclose: item.autoClose,
                            action: item.action
                        }
                    })
                }
                actionsLayout={layout || "horizontal"}
                onClose={() => updatePopout(null)}
                header={header}
                text={text}
            />
        )
    }

    return (
        <PopoutContext.Provider value={{
            rootPopout,
            updatePopout,
            invokeAlert
        }}>
            {
                children
            }
        </PopoutContext.Provider>
    );
}