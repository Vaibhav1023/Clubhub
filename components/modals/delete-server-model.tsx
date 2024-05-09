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
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer , toast } from 'react-toastify'
import { effect } from "zod";
import "react-toastify/dist/ReactToastify.css";




export const DeleteServerModel = () => {

const {isOpen, onClose, type, data} = useModal()
const isModelOpen = isOpen && type === "deleteServer"

const router = useRouter()
const {server} = data;
const [isLoading, setIsLoading] = useState(false);

// const showToastMessage = () => {
//     toast.success("Success Notification !");
const notify = () => toast.success("Deleted");

const onClick = async () => {
    try{
        setIsLoading(true);

        await axios.delete(`/api/servers/${server?.id}`);

        onClose();
        router.refresh();
        router.push("/")
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
                        Delete Server 🥺
                    </DialogTitle>
                    <DialogDescription>
                        Are You sure you want to do this? <br/><span className="font-semibold text-indigo-500">{server?.name}</span> will be permanently deleted.
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
                            onClick={() => {
                                onClick();
                                notify();
                            }}
                            >
                                <ToastContainer position="top-center"/>
                                Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </div>
    )
}
