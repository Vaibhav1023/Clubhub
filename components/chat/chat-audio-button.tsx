"use client";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AudioLines, AudioWaveform } from "lucide-react";

import { ActionTooltip } from "../action-tooltip";



export const ChatAudioButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isAudio = searchParams?.get("audio");

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname || "",
      query: {
        audio: isAudio ? undefined : true,
      }
    }, { skipNull: true });

    router.push(url);
  }
  
  const Icon = isAudio ? AudioLines : AudioLines;
  
  const tooltipLabel = isAudio ? "End voice call" : "Start Voice call";

  return (
    <ActionTooltip side="bottom" label={tooltipLabel}>
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-300" />
      </button>
    </ActionTooltip>
  )
}