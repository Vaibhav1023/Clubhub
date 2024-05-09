"use client";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle 
} from "../ui/dialog";
import { useModal } from "@/hooks/use-model-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string"



export const DeleteMessageModel = () => {

const {isOpen, onClose, type, data} = useModal()
const isModelOpen = isOpen && type === "deleteMessage"

const {apiUrl, query} = data;
const [isLoading, setIsLoading] = useState(false);

const onClick = async () => {
    try{
        setIsLoading(true);
        const url = qs.stringifyUrl({
            url: apiUrl || "",
            query,
        })
        await axios.delete(url);

        onClose();
        
    }catch(error){
        console.log(error);
    }finally{
        setIsLoading(false);
    }
    }

    return (
        <div>
        <Dialog open={isModelOpen} onOpenChange={onClose}>
            <DialogContent className="bg-stone-900 text-white p-0 overflow-hidden">
                <DialogHeader className="py-7 px-5">
                    <DialogTitle className="text-2xl text-center font-normal pb-1">
                        Delete Message
                    </DialogTitle>
                    <DialogDescription>
                        Are You sure you want to do this? <br/>

                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-zinc-800 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button 
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost">
                            Cancel
                        </Button>
                        <Button 
                            disabled={isLoading}
                            variant="primary"
                            onClick={onClick}
                            >
                                Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </div>
    )
}