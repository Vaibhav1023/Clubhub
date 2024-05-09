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
            label=""
        >
        <button
          className="flex items-center pt-1"
          onClick={onClick}
        >
          <div className="p-2">
            <AudioWaveform
              className="group-hover:text-white transition text-sky-300"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
    )
}