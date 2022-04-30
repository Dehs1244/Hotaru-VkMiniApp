import React, { useEffect } from "react";
import { PanelHeader, SplitCol, SplitLayout, ModalRoot, View, ViewWidth, platform, useAdaptivity } from "@vkontakte/vkui";
import { useRouter, useStructure, useSwipeBack } from "@unexp/router";
import * as panelIds from "./panelsId";
import * as modalsIds from "./modalsId";

// Панели
import * as Panels from "./panels";
// Модалки
import { CardsPreview, KeyCardPreview, ValutesPreview, MoneyPreview, ProjectInvestModal, BankCardsPreview } from "./modals";
//
import { useAppearance, useRootPopout } from "./hooks";

export function Layout({ chatId, chatData, userId, rootBack }) {

    const { setPlatform } = useAppearance();
    const { viewWidth } = useAdaptivity();
    const { view, modal, panel } =  useStructure({ view: "home", panel: "home" });
    const { back } = useRouter();
    const [popout, setPopoutElement] = useRootPopout();


    useEffect(() => {
        setPlatform(viewWidth === ViewWidth.DESKTOP ? "android" : platform());
    }, []);

    return (
        <SplitLayout header={
            viewWidth >= ViewWidth.SMALL_TABLET && <PanelHeader separator={false}/>
        }
                     modal={
                         <ModalRoot activeModal={modal}
                                    onClose={back}
                         >
                             <CardsPreview id={modalsIds.USER_PROFILE_CARDS_ID}/>
                             <KeyCardPreview id={modalsIds.USER_PROFILE_PASSES_ID}/>
                             <ValutesPreview id={modalsIds.USER_PROFILE_VALUTES_ID}/>
                             <MoneyPreview id={modalsIds.USER_PROFILE_MONEY_ID}/>
                             <ProjectInvestModal id={modalsIds.PROJECTS_INVEST_ID}/>
                             <BankCardsPreview id={modalsIds.USER_PROFILE_BANKS_ID}/>
                         </ModalRoot>
                     }
                     activeView={view}
                     popout={popout}
        >
            <SplitCol spaced={viewWidth > ViewWidth.MOBILE}
                      animate={viewWidth < ViewWidth.SMALL_TABLET}
            >
                <View id= {"home"}
                      activePanel={panel}
                      {...useSwipeBack()}
                >
                    <Panels.Home id={panelIds.HOME_ID} userId={userId} chatId = {chatId} chatData = {chatData} rootBack = {rootBack}/>
                    <Panels.UserProfile id = {panelIds.USER_PROFILE_ID} chatId = {chatId} userId = {userId}/>
                    <Panels.SendMessage id = {panelIds.SEND_MESSAGE_ID} chatId = {chatId}/>
                    <Panels.SettingsMenu id = {panelIds.SETTINGS_ID} chatData = {chatData}/>
                    <Panels.SendAnonymRp id = {panelIds.SEND_ANONIM_RP_ID} chatId = {chatId} chatData = {chatData}/>
                    <Panels.MainSettings id={panelIds.SETTINGS_MAIN_ID} chatData = {chatData} chatId = {chatId}/>
                    <Panels.CreationPool id = {panelIds.CREATION_POOL_ID}/>
                    <Panels.CreationPoolRp id = {panelIds.CREATION_POOL_RP_ID} chatId = {chatId} chatData = {chatData}/>
                    <Panels.CustomRpList id = {panelIds.CREATION_POOL_LISTRP_ID} chatId = {chatId} chatData = {chatData}/>
                    <Panels.CreationPoolAchievements id = {panelIds.CREATION_POOL_ACHIVEMENTS_ID} chatId = {chatId} chatData = {chatData} />
                    <Panels.CustomAchievementsList id={panelIds.CREATION_POOL_LISTACHIVEMENTS_ID} chatId = {chatId} chatData = {chatData} setPopoutElement = {setPopoutElement}/>
                    <Panels.NotificationSettings id={panelIds.SETTINGS_NOTIFICATIONS_ID} chatData={chatData} chatId={chatId}/>
                    <Panels.QuarantineZoneSettings id = {panelIds.SETTINGS_QUARANTINE_ZONE_ID} chatData = {chatData} chatId = {chatId}/>
                    <Panels.LimitsSettings id= {panelIds.SETTINGS_LIMIT_ID} chatData={chatData} chatId={chatId}/>
                    <Panels.ForbiddenCommandsSettings id= {panelIds.SETTINGS_FORBIDDEN_COMMANDS_ID} chatData={chatData} chatId={chatId}/>
                    <Panels.ChatModeSettings id= {panelIds.SETTINS_CHAT_MODE_ID} chatData={chatData} chatId={chatId} SetPopout={setPopoutElement}/>
                    <Panels.ExodusSettings id= {panelIds.SETTINGS_EXODUS_ID} chatId={chatId} chatData={chatData}/>
                    <Panels.RolesSettings id= {panelIds.SETTINGS_ROLE_ID} chatId={chatId} chatData={chatData} setPopoutElement={setPopoutElement} />
                    <Panels.CustomRoleAdd id={panelIds.SETTINGS_ROLES_ADD_ID} chatId={chatId} chatData={chatData}/>
                    <Panels.CustomRoleList id= {panelIds.SETTINGS_LISTROLES_ID} chatId={chatId} chatData={chatData} setPopoutElement={setPopoutElement}/>
                    <Panels.OperativeForm id={panelIds.USER_PROFILE_OPERATIVES_ID}/>
                    <Panels.WarPool id= {panelIds.WAR_POOL}/>
                    <Panels.Projects id= {panelIds.WAR_PROJECTS_ID} userId={userId} chatData={chatData}/>
                    <Panels.CreationPool_Currency id= {panelIds.CREATION_POOL_CUSTOM_CURRENCY_ID}/>
                    <Panels.TalkCards id= {panelIds.TALK_CARDS_ID}/>
                    <Panels.BankBuyCard id= {panelIds.BANK_BUY_CARD_ID}/>
                    <Panels.BankTakeoffBalance id={panelIds.BANK_TAKEOFF_CARD_ID}/>
                    <Panels.BankTransBalance id={panelIds.BANK_TRANS_CARD_ID}/>
                    <Panels.CreationPollCurrencyList id={panelIds.CREATION_POOL_CUSTOM_CURRENCY_LIST_ID}/>
                </View>
            </SplitCol>
        </SplitLayout>
    );
}
