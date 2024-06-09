"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Button } from "../ui/button";
import { Clock1, Plus, Smile } from "lucide-react";
import { Input } from "../ui/input";
import axios from "axios";
import qs from "query-string"
import { error } from "console";
import { useModal } from "@/hooks/use-model-store";
import { EmojiPicker } from "@/components/emoji-picker";
import {
    InputAdornment,
    IconButton,
    InputLabel,
    OutlinedInput,
  } from "@mui/material";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import useSendbirdStateContext from "@sendbird/uikit-react/useSendbirdStateContext";
import sendbirdSelectors from "@sendbird/uikit-react/sendbirdSelectors";
import dayjs from "dayjs";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string,any>;
    name: string;
    type: "conversation" | "channel"
}

const formSchema = z.object({
    content:z.string().min(1),
})

export const ChatInput = ({
    apiUrl,
    query,
    name,
    type,
}:ChatInputProps) => {

    const {onOpen } = useModal()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            content:"",
        },
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const url = qs.stringifyUrl({
                url:apiUrl,
                query,
            })

            await axios.post(url, values)
        }catch(error){
            console.log(error);
        }
    }

    // async function loadScheduledMessages() {
    //     setShowScheduleMessageList(true);
    //     const params = {
    //       channelUrl: channel.url,
    //       scheduledStatus: [ScheduledStatus.PENDING],
    //     };
    //     const scheduledMessageListQuery =
    //       sb.groupChannel.createScheduledMessageListQuery(params);
    //     const queriedScheduledMessages = await scheduledMessageListQuery.next();
    //     setScheduledMessagesList(queriedScheduledMessages);
    //     const countParams = {
    //       scheduledStatus: [ScheduledStatus.PENDING],
    //     };
    //     const totalScheduledMessageCount =
    //       await sb.groupChannel.getTotalScheduledMessageCount(countParams);
    //     setScheduledMessagesCount(totalScheduledMessageCount);
    //   }

        async function scheduleMessage() {
        // Wrap setTimeout in a Promise to make it awaitable
        const wait = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));
        
        // Wait for the specified delay
        
        // Log the message (or perform any other action)
        console.log();
    }

    return(
        <Form {...form}
            >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4">
                                    <Button
                                        type="button"
                                        onClick={() => onOpen("messageFile", {apiUrl, query})}
                                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-600 transition rounded-full p-1 flex items-center justify-center">
                                        <Plus className="text-white "/>
                                    </Button>
                                    <Input
                                        disabled={isLoading}
                                        className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-500 dark:text-zinc-300"
                                        placeholder={`Message ${type== "conversation" ? name : "@" + name}`}
                                        {...field}
                                    />
                                    <div className="absolute top-7 right-16">
                                        <EmojiPicker onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
                                        />
                                    </div>
                                    <div className="absolute top-7 right-8">
                                        <Clock1 />
                                    </div>
                                    
                                </div>
                            </FormControl>
                        </FormItem>
                    )}/>
            </form>
        </Form>
    )
}