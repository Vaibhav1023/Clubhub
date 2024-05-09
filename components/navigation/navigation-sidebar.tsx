import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
//import "./globals.css"

import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";

import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";
import { Coffee, Ghost, Gitlab, Merge } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";
import { NavigationThreads } from "./navigation-threads";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  return (
    
    <div
      className="space-y-4 flex flex-col items-center h-full w-full text-primary  dark:bg-[#1E1F22] bg-var(--background-color)"
    >
      <ActionTooltip
      side="right"
      align="start"
      label="bruh"
      >
        <div className="mt-2">
        <Ghost className="h-7 w-7 ml-0 pl-0 text-sky-500"/>
        </div>
      </ActionTooltip>

      <NavigationAction />
      {/* <NavigationThreads/> */}
      <Separator
        className="w-10 h-[2px] bg-zinc-300 dark:bg-zinc-400 rounded-md mx-auto"
      />
      <ScrollArea className="flex-1 w-full ">
       {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
        </ScrollArea>
        
      <div className=" pb-4 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[46px] w-[46px]"
            }
          }}
        />
      </div>
    </div>
  )
}