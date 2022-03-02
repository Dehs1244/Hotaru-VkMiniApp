import React, { useReducer } from "react";
import { Snackbar } from "@vkontakte/vkui";

function snackbarReduce(state, action){
    if(action == null) return null;
    return (<Snackbar
    onClose = {() => action.dispatcher(null)}
    before={action.icon}
    >
   {action.text}
  </Snackbar>)
} 

export const useVkSnackbar = () => {
    const [snackbar, dispatchSnackbar] = useReducer(snackbarReduce, null);

    function setRawSnackbar(text, icon){
        dispatchSnackbar({text: text, icon: icon, dispatcher: dispatchSnackbar});
    }

    return { invokeSnackbar: setRawSnackbar, snackbar: snackbar };
}

