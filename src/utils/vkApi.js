import VKBridge from "@vkontakte/vk-bridge";
import { useLocalStorage } from "../hooks";
import getArgs from "vkappsutils/dist/Args";

const API_VERSION = "5.131";

export async function vkCall(method, token, params)
{
    //const appArgs = getArgs();
    //if(appArgs.access_token_settings != null){
    //    //appArgs.access_token_settings = await VKBridge.send("VKWebAppGetAuthToken", {"app_id": Number(appArgs.app_id), "scope": "friends,status,wall"}).data.access_token;
    //}
    //console.log(await VKBridge.send("VKWebAppGetCommunityToken", {"app_id": Number(appArgs.app_id), "group_id": Number(appArgs.group_id), "scope": "messages"}));
    let modifyParams = {
        ...params,
        "v": API_VERSION,
        "access_token": token
    }
    let data = await VKBridge.send("VKWebAppCallAPIMethod", {"method": method, "request_id": "hotaruRequest", "params": modifyParams});
    console.log(data);
    return data.response;
}