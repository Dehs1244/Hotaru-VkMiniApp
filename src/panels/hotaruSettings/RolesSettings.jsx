import React, { useState } from "react";
import { Panel, FormItem, Cell, Snackbar, Input, Header, Spacing, Button, Group, InfoRow, ChipsInput, SimpleCell, Alert, IconButton } from "@vkontakte/vkui";
import { CustomPanelHeader } from "../../components";
import { sendBotPayload } from "../../hooks";
import { Icon28ListOutline } from '@vkontakte/icons';
import { Icon28ListAddOutline } from '@vkontakte/icons';
import { Icon16DoneCircle } from "@vkontakte/icons";
import { IsHotaruCommand } from "../../utils/hotaruServerApi";
import { Icon16ErrorCircleFill } from "@vkontakte/icons";
import { Icon16Clear } from "@vkontakte/icons";
import { useEffect } from "react/cjs/react.development";
import { Fragment } from "react";
import { useRouter } from "@unexp/router";
import { CustomRoleAdd } from "..";
import { CustomRoleList } from "../creationPool/CustomRoleList";

export function RolesSettings({ id, chatData, chatId, setPopoutElement }) {
  const [snackbar, setSnackbar] = useState(null);
  const { push } = useRouter();

  return (
    <>
      <Panel id={id}>
        <CustomPanelHeader status="Настройки ролей" />
        <SimpleCell before={<Icon28ListOutline />}
          onClick={() => push({ panel: "settings_roles_list" })}
          size="m"
          multiline
          description={"Список и менеджмент всех созданных ролей"}
        >
          Все роли
        </SimpleCell>
        <SimpleCell before={<Icon28ListAddOutline />}
          onClick={() => push({ panel: "settings_roles_add" })}
          size="m"
          multiline
          description={"Создание и настройка роли"}
        >
          Создать роль
        </SimpleCell>
      </Panel>
    </>
  )
}
