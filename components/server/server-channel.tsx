"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { AudioLines, AudioWaveform, Edit, Edit2, Edit3, Lock, Mic, Shell, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { ModalType, useModal } from "@/hooks/use-model-store";

interface ServerChannelProps{
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const iconMap ={
    [ChannelType.TEXT]: Shell,
    [ChannelType.AUDIO]: AudioLines,
    [ChannelType.VIDEO] :Video,
    [ChannelType.THREADS]:AudioWaveform,
}
export const ServerChannel = ({
    channel,
    server,
    role
}: ServerChannelProps) => {
    const {onOpen} = useModal();
    const params = useParams();
    const router = useRouter();

    const Icon = iconMap[channel.type];

    const onClick = () => {
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
    }

    const onAction = (e:React.MouseEvent, action:ModalType) => {
        e.stopPropagation();
        onOpen(action,{channel,server})

    }
    return(
        <button
        onClick={onClick}
        className={cn(
            "group pl-7 pr-3 py-2 rounded-md flex items-center gap-x-3 w-full hover:bg-zinc-700/10 transition mb-1"
        )}>
            <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-500"/>
            <p className={cn("line-clamp-1 font-semibold text-xs text-zinc-400 transition",
                params?.channelId === channel.id && "text-primary"
             )}>{channel.name}</p>
             {channel.name !== "General" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip label="Edit">
                        <Edit3 className=" hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 transition"/>
                    </ActionTooltip>
                    <ActionTooltip label="Trash">
                        <Trash 
                            onClick={() => onOpen("deleteChannel", {server, channel})}
                            className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 transition"/>
                    </ActionTooltip>
                </div>
             )}
             {channel.name === "General" && (
                <Lock className=" ml-auto w-4 h-4 text-zinc-500 "/>
             )}
        </button>
    )
}