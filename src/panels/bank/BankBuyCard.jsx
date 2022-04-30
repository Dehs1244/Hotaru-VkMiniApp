import React, { useState,  useMemo, useEffect } from "react";
import { Panel, FormItem, MiniInfoCell, NativeSelect, Div, Group, Placeholder, Button } from "@vkontakte/vkui";
import { Icon48Block } from '@vkontakte/icons';
import { CustomPanelHeader } from "../../components";
import { AlertActionsParameters, sendBotPayload, useAlert, useDatabaseProvider, useSpinnerState, useVkSnackbar } from "../../hooks";
import { bankCompanies } from "../../objects/bankCompaniesDescription";
import { currencyString } from "../../functions";
import { IconMoney } from "../../icons";
import * as hotaruApiServer from "../../utils/hotaruServerApi"
import { Icon16Like } from "@vkontakte/icons";

export function BankBuyCard({ id }) {
  const snackbar = useVkSnackbar();
  const setAlert = useAlert();
  const [bankCompany, setBankCompany] = useState(0);
  const bankCompaniesStored = useMemo(() => Object.values(bankCompanies), [bankCompanies])
  const { user, chat, updateBaseUser } = useDatabaseProvider();
  const spinnerState = useSpinnerState(id, false);

  const buyCard = () => {
    if (user.balance < 1000) return setAlert([new AlertActionsParameters("Ясно...", true)], "Недостаточно средств", `Чтобы открыть банковский счёт, нужно иметь на ваших руках как минимум ${currencyString(1000)} (У вас ${currencyString(user.balance)})`)
    setAlert([new AlertActionsParameters("Да", true, () => AgreeBuy()), new AlertActionsParameters("нет", true)], "Вы уверены?", `Вы уверены в открытии счёта банковской карты ${bankCompanies[bankCompany]}? Это будет стоить ${currencyString(1000)}`);
  }

  const AgreeBuy = () =>{
    sendBotPayload(hotaruApiServer.GetPeerIdFromChatId(chat.id), `+банк карта ${bankCompany + 1}`);
    snackbar.invokeSnackbar("Счёт открыт!", (<Icon16Like />));
    user.balance -= 1000;
    UpdateUser();
  }

  const UpdateUser = () =>{
    spinnerState.setText("Обновляем информацию о вас...")
    spinnerState.setSpinnerState(true);
    updateBaseUser(user.vkId, chat.id).onEnd(() =>{
      spinnerState.setSpinnerState(false);
    })
  }

  if (!user.bankCards.some(item => item.number < 1)) return (
    <Panel id={id}>
      <CustomPanelHeader status="Да вы банкир!" />
      <Placeholder
        icon={<Icon48Block />}
      >
        У вас уже заняты все ячейки банковских карт. Вы можете закрыть счёт одной из банковской карт и приобрести другую!
      </Placeholder>
    </Panel>
  )

  if(spinnerState.spinner) return spinnerState.spinnerRender;

  return (
    <Panel id={id}>
      <Group>
        <CustomPanelHeader status="Открываем счёт банковской карты" />
        <FormItem top="Ваша статистика">
          <MiniInfoCell
            before={<IconMoney />}
          >
            Баланс (на руках): {currencyString(user.balance)}
          </MiniInfoCell>
        </FormItem>
        <FormItem top="Компания">
          <NativeSelect onChange={value => setBankCompany(Number(value.target.value))}>
            {
              bankCompaniesStored.map((bank, index) => {
                return (
                  <>
                    <option value={index}>{bank}</option>
                  </>
                )
              })
            }
          </NativeSelect>
        </FormItem>
        <Div>
          <Button mode="primary" size="m" onClick={() => buyCard()}>Открыть счёт</Button>
        </Div>
      </Group>
      {snackbar.snackbar}
    </Panel>
  )
}
