import React from "react";

import { IconSpinnerHotaru } from "../icons";

export function Spinner({ style, ...rest }) {

    const spinnerStyle = {
        marginTop: '10px',
      };

    return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", ...style }} {...rest}>
            <IconSpinnerHotaru style = {spinnerStyle}/>
        </div>
    );
}
