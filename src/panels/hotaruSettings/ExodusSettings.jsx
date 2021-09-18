import React, { useState, useReducer, useMemo } from "react";
import { Panel, Group, Input, CellButton, Header, FormItem, Snackbar, Button, Separator } from "@vkontakte/vkui";
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { Icon16DoneCircle, Icon16ErrorCircleFill } from '@vkontakte/icons';
import * as blowoutApi from "../../utils/hotaruServerApi"; 
  const DUEL_EXODE_TYPE = 0;
  const CITY_EXODE_TYPE = 1;
  const CURE_EXODE_TYPE = 2;
  const PETITION_EXODE_TYPE = 3;


export function ExodusSettings({ id, chatData, chatId }) {
  const [snackbar, setSnackbar] = useState(null);

  const convertToExodeState = (value) =>{ return {command: value.commandPattern, previousState: value.commandPattern}};

  function reducerExode(state, action) {
    if(action.nextState == null) return {command: action.value, previousState: state.previousState};
    else return {command: action.value, previousState: action.nextState};
  }

  const checkForCommand = async (command) =>{
    var isCommand = await blowoutApi.IsHikkiCommand(command, chatId);
    if(!isCommand)
    {
      setSnackbar(<Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon16ErrorCircleFill />}>
        Такой команды в Хикки не существует!
      </Snackbar>)
    }
    return isCommand;
  }

  const duelIndex = useMemo(() => chatData.exodus.findIndex((element) => element.type == DUEL_EXODE_TYPE.toString()), [chatData.exodus])
  const cityIndex = useMemo(() => chatData.exodus.findIndex((element) => element.type == CITY_EXODE_TYPE.toString()), [chatData.exodus])
  const cureIndex = useMemo(() => chatData.exodus.findIndex((element) => element.type == CURE_EXODE_TYPE.toString()), [chatData.exodus])
  const petitionIndex = useMemo(() => chatData.exodus.findIndex((element) => element.type == PETITION_EXODE_TYPE.toString()), [chatData.exodus])

  const [duel_exode, duelDispatch] = useReducer(reducerExode, convertToExodeState(chatData.exodus[duelIndex]));
  const [city_exode, cityDispatch] = useReducer(reducerExode, convertToExodeState(chatData.exodus[cityIndex]));
  const [cure_exode, cureDispatch] = useReducer(reducerExode, convertToExodeState(chatData.exodus[cureIndex]));
  const [petition_exode, petitionDispatch] = useReducer(reducerExode, chatData.exodus[petitionIndex]);

  const OnDoneSettings = async (typeExode) => {
    let peerId = 2000000000 + chatId;
    let isSuccessful = true;
    switch(typeExode){
      case "duel":
        if(duel_exode.command != duel_exode.previousState)
        {

          if(duel_exode.command != null)
          {
            isSuccessful = await checkForCommand(duel_exode.command);
            if(isSuccessful) sendBotPayload(peerId, `+исход дуэль \n${duel_exode.command}`);
          }
          else sendBotPayload(peerId, `-исход дуэль`);
          duelDispatch({value: duel_exode.command, nextState: duel_exode.command});
          chatData.exodus[duelIndex] = { commandPattern: duel_exode.command, type: DUEL_EXODE_TYPE}
        }
        break;
      case "city":
        if(city_exode.command != city_exode.previousState)
        {
          if(city_exode.command != null)
          {
            isSuccessful = await checkForCommand(city_exode.command);
            if(isSuccessful) sendBotPayload(peerId, `+исход города \n${city_exode.command}`);
          }
          else sendBotPayload(peerId, `-исход города`);
          cityDispatch({value: city_exode.command, nextState: city_exode.command});
          chatData.exodus[cityIndex] = { commandPattern: city_exode.command, type: CITY_EXODE_TYPE}
        }
        break;
        case "cure":
        if(cure_exode.command != cure_exode.previousState)
        {
          if(cure_exode.command != null)
          {
            isSuccessful = await checkForCommand(cure_exode.command);
            if(isSuccessful) sendBotPayload(peerId, `+исход вакцина \n${city_exode.command}`);
          }
          else sendBotPayload(peerId, `-исход вакцина`);
          cureDispatch({value: cure_exode.command, nextState: cure_exode.command});
          chatData.exodus[cureIndex] = { commandPattern: cure_exode.command, type: CURE_EXODE_TYPE}
        }
        break;
        case "petition":
        if(petition_exode.command != petition_exode.previousState)
        {
          if(petition_exode.command != null)
          {
            isSuccessful = await checkForCommand(petition_exode.command);
            if(isSuccessful) sendBotPayload(peerId, `+исход петиции \n${petition_exode.command}`);
          }
          else sendBotPayload(peerId, `-исход петиции`);
          petitionDispatch({value: petition_exode.command, nextState: petition_exode.command});
          chatData.exodus[petitionIndex] = { commandPattern: petition_exode.command, type: PETITION_EXODE_TYPE}
        }
        break;
    }
    if(isSuccessful){
    setSnackbar(<Snackbar
      onClose={() => setSnackbar(null)}
      before={<Icon16DoneCircle />}
    >
      Настройки исхода применены!
    </Snackbar>);
    }
  }

  return (
    <Panel id={id}>
      <CustomPanelHeader status="Настройки оповещений" />
      <Group mode="plain" header={<Header>Настройки исходов</Header>}>

        {duel_exode.command == null || duel_exode.command == ""
          ? <CellButton onClick={() => duelDispatch({type:"duel", value: ""})}>Установить исход «проигрыша в дуэли»</CellButton>
          : <FormItem removable onRemove={() => duelDispatch({type:"duel", value: null})} top="Исход «проигрыша в дуэли»" bottom="• Если вы хотите убрать исход - очистите поле и уберите этот пункт. Чтобы применить исход - нажмите на кнопку «Применить»"><Input onChange = {(e) => duelDispatch({value: e.target.value})} value={duel_exode.command}/> </FormItem>
        }
        <FormItem>
        <Button mode="outline" onClick={() => OnDoneSettings("duel")}>Применить</Button>
        </FormItem>
        <Separator style={{ margin: '12px 0' }} />
        {city_exode.command == null || city_exode.command == ""
          ? <CellButton onClick={() => cityDispatch({type:"city", value: ""})}>Установить исход «проигрыша в города»</CellButton>
          : <FormItem removable onRemove={() => cityDispatch({type:"duel", value: null})} top="Исход «проигрыша в города»" bottom="• Если вы хотите убрать исход - очистите поле и уберите этот пункт. Чтобы применить исход - нажмите на кнопку «Применить»"><Input onChange = {(e) => cityDispatch({value: e.target.value})} value={city_exode.command}/> </FormItem>
        }
        <FormItem>
        <Button mode="outline" onClick={() => OnDoneSettings("city")}>Применить</Button>
        </FormItem>
          <Separator style={{ margin: '12px 0' }} />
        {cure_exode.command == null || cure_exode.command == ""
          ? <CellButton onClick={() => cureDispatch({type:"cure", value: ""})}>Установить исход «проигрыша в чат-игру Вакцина»</CellButton>
          : <FormItem removable onRemove={() => cureDispatch({type:"cure", value: null})} top="Исход «проигрыша в чат-игру Вакцина»" bottom="• Если вы хотите убрать исход - очистите поле и уберите этот пункт. Чтобы применить исход - нажмите на кнопку «Применить»"><Input onChange = {(e) => cureDispatch({value: e.target.value})} value={cure_exode.command}/> </FormItem>
        }
        <FormItem>
        <Button mode="outline" onClick={() => OnDoneSettings("cure")}>Применить</Button>
        </FormItem>
        <Separator style={{ margin: '12px 0' }} />
        {petition_exode.command == null || petition_exode.command == ""
          ? <CellButton onClick={() => petitionDispatch({type:"petition", value: ""})}>Установить исход «достижение максимального кол-ва подписей петиции»</CellButton>
          : <FormItem removable onRemove={() => petitionDispatch({type:"petition", value: null})} top="Исход «достижение максимального кол-ва подписей петиции»" bottom= {"• Если вы хотите убрать исход - очистите поле и уберите этот пункт. Чтобы применить исход - нажмите на кнопку «Применить»"}><Input onChange = {(e) => petitionDispatch({value: e.target.value})} value={petition_exode.command}/></FormItem>
        }
        <FormItem>
        <Button mode="outline" onClick={() => OnDoneSettings("petition")}>Применить</Button>
        </FormItem>
        <Separator style={{ margin: '12px 0' }} />
      </Group>
      {snackbar}

    </Panel>
  )
}
