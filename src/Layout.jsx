import React, { Fragment, useEffect, useState } from "react";
import { PanelHeader, SplitCol, SplitLayout, ModalRoot, View, ViewWidth, platform, useAdaptivity, Alert } from "@vkontakte/vkui";
import { useRouter, useStructure, useSwipeBack } from "@unexp/router";

// Панели
import { Home, SendMessage, UserProfile, SettingsMenu, MainSettings, SendAnonimRp, CreationPool, CreationPoolRp, CustomRpList, CreationPoolAchivements, CustomAchivementsList, NotificationSettings } from "./panels";
// Модалки
import { CardsPreview, KeyCardPreview } from "./modals";
//

import { useAppearance } from "./hooks";

export function Layout({ chatId, chatData, userId, setUserChatData }) {

    const { setPlatform } = useAppearance();
    const { viewWidth } = useAdaptivity();
    const { view, modal, panel } = useStructure({ view: "home", panel: "home", popout: null });
    const { back } = useRouter();
    const [popout, setPopoutElement] = useState(null);


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
                             <CardsPreview id="userProfile-cards-preview"/>
                             <KeyCardPreview id="userProfile-passes-preview"/>
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
                    <Home id="home" chatId = {chatId} chatData = {chatData} setUserChatData = {setUserChatData}/>
                    <UserProfile id = "userInfoProfile" chatId = {chatId} userId = {userId}/>
                    <SendMessage id = "sendMessage" chatId = {chatId}/>
                    <SettingsMenu id = "settings" chatData = {chatData}/>
                    <SendAnonimRp id = "sendAnonimRp" chatId = {chatId} chatData = {chatData}/>
                    <MainSettings id="settings_main" chatData = {chatData} chatId = {chatId} setUserChatData = {setUserChatData}/>
                    <CreationPool id = "creationPool"/>
                    <CreationPoolRp id = "creationPool_rp" chatId = {chatId} chatData = {chatData}/>
                    <CustomRpList id = "creationPool_customRpList" chatId = {chatId} chatData = {chatData} setPopoutElement = {setPopoutElement}/>
                    <CreationPoolAchivements id = "creationPool_achivementsCreate" chatId = {chatId} chatData = {chatData} />
                    <CustomAchivementsList id="creationPoll_achivementsList" chatId = {chatId} chatData = {chatData} setPopoutElement = {setPopoutElement}/>
                    <NotificationSettings id="settings_notifications" chatData={chatData} chatId={chatId}/>
                </View>
            </SplitCol>
        </SplitLayout>
    );
}
