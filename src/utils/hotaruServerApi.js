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
