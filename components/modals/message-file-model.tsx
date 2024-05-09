"use client";
import * as z from "zod";
import  axios  from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import qs from "query-string"
import { 
    Dialog, 
    DialogContent, 
    DialogDescription,
    DialogFooter, 
    DialogHeader,
    DialogTitle 
} from "../ui/dialog";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";

const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "Image URL is required."
    })
});

export const MessageFileModal = () => {
const { isOpen, onClose, type, data} = useModal();
const router = useRouter();

const isModalOpen = isOpen && type === "messageFile"
const {apiUrl, query} = data;
const form = useForm({
    resolver:zodResolver(formSchema),
    defaultValues:{
        fileUrl: "",
    }
});

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            })
            await axios.post(url, {
                ...values,
                content: values.fileUrl,
            });
            form.reset()
            router.refresh();
            handleClose()
        }catch(error){
            console.log(error);
        }
        
    }

    return (
        <div>
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-stone-900 text-white p-0 overflow-hidden">
                <DialogHeader className="py-7 px-5">
                    <DialogTitle className="text-2xl text-center font-normal">
                        Add an attachment
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-400">
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-5 px-6">
                            <div className="flex items-center justify-center">
                                <FormField 
                                        control={form.control}
                                        name="fileUrl"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <FileUpload
                                                        endpoint="messageFile"
                                                        value = {field.value}
                                                        onChange = {field.onChange}
                                                        />
                                                </FormControl>
                                            </FormItem>
                                        )}>

                                </FormField>
                            </div>
                            
                        </div>
                        <DialogFooter className="bg-stone-600 px-6 py-2">
                            <Button disabled={isLoading}
                                    variant={"primary"}>
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
        </div>
    )
}