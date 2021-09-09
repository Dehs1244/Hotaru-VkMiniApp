import React, { useReducer, useState } from "react";
import { Panel, Radio, Checkbox, Group, Header, FormItem, Slider, InfoRow } from "@vkontakte/vkui";
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";

export function MainSettings({ id, chatData }) {

  const [ anonimRpPrice, setAnonimRpPrice ] = useState(chatData.settings.costs.anonimRp);
  const [ createRpPrice, setCreateRpPrice ] = useState(chatData.settings.costs.rp);
  const [ maxTimers, setMaxTimers ] = useState(chatData.settings.maxTimers);

    return (
        <Panel id={id}>
        <CustomPanelHeader status="Основные настройки чата"/>

            <FormItem top={<Header>Версия нейрогенератора</Header>}>
            <Radio name="radioGeneration" value="1" description="Обычный нейрогенератор" defaultChecked = {chatData.settings.textGeneration == 1}>
              Нейрогенератор V1
            </Radio>
            <Radio name="radioGeneration" value="1" description="Нейрогенератор, основанный полностью на нейронных сетях" defaultChecked = {chatData.settings.textGeneration == 2} disabled = {!chatData.vip}>
              Нейрогенератор V2
            </Radio>
            <Radio name="radioGeneration" value="1" description="Нейрогенератор, который генерирует уникальные сообщения" defaultChecked = {chatData.settings.textGeneration == 3} disabled = {!chatData.vip}>
              Нейрогенератор V3
            </Radio>
            </FormItem>

            <Group mode="plain" header={<Header>Нейрогенерации</Header>}>
            <Checkbox defaultChecked = {chatData.settings.messageGenerator}>
              Нейрогенерация сообщений
            </Checkbox>
            <Checkbox defaultChecked = {chatData.settings.demotivatorGenerator}>
              Нейрогенерация демотиваторов
            </Checkbox>
            <Checkbox defaultChecked = {chatData.settings.demotivatorGenerator}>
              Нейрогенерация демотиваторов
            </Checkbox>
            <Checkbox defaultChecked = {chatData.settings.lobsterGenerator}>
              Нейрогенерация лобстеров
            </Checkbox>
            </Group>

            <Group mode="plain" header={<Header>Цены</Header>}>
            <FormItem
              top="Цена аноним Рп команд в бронзовых картах" 
            >
                <Slider
                  step={1}
                  min={0}
                  max={100}
                  value={Number(anonimRpPrice)}
                  onChange={value2 => setAnonimRpPrice(value2)}
                />
                <InfoRow>
            {anonimRpPrice}
          </InfoRow>
          </FormItem>

          <FormItem
              top="Цена создания Рп команд в серебряных картах" 
            >
                <Slider
                  step={1}
                  min={0}
                  max={100}
                  value={Number(createRpPrice)}
                  onChange={value2 => setCreateRpPrice(value2)}
                />
                <InfoRow>
            {createRpPrice}
          </InfoRow>
          </FormItem>
            <FormItem
              top="Максимальное кол-во таймеров в беседе" 
            >
                <Slider
                  step={1}
                  min={0}
                  max={6}
                  value={Number(maxTimers)}
                  onChange={value2 => setMaxTimers(value2)}
                />
                <InfoRow>
            {maxTimers}
          </InfoRow>
            </FormItem>
            </Group>

            <Group mode="plain" header={<Header>Прочие настройки</Header>}>
            <Checkbox defaultChecked = {chatData.settings.talkHotaruNeuron}>
               Модуль общения Хотару на нейронных сетях
            </Checkbox>
            <Checkbox defaultChecked = {chatData.settings.easterEggs}>
               Пасхалки
            </Checkbox>
            <Checkbox defaultChecked = {chatData.settings.buttonsForbid}>
               Защита кнопок
            </Checkbox>
            { chatData.Hikki != null ?
            <Checkbox defaultChecked = {chatData.settings.antiIgnore}>
              Антиигнор
            </Checkbox> : null
            }
            </Group>

        </Panel>
    )
}
