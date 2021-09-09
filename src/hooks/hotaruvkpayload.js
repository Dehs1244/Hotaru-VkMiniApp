import VKBridge from "@vkontakte/vk-bridge";


export const sendBotPayload = async (peerId, text) => {
    var userId = (await VKBridge.send("VKWebAppGetUserInfo")).id;
    console.log("Отправлен запрос боту");
    VKBridge.send("VKWebAppSendPayload", {"group_id": 180480579, "payload": {"user_id": userId, "text": text, "peer_id": peerId}});
}