import VKBridge from "@vkontakte/vk-bridge";

const VKTOKEN = "ab02842757dd19be25bd92bde264e6334fef9f1ec29464f1f2f0cc8d0c416845f778f902e4d58d8183255";
const API_VERSION = "5.131";

export async function vkCall(method, params)
{
    let modifyParams = {
        ...params,
        "v": API_VERSION,
        "access_token": VKTOKEN
    }
    let data = await VKBridge.send("VKWebAppCallAPIMethod", {"method": method, "request_id": "hotaruRequest", "params": modifyParams});
    console.log(data);
    return data.response;
}