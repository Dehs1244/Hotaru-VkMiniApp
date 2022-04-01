import VKBridge from "@vkontakte/vk-bridge";
import { useLocalStorage } from "../hooks";
import getArgs from "vkappsutils/dist/Args";

const VKTOKEN = "34f3582f5284fe66460c64221e2dd8dffd0aca2982bd09cbb4c9b8f4496436a5ff61cf2ef689389df5288";
const API_VERSION = "5.131";

export async function vkCall(method, params)
{
    //const appArgs = getArgs();
    //if(appArgs.access_token_settings != null){
    //    //appArgs.access_token_settings = await VKBridge.send("VKWebAppGetAuthToken", {"app_id": Number(appArgs.app_id), "scope": "friends,status,wall"}).data.access_token;
    //}
    //console.log(await VKBridge.send("VKWebAppGetCommunityToken", {"app_id": Number(appArgs.app_id), "group_id": Number(appArgs.group_id), "scope": "messages"}));
    let modifyParams = {
        ...params,
        "v": API_VERSION,
        "access_token": VKTOKEN
    }
    let data = await VKBridge.send("VKWebAppCallAPIMethod", {"method": method, "request_id": "hotaruRequest", "params": modifyParams});
    console.log(data);
    return data.response;
}