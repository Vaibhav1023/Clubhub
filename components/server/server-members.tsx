"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { Ghost, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserAvatar } from "../user-avatar";

interface ServerMemberProps{
    member: Member & {profile: Profile};
    server: Server;
}

const roleIconMap = {
    [MemberRole.GUEST]:null,
    [MemberRole.ADMIN]: <Ghost className="h-4 w-4 text-sky-500"/>,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 text-indigo-500"/>,
}
export const ServerMember = ({
    member,
    server
}: ServerMemberProps) =>{
    const params = useParams();
    const router = useRouter();

    const icon = roleIconMap[member.role];
    const onClick = () => {
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }
    return(
        <button 
            onClick={onClick}
            className={cn("group pl-6 rounded-md flex items-center gap-x-3 w-full hover:bg-zinc-700 transition mb-2 mt-2",
            params?.memberId === member.id && "bg-zinc-700"
        )}>
            <UserAvatar 
                src={member.profile.imageUrl}
                className="h-8 w-8 md:h-8 md:w-8"
            />
            <p className={cn(
                "font-semibod text-sm text-black dark:text-zinc-100 group-hover:text-zinc-100"
            )}>
                {member.profile.name}
            </p>
            {icon}
        </button>
    )
}