"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
};

export const NavigationItem = ({
  id,
  imageUrl,
  name
}: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  }

  return (
    <ActionTooltip
      side="right"
      align="center"
      label={name}
    >
      <button
        onClick={onClick}
        className="group relative flex items-center px-1"
      >
        <div className={cn(
          "absolute left-0 bg-primary rounded-r-full transition-all mt-2 mr-1 w-[4px]",
          params?.serverId !== id && "group-hover:h-[20px] group-hover:bg-indigo-400",
          params?.serverId === id ? "h-[32px] bg-indigo-300" : "h-[9px]"
        )} />
        <div className="h-22">

        </div>
        <div className={cn(
          "relative group flex mt-3 mx-2 h-[45px] w-[45px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
          params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
        )}>
          <Image
            fill
            src={imageUrl}
            alt="Channel"
          />
        </div>
      </button>
    </ActionTooltip>
  )
}