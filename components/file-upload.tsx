"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { error } from "console";
import { FileIcon, Video, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" |"serverImage"
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {

const fileType = value?.split(".").pop();

const isImage = fileType?.startsWith('image'); 
const isVideo = fileType?.startsWith('video'); 
const isPdf = fileType?.startsWith('pdf') ; 

if(value && fileType !== "pdf"){
    return (
        <div className="relative h-20 w-20">
            <Image
                fill
                src={value}
                alt="Upload"
                className="h-5 w-5"/>
                <button onClick={() => onChange("")}
                        className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm
                        " type="button">
                            <X className="h-3 w-3"/>
                </button>
        </div>
    )
}
if(value && fileType === "pdf"){
    return(
        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon className="h-10 w-10  fill-indigo-200 stroke-indigo-400"/>
            <a 
                href={value}
                target="_blank"
                rel="noopener noreference"
                className="ml-2 text-sm text-indigo-500 hover:underline">
                    {value}
            </a>
            <button onClick={() => onChange("")}
                        className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm
                        " type="button">
                            <X className="h-3 w-3"/>
            </button>
        </div>
    )
}
if(value && fileType === isVideo){
    return(
        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            {/* <FileIcon className="h-10 w-10  fill-indigo-200 stroke-indigo-400"/> */}
            {/* <a 
                href={value}
                target="_blank"
                rel="noopener noreference"
                className="ml-2 text-sm text-indigo-500 hover:underline">
                    {value}
            </a> */}
            <Video visibility={value}
            className="h-4 w-4"/>
            {/* <button onClick={() => onChange("")}
                        className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm
                        " type="button">
                            <X className="h-3 w-3"/>
            </button> */}
        </div>
    )
}
    return(
        <UploadDropzone
            className=""
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    )
}