import React, { Fragment, useEffect, useMemo } from "react";

import { Text } from "@vkontakte/vkui";


export function PageText({ text }) {

    const transformText = () => {
        return text.split(`\n`);
    }

    const correctTextsLine = useMemo(() => transformText(text), [text]);

    return (
        correctTextsLine.map((value, index) => { return (<Fragment key={`${index}_${value}`}><Text>{value}</Text></Fragment>) })
    );
}
