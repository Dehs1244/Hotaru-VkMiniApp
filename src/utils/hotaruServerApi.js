import axios from "axios";
import FormData from "form-data";
import { useLocalStorage } from "../hooks";

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

export const GetConverstationMembers = async (chatId, token) =>{
  var membersInfo = {};
  await axios.get(`https://blowoutbots.somee.com/api/hotaru/GetConverstationMembers?token=${token}&chatId=${chatId}`)
  .then((response) => {
    membersInfo = response.data.retrieve;
  });
  return membersInfo;
}

export const LoadHotaruMashupNet = async () => {
  var mashupNet = {};
  await axios.get(`https://blowoutbots.somee.com/api/hotaru/GetMashupNet`)
  .then((response) => {
    mashupNet = response.data;
  });
  return mashupNet;
}

export const VerifyTransfer = async (userId, chatId, payeeCardNumber, userCardNumber, money) => {
  var statusVerify = {};
  await axios.get(`https://blowoutbots.somee.com/api/hotaru/VerifyBankTransfer?userId=${userId}&chatId=${chatId}&payeeCardNumber=${payeeCardNumber}&userCardNumber=${userCardNumber}&transferMoney=${money}`)
  .then((response) => {
    statusVerify = response.data.retrieve;
  });
  return statusVerify;
}

export const GetPeerIdFromChatId = (chatId) => {
  return 2000000000 + chatId;
}
