import React, { useEffect, useState } from "react";
import { PanelHeader, SplitCol, SplitLayout, ModalRoot, View, ViewWidth, platform, useAdaptivity } from "@vkontakte/vkui";
import { useRouter, useSwipeBack, useStructure } from "@unexp/router";
import { MashupNetPanel } from "./panels";

import { useAppearance } from "./hooks";

export function GlobalLayout({ setActiveGlobalPanel, userId, activeGlobalPanel }) {

    const { setPlatform } = useAppearance();
    const { viewWidth } = useAdaptivity();
    const { view, modal, panel } =  useStructure({ view: activeGlobalPanel, panel: activeGlobalPanel, popout: null });
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
                         </ModalRoot>
                     }
                     activeView={view}
                     popout={popout}
        >
            <SplitCol spaced={viewWidth > ViewWidth.MOBILE}
                      animate={viewWidth < ViewWidth.SMALL_TABLET}
            >
                <View id= {"mashupNet"}
                      activePanel={panel}
                      {...useSwipeBack()}
                >
                    <MashupNetPanel setActivePanel={setActiveGlobalPanel} userId={userId} id="mashupNet"/>
                </View>
            </SplitCol>
        </SplitLayout>
    );
}
