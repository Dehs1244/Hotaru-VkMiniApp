import React, { useState, useEffect } from "react";
import { ModalPage, Spinner, useAdaptivity, ViewWidth, MiniInfoCell, Placeholder, Button, Group, Header, SimpleCell, Div } from "@vkontakte/vkui";
import { useParams, useRouter } from "@unexp/router";
import { currencyString } from "../../functions";

import { HeightAnimation } from "../../animation";
import { FavoriteList, ModalHeader } from "../../components";
import { Icon20MoneyCircleOutline, Icon56MoneyTransferOutline, Icon16StarCircle, Icon20MoneyTransferCircleFillRed, Icon20VotestTransferCircleFillTurquoise } from '@vkontakte/icons';
import { sendBotPayload, useDatabaseProvider, useVkSnackbar } from "../../hooks";
import * as hotaruServerApi from "../../utils/hotaruServerApi"; 
import { bankCompanies } from "../../objects/bankCompaniesDescription";
import * as panelIds from "../../panelsId";


export function BankCardsPreview({ id }) {

    const { viewWidth } = useAdaptivity();

    const { back, push } = useRouter();
    const { user, chat } = useDatabaseProvider();
    const [ mainCardBank, setMainCard ] = useState(user.mainBankCard);

    const MakeMainCard = (index) =>{
        user.mainBankCard = index;
        setMainCard(index);
        sendBotPayload(hotaruServerApi.GetPeerIdFromChatId(chat.id), `!карта основа ${index + 1}`);
    }

    useEffect(() =>{

    }, [user.mainBankCard])

    const info = (
        user.bankCards.map((cardItem, index) => {
            if (cardItem.number < 1) return (
                <>
                    <Placeholder
                        icon={<Icon56MoneyTransferOutline />}
                        header="Вы можете купить карту"
                        action={<Button onClick={() => {
                            push({ panel: panelIds.BANK_BUY_CARD_ID, modal: null });
                        }} size="m">Купить банковскую карту</Button>}
                    >
                        Храните свои средства безопасно, вы можете приобрести банковскую карту любой компании
                    </Placeholder>
                </>
            )

            return (
                <>
                    <Group mode="card" header={<Header mode="secondary" subtitle={`Компания «${bankCompanies[cardItem.company]}»`} multiline>Банковская карта</Header>}>
                        {
                            mainCardBank == index &&
                            <SimpleCell disabled before={<Icon16StarCircle />}>
                                Основная банковская карта
                            </SimpleCell>
                        }
                        <MiniInfoCell
                            before={<Icon20MoneyCircleOutline />}
                        >
                            Баланс: {currencyString(cardItem.balance)}
                        </MiniInfoCell>
                        {
                            mainCardBank == index ?
                                <>
                                    <Div>
                                        <Button onClick={() => {
                            push({ panel: panelIds.BANK_TRANS_CARD_ID, modal: null, }, { cardUser: cardItem.number, isSelf: true });
                        }} mode="primary" stretched before={<Icon20MoneyTransferCircleFillRed />}>Перевести средства</Button>
                                    </Div>
                                    <Div>
                                        <Button onClick={() => push({panel:panelIds.BANK_TAKEOFF_CARD_ID, modal: null }, { balance: cardItem.balance, cardUser: cardItem.number, isSelf: true })} mode="secondary" stretched before={<Icon20VotestTransferCircleFillTurquoise />}>Вывести средства</Button>
                                    </Div>
                                </>
                                :
                                <Div>
                                    <Button onClick={() => MakeMainCard(index)} mode="commerce" stretched>Сделать карту основной</Button>
                                </Div>
                        }
                    </Group>
                </>
            )
        })
    );

    return (
        <ModalPage id={id}
            header={
                <ModalHeader>
                    Ваши банковские счета
                </ModalHeader>
            }
            onClose={back}
        >
            {
                viewWidth > ViewWidth.MOBILE ?
                    <HeightAnimation>
                        {
                            info
                        }
                    </HeightAnimation>
                    :
                    <div>
                        {
                            info
                        }
                    </div>
            }
        </ModalPage>
    );
}
