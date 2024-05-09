"use client";

import { CreateServermodel } from "../modals/create-server-model";
import { useEffect, useState } from "react";
import { InviteModel } from "../modals/invite-model";
import { EditServerModel } from "../modals/edit-server-model";
import { MembersModel } from "../modals/members-model";
import { CreateChannelModal } from "../modals/create-channel-model";
import { LeaveServerModel } from "../modals/leave-server";
import { DeleteServerModel } from "../modals/delete-server-model";
import { DeleteChannelModel } from "../modals/delete-channel-model copy";
import { MessageFileModal } from "../modals/message-file-model";
import { DeleteMessageModel } from "../modals/delete-message-model";

export const ModelProvider = () => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateServermodel/>
            <InviteModel/>
            <EditServerModel/>
            <MembersModel/>
            <CreateChannelModal/>
            <LeaveServerModel/>
            <DeleteServerModel/>
            <DeleteChannelModel/>
            <MessageFileModal/>
            <DeleteMessageModel/>
        </>
    )
}