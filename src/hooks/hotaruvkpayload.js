import VKBridge from "@vkontakte/vk-bridge";
import axios from "axios";
import { convertFileToBase64 } from "../functions";

export const sendBotPayload = async (peerId, text) => {
    var userId = (await VKBridge.send("VKWebAppGetUserInfo")).id;
    console.log("Отправлен запрос боту");
    VKBridge.send("VKWebAppSendPayload", {"group_id": 180480579, "payload": {"user_id": userId, "text": text, "peer_id": peerId, "attachment_base64": null}});
}

export const sendBotPayloadWithAttachment = async (peerId, text, attachmentBase64) => {
    var userId = (await VKBridge.send("VKWebAppGetUserInfo")).id;
    var photoUploadServer = await VKBridge.send("VKWebAppCallAPIMethod", {"method": "photos.getMessagesUploadServer", "request_id": "hotaruRequest", "params": {"group_id": 180480579, "v":"5.131", "access_token":"375ce2d067e46841d5c655cc65e80cc7b04f0fda46dd66549ee82a55601ce378d148fe4a7c6985da3bdaf" }});
    var uploadServer = photoUploadServer.response.upload_url;
    var responseData = null;
    const formData = new FormData();
    formData.append('photo', attachmentBase64);
    await axios.post(uploadServer, formData,
        {
            headers: {
                "Content-type": "image/jpeg"
            }                   
        }).then(function (response) {
        console.log(responseData);
        responseData = response;
      });
    console.log(responseData);
    var uploaded = await VKBridge.send("VKWebAppCallAPIMethod", {"method": "photos.saveMessagesPhoto", "request_id": "hotaruRequest", "params": {"photo": responseData.photo, "server": responseData.server, "hash": responseData.hash, "v":"5.131", "access_token":"375ce2d067e46841d5c655cc65e80cc7b04f0fda46dd66549ee82a55601ce378d148fe4a7c6985da3bdaf" }});
    console.log(uploaded);
    VKBridge.send("VKWebAppSendPayload", {"group_id": 180480579, "payload": {"user_id": userId, "text": text, "peer_id": peerId, "attachment_ownerId": uploaded.owner_id, "attachment_id": uploaded.id, "v":"5.131", "access_token":"375ce2d067e46841d5c655cc65e80cc7b04f0fda46dd66549ee82a55601ce378d148fe4a7c6985da3bdaf"}});
}