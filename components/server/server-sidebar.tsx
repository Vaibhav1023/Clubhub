import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation"
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "./server-search";
import { AudioLines, AudioWaveform, Ghost, Gitlab, Shell, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-members";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Shell className="mr-2 h-4 w-4"/>,
  [ChannelType.AUDIO]: <AudioLines className="mr-2 h-4 w-4"/>,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4"/>,
  [ChannelType.THREADS]:<AudioWaveform className="mr-2 h-4 w-4"/>,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <Ghost className="h-4 w-4 mr-2 text-indigo-500"/>,
  [MemberRole.ADMIN]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500"/>,
}
export const ServerSidebar = async({
  serverId
}: ServerSidebarProps) => {
  const profile = await currentProfile();

  if(!profile){
    return redirect("/")
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include:{
      channels:{
        orderBy:{
          createdAt: "asc",
        }
      },
      members:{
        include:{
          profile:true,
        },
        orderBy:{
          role: "asc"
        }
      }
    }
  });

const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
const threads = server?.channels.filter((channel) => channel.type === ChannelType.THREADS)
const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
const members = server?.members.filter((member) => member.profileId !== profile.id)

if(!server){
  return redirect("/")
}

const role = server.members.find((member) => member.profileId === profile.id)?.role;
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader
        server ={server}
        role={role}/>

        <ScrollArea className="flex-1 px-3">
          <div className="mt-2">
            <ServerSearch 
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Huddles",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Threads",
                type: "channel",
                data: threads?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                }))
              }
            ]}/>
          </div>
          <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
          {!!textChannels?.length && (
            <div className="mb-2">
              <ServerSection 
                sectionType="channels"
                channelType={ChannelType.TEXT}
                role={role}
                label="Huddles"  
                />
                {textChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                    />
                ))}
            </div>
          )}
          {!!audioChannels?.length && (
            <div className="mb-2">
              <ServerSection 
                sectionType="channels"
                channelType={ChannelType.AUDIO}
                role={role}
                label="Voice Channels"  
                />
                {audioChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                    />
                ))}
            </div>
          )}
          {!!videoChannels?.length && (
            <div className="mb-2">
              <ServerSection 
                sectionType="channels"
                channelType={ChannelType.VIDEO}
                role={role}
                label="Video Channels"  
                />
                {videoChannels.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                    />
                ))}
            </div>
          )}
          {!!threads?.length && (
            <div className="mb-2">
              <ServerSection 
                sectionType="channels"
                channelType={ChannelType.THREADS}
                role={role}
                label="Threads"  
                />
                {threads.map((channel) => (
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    server={server}
                    />
                ))}
            </div>
          )}
          {!!members?.length && (
            <div className="mb-2">
              <ServerSection 
                sectionType="members"
                role={role}
                label="Direct Messages"  
                server={server}
                />
                {members.map((member) => (
                  <ServerMember
                    key={member.id}
                    member={member}
                    server={server}
                    />
                ))}
            </div>
          )}

        </ScrollArea>
    </div>
  )
}










