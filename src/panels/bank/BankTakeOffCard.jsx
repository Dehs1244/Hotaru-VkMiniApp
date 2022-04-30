import { Group, Panel, FormItem, MiniInfoCell, Div, Checkbox, Input, FormStatus, Button } from "@vkontakte/vkui";
import React, { useState } from "react";
import { CustomPanelHeader } from "../../components";
import { IconMoney } from "../../icons";
import { currencyString } from "../../functions";
import { AlertActionsParameters, sendBotPayload, useAlert, useDatabaseProvider, useSpinnerState, useVkSnackbar } from "../../hooks";
import { useParams } from "@unexp/router";
import { Icon28PaymentCardOutline, Icon24CheckCircleFilledBlue } from "@vkontakte/icons";
import { GetPeerIdFromChatId } from "../../utils/hotaruServerApi";

export function BankTakeoffBalance({ id }) {
    const { user, chat, updateBaseUser } = useDatabaseProvider();
    const [cardNumber, setCardNumber] = useState(0);
    const [isSelf, setSelf] = useState(useParams().isSelf);
    const [userCard, setUserCard] = useState(useParams().cardUser);
    const [toTakeoffMoney, setTakeoffMoney] = useState(null);
    const [balanceCard, setBalanceCard] = useState(useParams().balance);
    const setAlert = useAlert();
    const snackbar = useVkSnackbar();
    const spinner = useSpinnerState(id, false);

    const TakeOffMoney = () => {
        if (balanceCard < toTakeoffMoney) {
            setAlert([new AlertActionsParameters("Понял...", true)], "Недостаточно средств", "На карте недостаточно средств");
            return;
        }
        if (!isSelf) setAlert([new AlertActionsParameters("Да", true, () => AccessTakeOff()), new AlertActionsParameters("Нет", true)], "Вы уверены в снятии средств?", "Проверьте все данные, ведь если карты не существуют, средства с карты просто пропадут и их нельзя будет вернуть");
        else setAlert([new AlertActionsParameters("Да", true, () => AccessTakeOff()), new AlertActionsParameters("Нет", true)], "Вы уверены в снятии средств?", "Снять средства $ с карты и вывести на свой счёт?");
    }

    const UpdateUser = () => {
        spinner.setText("Обновляем информацию о вас...")
        spinner.setSpinnerState(true);
        updateBaseUser(user.vkId, chat.id).onEnd(() => {
            spinner.setSpinnerState(false);
        })
    }

    const AccessTakeOff = () => {
        if (isSelf) {
            sendBotPayload(GetPeerIdFromChatId(chat.id), `-банк ${toTakeoffMoney}`)
            snackbar.invokeSnackbar("Деньги успешно сняты с карты", (<Icon24CheckCircleFilledBlue />));
        } else {
            sendBotPayload(GetPeerIdFromChatId(chat.id), `-банк ${toTakeoffMoney}\n${cardNumber}`)
            snackbar.invokeSnackbar("Деньги успешно сняты с карты и перечислены на другую", (<Icon24CheckCircleFilledBlue />));
        }
        setBalanceCard(balanceCard - toTakeoffMoney);
        UpdateUser();
    }

    const isBlockedFor = (value) => value == 0 || value == null || value == "";

    if (spinner.spinner) return spinner.spinnerRender;

    return (
        <Panel id={id}>
            <Group>
                <CustomPanelHeader status="Вывод средств" />
                {!isSelf && isBlockedFor(cardNumber) &&
                    <FormItem>
                        <FormStatus header="Неизвестный номер карты" mode="error">
                            Введите номер карты, на которую придут деньги или установите флажок «Перевод на свой счёт».
                        </FormStatus>
                    </FormItem>
                }
                {isBlockedFor(toTakeoffMoney) &&
                    <FormItem>
                        <FormStatus header="Ошибка с средствами" mode="error">
                            Введите кол-во $ для снятия.
                        </FormStatus>
                    </FormItem>
                }
                <FormItem top="Банковская карта для снятия средств">
                    <MiniInfoCell
                        before={<Icon28PaymentCardOutline />}
                    >
                        Баланс на карте: {currencyString(Number(balanceCard))}
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
                            setTakeoffMoney(e.target.value);
                            e.target.value += "$";
                            e.target.selectionStart--;
                            e.target.selectionEnd--;
                        }} placeholder="Средства для снятия ($)"></Input>
                    </Div>
                </FormItem>
                <Checkbox onChange={(e) => setSelf(e.target.checked)} defaultChecked={isSelf}>Перевод на свой счёт</Checkbox>
                <Div>
                    <Button disabled={(!isSelf || isBlockedFor(cardNumber)) && isBlockedFor(toTakeoffMoney)} mode="primary" size="m" onClick={() => TakeOffMoney()}>Перевести</Button>
                </Div>
            </Group>
            {snackbar.snackbar}
        </Panel>
    )
}