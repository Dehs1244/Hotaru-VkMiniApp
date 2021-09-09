import React, { useEffect, useState } from "react";

import { Placeholder } from "@vkontakte/vkui";

import { IconHotaruErrorType1, IconHotaruErrorType2, IconHotaruErrorType3 } from "../icons";

import { randomInteger } from "../functions";

export function Error({ error, children, ...rest }) {
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        setIcon([<IconHotaruErrorType1/>, <IconHotaruErrorType2/>, <IconHotaruErrorType3/>][randomInteger(0, 2)]);
    }, []);

    return (
        <Placeholder icon={icon}
                     {...rest}
        >
            {
                error || children
            }
        </Placeholder>
    );
}
