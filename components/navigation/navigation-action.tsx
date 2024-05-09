"use client";

import { BetweenHorizonalEnd, Merge, Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-model-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip
        side="right"
        align="center"
        label="Add server"
      >
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center pt-4"
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-sky-500">
            <BetweenHorizonalEnd
              className="group-hover:text-white transition text-sky-300"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  )
}