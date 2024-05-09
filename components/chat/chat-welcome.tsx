import { Gitlab, Shell } from "lucide-react";
import { Victor_Mono } from "next/font/google";

interface ChatWelcomeProps{
    name: string;
    type: "channel" | "conversation";
}
const victor = Victor_Mono({ subsets:['cyrillic']});

export const ChatWelcom = ({
    name,
    type,
}: ChatWelcomeProps) => {
    return(

        <div className="space-y-2 px-4 mb-4">
            {type === "channel" && (
                <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
                    <Gitlab className="h-12 w-12 text-white"/>
                </div>
            )}
            <p className=" text-xl md:text-3xl font-bold">
                {type === "channel" ? "Welcome to @" : ""}{name}
            </p>
            <p className={victor.className}>
                {type === "channel" 
                ? `This is the start of the @${name} channel`
                : `This is the start of your conversation with ${name}`
                }
            </p>
        </div>
    )
}