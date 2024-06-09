"use client";

import { useRouter, useParams } from "next/navigation";
import { AudioWaveform } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";

interface NavigationThreadsProps{
    threadId: string;
    id: string;
}


export const NavigationThreads = () => {

    const router = useRouter();
    const onClick = () => {
        router.push("");
      }
    return(
        <div>
        <ActionTooltip
            side="right"
            align="start"
            label="threads"
        >
        <button
          className="group flex items-center pt-1"
          onClick={onClick}
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-sky-500 p-2">
            <AudioWaveform
              className="group-hover:text-white transition text-sky-300 dark:text-white"
              size={25}
            />
            
          </div>
        </button>
      </ActionTooltip>
    </div>
    )
}