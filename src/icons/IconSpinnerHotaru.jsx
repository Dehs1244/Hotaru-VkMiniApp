import React from "react";
import IconSpinner from "../assets/spinner/spinner-hotaru.gif"

export function IconSpinnerHotaru({ width = 340, height = 340, className = "" }) {
    return (
        <img src = {IconSpinner} width = {width} height = {height}/>
    );
}
