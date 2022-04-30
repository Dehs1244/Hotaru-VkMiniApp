import { Group, Panel, FormItem, MiniInfoCell, Button, Checkbox, Input, FormStatus, Textarea, Div } from "@vkontakte/vkui";
import React, { useState } from "react";
import { CustomPanelHeader } from "../../components";
import { IconMoney } from "../../icons";
import { currencyString } from "../../functions";
import { AlertActionsParameters, sendBotPayload, useAlert, useDatabaseProvider, useSpinnerState, useVkSnackbar } from "../../hooks";
import { useParams } from "@unexp/router";
import * as hotaruServerApi from "../../utils/hotaruServerApi";
import { Icon24DismissOverlay, Icon24CheckCircleFilledBlue } from "@vkontakte/icons";


export function BankTransBalance({ id }) {
    const { user, chat, updateBaseUser } = useDatabaseProvider();
    const [cardNumber, setCardNumber] = useState(0);
    const [isSelf, setSelf] = useState(useParams().isSelf);
    const [userCard, setUserCard] = useState(useParams().cardUser);
    const [toTransMoney, setTransMoney] = useState(null);
    const spinner = useSpinnerState(id, false);
    const setAlert = useAlert();
    const snackbar = useVkSnackbar();

    const isBlockedFor = (value) => value == 0 || value == null || value == "";

    const TransMoney = () => {
        if (user.balance < toTransMoney) {
            setAlert([new AlertActionsParameters("Понял...", true)], "Недостаточно средств", "На карте недостаточно средств");
            return;
        }
        if (!isSelf) setAlert([new AlertActionsParameters("Да", true, () => AccessTransfer()), new AlertActionsParameters("Нет", true)], "Вы уверены в зачислении средств?", "Проверьте все данные, ведь если карты не существуют, ваши зачисляемые деньги просто пропадут и их нельзя будет вернуть");
        else setAlert([new AlertActionsParameters("Да", true, () => AccessTransfer()), new AlertActionsParameters("Нет", true)], "Вы уверены в зачислении средств?", "Снять $Деньги и зачислить на свою карту?");
    }

    const UpdateUser = () => {
        spinner.setText("Обновляем информацию о вас...")
        spinner.setSpinnerState(true);
        updateBaseUser(user.vkId, chat.id).onEnd(() => {
            spinner.setSpinnerState(false);
        })
    }

    const AccessTransfer = async () => {
        if (!isSelf) {
            spinner.setText("Обрабатывается перевод...");
            spinner.setSpinnerState(true);
            var accessedResult = await hotaruServerApi.VerifyTransfer(user.vkId, chat.id, cardNumber, userCard, toTransMoney);
            spinner.setSpinnerState(false);
            if (accessedResult.error != undefined) {
                snackbar.invokeSnackbar("Такой карты не существует", (<Icon24DismissOverlay />));
                return;
            }
            if (!accessedResult.verify) {
                snackbar.invokeSnackbar("Перевод не прошёл, возможно недостаточно средств для оплаты комиссии", (<Icon24DismissOverlay />));
                return;
            }
            sendBotPayload(hotaruServerApi.GetPeerIdFromChatId(chat.id), `+банк ${toTransMoney}\n${cardNumber}`);
            snackbar.invokeSnackbar("Перевод прошёл успешно", (<Icon24CheckCircleFilledBlue />));
        } else {
            sendBotPayload(hotaruServerApi.GetPeerIdFromChatId(chat.id), `+банк ${toTransMoney}`);
            snackbar.invokeSnackbar("Деньги успешно зачислены на карту", (<Icon24CheckCircleFilledBlue />));
        }
        UpdateUser();
    }


    if (spinner.spinner) return spinner.spinnerRender;


    return (
        <Panel id={id}>
            <Group>
                <CustomPanelHeader status="Перевод баланса" />
                {!isSelf && (cardNumber == 0 || cardNumber == null) &&
                    <FormItem>
                        <FormStatus header="Неизвестный номер карты" mode="error">
                            Введите номер карты, на которую нужно перечислить средства или установите флажок «Перевод на свой счёт».
                        </FormStatus>
                    </FormItem>
                }
                <FormItem top="Ваша статистика">
                    <MiniInfoCell
                        before={<IconMoney />}
                    >
                        Баланс (на руках): {currencyString(user.balance)}
                    </MiniInfoCell>
                </FormItem>
                <FormItem top="Банковский перевод">
                    <Div>
                        <Input onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');
                            setCardNumber(e.target.value);
                        }} disabled={isSelf} placeholder="Номер карты"></Input>
                    </Div>
                    <Div>
                        <Input onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');
                            setTransMoney(e.target.value);
                            e.target.value += "$";
                            e.target.selectionStart--;
                            e.target.selectionEnd--;
                        }} placeholder="Средства для перевода ($)"></Input>
                    </Div>
                </FormItem>
                <Checkbox onChange={(e) => setSelf(e.target.checked)} defaultChecked={isSelf}>Перевод на свой счёт</Checkbox>
                <Div>
                    <Button disabled={(!isSelf || isBlockedFor(cardNumber)) && isBlockedFor(toTransMoney)} mode="primary" size="m" onClick={() => TransMoney()}>Перевести</Button>
                </Div>
            </Group>
            {snackbar.snackbar}
        </Panel>
    )
}