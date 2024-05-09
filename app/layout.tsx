import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme.provider";
import { cn } from "@/lib/utils";
import { ModelProvider } from "@/components/providers/model-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import {SendbirdProvider } from "@sendbird/uikit-react/SendbirdProvider"
import SendbirdChat from "@sendbird/chat";
import "@sendbird/uikit-react/dist/index.css";
import { Victor_Mono } from "next/font/google";
//import FullParticles from "@/app/full-particles";

const Sans = Open_Sans({ subsets: ["latin"] });
const victor = Victor_Mono({subsets:["greek"]})
export const metadata: Metadata = {
  title: "Bruh - be right",
  description: "This app is in developing and testing phase.",

};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const APP_ID = process.env.SENDBIRD_APP_ID;
  // const ACCESS_TOKEN = process.env.SENDBIRD_ACCESS_TOKEN;
  // const dayjs = require('dayjs');
  // dayjs().format()

  // const sb = SendbirdChat.init({
  //   appId: APP_ID,
  //   modules: [new GroupChannelModule()]
  // });
  // sb.connect(USER_ID, ACCESS_TOKEN)

  return (
    <ClerkProvider >
                {/* <SendbirdProvider
                  appId={APP_ID}
                  userId={USER_ID}
                  accessToken={ACCESS_TOKEN}
                >
  <CustomizedApp sb={sb}/> */}
                
    <html lang="en" suppressHydrationWarning>
      <body className={cn( 
              victor.className,
            "bg-white dark:bg-[#313330]")}>
        <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem={false}
            storageKey="discord-theme">
          <SocketProvider>
            <ModelProvider/>
            <QueryProvider>
              {children}
            </QueryProvider>
          </SocketProvider>
          
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
