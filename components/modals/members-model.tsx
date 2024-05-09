"use client";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription,
    DialogHeader,
    DialogTitle 
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import qs from "query-string"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-model-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw, ShieldAlert, ShieldCheck, MoreVertical, ShieldQuestion, Shield, Gavel, Loader2 } from "lucide-react";
import { link } from "fs";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";
import { MemberRole } from "@prisma/client";
import axios from "axios";

const roleIconMap = {
  "GUEST": null,
  "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-400"/>,
  "ADMIN": <ShieldAlert className="h-4 w-4 text-sky-500"/>,
}


export const MembersModel = () => {

const {onOpen, isOpen, onClose, type, data} = useModal()
const [loadingId, setLoadingId] = useState("");
const isModelOpen = isOpen && type === "members"
const router = useRouter();

const {server} = data as {server: ServerWithMembersWithProfiles};

const onKick = async (memberId: string) => {
  try {
    setLoadingId(memberId);
    const url = qs.stringifyUrl({
      url: `/api/members/${memberId}`,
      query: {
        serverId: server?.id,
      },
    });

    const response = await axios.delete(url);

    router.refresh();
    onOpen("members", { server: response.data });
  } catch (error) {
    console.log(error);
  } finally {
    setLoadingId("");
  }
}

const onRoleChange = async (memberId: string, role: MemberRole) => {
  try {
    setLoadingId(memberId);
    const url = qs.stringifyUrl({
      url: `/api/members/${memberId}`,
      query: {
        serverId: server?.id,
      }
    });

    const response = await axios.patch(url, { role });

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  }

    return (
        <div>
        <Dialog open={isModelOpen} onOpenChange={onClose}>
            <DialogContent className="bg-stone-900 text-white overflow-hidden">
                <DialogHeader className="py-6 px-5">
                    <DialogTitle className="text-2xl text-center font-normal">
                        Manage Members 
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-400">
                      {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member) => (
                      <div key={member.id} className="flex items-center gap-x-2 mb-6">
                        <UserAvatar src={member.profile.imageUrl}/>
                        <div className="flex flex-col gap-y-1">
                          <div className="text-xs font-semibold flex items-center gap-x-1">
                            {member.profile.name}
                            {roleIconMap[member.role]}
                          </div>
                          <p className="text-xs text-zinc-400">
                            {member.profile.email}
                          </p>
                        </div>
                        {server.profileId !== member.profileId && loadingId !== member.id && (
                          <div className="ml-auto">
                    <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-4 w-4 text-zinc-400" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger
                          className="flex items-center"
                        >
                          <ShieldQuestion
                            className="w-4 h-4 mr-2"
                          />
                          <span>Role</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              onClick={() => onRoleChange(member.id, "GUEST")}
                            >
                              <Shield className="h-4 w-4 mr-2" />
                              Guest
                              {member.role === "GUEST" && (
                                <Check
                                  className="h-4 w-4 ml-auto"
                                />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onRoleChange(member.id, "MODERATOR")}
                            >
                              <ShieldCheck className="h-4 w-4 mr-2" />
                              Moderator
                              {member.role === "MODERATOR" && (
                                <Check
                                  className="h-4 w-4 ml-auto"
                                />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onKick(member.id)}
                      >
                        <Gavel className="h-4 w-4 mr-2" />
                        Kick
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                          </div>
                        )}
                    {loadingId === member.id && (
                    <Loader2
                  className="animate-spin text-zinc-500 ml-auto w-4 h-4"
                    />
                    )}
                      </div>
                    ))}
                </ScrollArea>
                
            </DialogContent>
        </Dialog>
        </div>
    )
}