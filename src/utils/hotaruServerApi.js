import axios from "axios";
import FormData from "form-data";

export const IsHotaruCommand = async (text) =>{
  var isCommand = false;
  await axios.get(`https://blowoutbots.somee.com/api/hotaru/IsHotaruCommand?text=${text}`)
  .then((response) => {
    isCommand = response.data.IsCommand;
  })
  return isCommand;
}

export const IsHikkiCommand = async (text, chatId) =>{
  var isCommand = false;
  await axios.get(`https://blowoutbots.somee.com/api/hikki/IsHikkiCommand?text=${text}&chatId=${chatId}`)
  .then((response) => {
    isCommand = response.data.IsCommand;
  })
  return isCommand;
}

export const LoadHotaruMashupNet = async () => {
  var mashupNet = {};
  await axios.get(`https://blowoutbots.somee.com/api/hotaru/GetMashupNet`)
  .then((response) => {
    mashupNet = response.data;
  });
  return mashupNet;
}

export const GetPeerIdFromChatId = (chatId) => {
  return 2000000000 + chatId;
}
