import VKBridge from "@vkontakte/vk-bridge";
import axios from "axios";
import { convertFileToBase64 } from "../functions";
import FormData from "form-data";

export const sendBotPayload = async (peerId, text) => {
    var userId = (await VKBridge.send("VKWebAppGetUserInfo")).id;
    console.log("Отправлен запрос боту");
    VKBridge.send("VKWebAppSendPayload", {"group_id": 180480579, "payload": {"user_id": userId, "text": text, "peer_id": peerId, "attachment_sessionId": -1}});
}

export const sendBotPayloadWithAttachment = async (peerId, text, attachmentBase64) => {
    var userId = (await VKBridge.send("VKWebAppGetUserInfo")).id;
    var responseDataUpload = null;
    const form_data = new FormData();
    form_data.append('fileBase64', attachmentBase64);
    form_data.append('userId', userId);

    await axios.post("https://blowoutbots.somee.com/api/hotaru/UploadFile64", {
      fileBase64: attachmentBase64,
      userId: userId
    })
    .then(function (response) {
        responseDataUpload = response;
        console.log(responseDataUpload);
      });
    VKBridge.send("VKWebAppSendPayload", {"group_id": 180480579, "payload": {"user_id": userId, "text": text, "peer_id": peerId, "attachment_sessionId": responseDataUpload.sessionId}});
}