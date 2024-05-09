import Home from "./threads-home";

interface ThreadsProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation"
    imageUrl?: string;
}

export const Threads = () => {
    return(
    <div>
        <Home/>
    </div>
    )
}