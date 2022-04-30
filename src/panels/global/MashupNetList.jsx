import React, { useState, useEffect, useReducer, Fragment } from "react";
import { Panel, Separator, Div, Title, Spacing, Snackbar, Button, Avatar, SimpleCell, Group } from "@vkontakte/vkui";
import { CustomPanelHeader } from "../../components";
import * as serverApi from "../../utils/hotaruServerApi";
import { VkApiCaller } from "../../utils";
import { Icon20LikeCircleFillRed, Icon20Like, Icon28PodcastCircleFillRed, Icon28ThumbsUpOutline } from '@vkontakte/icons';
import { Spinner } from "../../components";
import * as utils from "../../functions";
import { IconPlay } from "../../icons";
import { sendBotPayload, useUserToken } from "../../hooks";
import "react-h5-audio-player/lib/styles.css";
import "../../assets/styles/audioPlayer.css"
import AudioPlayer from "react-h5-audio-player";
import { useAppearance, useVkSnackbar } from "../../hooks";

export function MashupNetPanel({ id, setActivePanel, userId }) {

    const [error, setError] = useState(null);
    const [mashupNet, setMashupNet] = useState({});
    const { scheme, toggleScheme } = useAppearance();
    const snackbar = useVkSnackbar();
    const [usersInfo, setUsersInfo] = useState(null);
    const [ token, setToken ] = useUserToken();
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }
        return spinner;
    }, true);
    const [currentSong, setSong] = useState(null);

    useEffect(async () => {
        setSpinner(true);
        let mashups = await serverApi.LoadHotaruMashupNet();
        setMashupNet(mashups);
        setUsersInfo(await VkApiCaller.vkCall("users.get", token, { "user_ids": mashups.map(({ CreatorId }) => CreatorId).join(","), "fields": "photo_50" }));
        setSpinner(false);
        return () => false;
    }, [])

    const OnPlayMashup = (mashupPlayer, mashup) => {
        if (snackbar.snackbar != null) return mashupPlayer.target.pause();
        if (currentSong != null) currentSong.pause();
        setSong(mashupPlayer.target);
        snackbar.invokeSnackbar(`Сейчас играет: ${mashup.name}`)
    }

    const PutLike = (mashup) => {
        if (snackbar.snackbar != null) return;
        sendBotPayload(userId, `!мешап лайк ${mashup.Id}`)
        mashup.Likes.push(userId);
        snackbar.invokeSnackbar(`Поставлен лайк мэшапу "${mashup.Name}"`, <Icon20LikeCircleFillRed />)
    }


    return (
        !spinner ?
            <Panel id={id}>
                <CustomPanelHeader onBack={() => setActivePanel("")} isback={false} status="#MashupNet" />
                <Group mode="plain">
                    <Div>
                        <Title level="1">
                            #MashupNet
                        </Title>
                    </Div>
                    <Div style={{ paddingTop: 15, paddingBottom: 15, color: "gray" }}>
                        • <strong>#MashupNet</strong> — сеть мэшапов и их авторов внутри вселенной Хотару.
                        <br />
                        • <strong>Мэшап</strong> — неоригинальное музыкальное произведение, состоящее, как правило, из двух
                        исходных композиций (акапелла и инструментал), взятые из каких либо музыкальных произведений.
                        <br />
                        • Акапелла — вокал, в нашем случае вырезанный из какой-либо композиции.
                        <br />
                        • Инструментал — песня без вокала.
                        <br />
                        <br />
                        • Здесь собраны все Мэшапы, которые были успешно созданы с <strong>помощью Хотару и команды «!мешап»</strong> прикрепляя акапеллу и инструментал.
                        Чтобы попасть в #MashupNet нужно создать такой мэшап в любой беседе, тогда этот мэшап будет выступать от беседы, где и был создан.
                        Создавать мэшапы можно где угодно, но отправлять их нужно из беседы.
                        <br />
                        <br />
                        • Чтобы здесь <strong>появился</strong> ваш мэшап, нужно нажать на кнопку «Отправить заявку в #MashupNet». Когда заявка будет отправлена, дождитесь одобрения/отклона от модераторов (вас оповестят в личных сообщениях).

                    </Div>
                </Group>
                <Separator style={{ margin: "12px" }} />
                {
                    mashupNet.filter(x=> x.Access == true).sort((a, b) => b.Likes.length - a.Likes.length).map((mashup, idx) => {
                        let userInfo = usersInfo.find((item) => item.id == mashup.CreatorId);
                        return (
                            <Fragment key={`${id}__${idx}`}>
                                <Div>
                                    <Group mode="card">
                                        <Div>
                                            <Title level="2" weight="2" style={{ marginBottom: 10 }}>
                                                {mashup.Name}
                                            </Title>
                                        </Div>
                                        {
                                            mashup.IsSmart &&
                                            <SimpleCell disabled before={<Icon28PodcastCircleFillRed />}>
                                                Сгенерирован «Умным мэшапером»
                                            </SimpleCell>
                                        }
                                        <SimpleCell
                                            before={<Avatar size={50} src={userInfo.photo_50} />}
                                            description="Автор"
                                            target="_blank"
                                            href={`https://vk.com/id${mashup.CreatorId}`}
                                        >
                                            {userInfo.first_name} {userInfo.last_name}
                                        </SimpleCell>
                                        <SimpleCell disabled before={<Icon28ThumbsUpOutline />}>
                                                Лайков: {mashup.Likes.length}
                                            </SimpleCell>
                                        <Div>
                                            <AudioPlayer
                                                showJumpControls={false}
                                                style={{ "backgroundColor": scheme != "bright_light" ? "#121212" : "" }}
                                                className="mashup-player" src={mashup.Url}
                                                onPlay={(e) => OnPlayMashup(e, { name: mashup.Name })}
                                                customProgressBarSection={[]} />
                                        </Div>
                                        {!mashup.Likes.some((item) => item == userId) &&
                                            <Div>
                                                <Button
                                                    before={<Icon20Like />}
                                                    mode="outline"
                                                    onClick={() => PutLike(mashup)}
                                                >
                                                    Поставить лайк
                                                </Button>
                                            </Div>
                                        }
                                    </Group>
                                </Div>
                            </Fragment>)
                    })
                }
                {snackbar.snackbar}
            </Panel>
            :
            <Panel id={id}>
                <CustomPanelHeader status="Идёт загрузка #MashupNet" />
                <Spinner />
            </Panel>
    )
}