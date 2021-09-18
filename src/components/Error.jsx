import React, { Fragment, useEffect, useState } from "react";

import { Placeholder } from "@vkontakte/vkui";

import { IconHotaruErrorType1, IconHotaruErrorType2, IconHotaruErrorType3 } from "../icons";

import { randomInteger } from "../functions";

export function Error({ error, children, ...rest }) {
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        setIcon([<Fragment key="IconHotaru1"><IconHotaruErrorType1 /></Fragment>, 
        <Fragment key = "IconHotaru2"><IconHotaruErrorType2/></Fragment>, 
        <Fragment key="IconHotaru3"><IconHotaruErrorType3/></Fragment>][randomInteger(0, 2)]);
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
