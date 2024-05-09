"use client";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription,
    DialogHeader,
    DialogTitle 
} from "../ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { link } from "fs";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";


export const InviteModel = () => {

const {isOpen, onClose, type, data} = useModal()
const origin = useOrigin();
const isModelOpen = isOpen && type === "invite"

const {server} = data;
const [copied, setCopied] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const inviteUrl = `${origin}/invite/${server?.inviteCode}`

const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
        setCopied(false);
    }, 1000)
}
    return (
        <div>
        <Dialog open={isModelOpen} onOpenChange={onClose}>
            <DialogContent className="bg-stone-900 text-white p-0 overflow-hidden">
                <DialogHeader className="py-7 px-5">
                    <DialogTitle className="text-2xl text-center font-normal">
                        Invite People
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-50 ">
                        Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input className="bg-zinc-300 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" value={inviteUrl}/>
                        <Button  onClick={onCopy} className="bg-stone-900" size="icon">
                            {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4 text-white"/>}
                           
                        </Button>
                    </div>
                    <Button variant="link"
                    size="sm"
                    className="text-xs text-white mt-4">
                        Generate a new Link
                        <RefreshCw className="w-4 h-4 ml-2"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
        </div>
    )
}