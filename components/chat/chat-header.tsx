import { channel } from "diagnostics_channel";
import { Merge, Shell } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { UserAvatar } from "../user-avatar";
import { SocketIndicator } from "../socket-indicator";
import { ChatVideoButton } from "./chat-video-button";
import { ChatAudioButton } from "./chat-audio-button";

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}
export const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl
}:ChatHeaderProps) => {
    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileToggle serverId={serverId}/>
            {type === "channel" && (
                <Shell className="w-5 h-5 ml-1 text-zinc-500 dark:text-zinc"/>
            )}
            {type === "conversation" && (
                <UserAvatar
                    src={imageUrl}
                    className="h-8 w-8 md:w-8 md:h-8 mr-2"/>
            )}
            <p className="font-semibold text-md text-black dark:text-white pl-2">
                {name}
            </p>
            <div className="ml-auto flex items-center">
                {type === "conversation" && (
                    <ChatAudioButton/>
                )}
                {type === "conversation" && (
                    <ChatVideoButton/>
                )}
                <SocketIndicator/>
            </div>
        </div>
    )
}