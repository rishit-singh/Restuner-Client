"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import {useRef, useState, RefObject, useEffect} from "react";
import Markdown from "react-markdown";

export default function Tuner()
{
    const resumeFileRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const jobDescriptionRef: RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null);

    const [output, setOutput] = useState<string>("Output");

    const [uploadState, setUploadState] = useState<number>(0);
   
    const APIURL = "localhost:8001"; 

    const uploadResume = async () => {
        setUploadState(1);
        setOutput("Uploding resume");

        const formData: FormData = new FormData();

        formData.set("resume", (resumeFileRef.current?.files as FileList)[0]);

        const response = await fetch(`http://${APIURL}/upload`, {
            method: "post",
            body: formData 
        }); 

        setUploadState(2); 
    }; 

    // if (uploadState == 1)
        useEffect(() => {
            let interval: NodeJS.Timeout | undefined = undefined;

            if (interval === undefined)
                interval = setInterval(async () => {
                    const response = await (await fetch(`http://${APIURL}/output`, {})).json();
                    
                    switch (response.State)
                    {
                        case 0:
                            setOutput("Prompting");                
                            break;
                    
                        case 1:
                            setOutput(response.Output);

                            break;
                    }
                }, 100);
                
            return () => {
                if (interval !== undefined)
                    clearInterval(interval);
            };
        }, [uploadState]);

    return (<>
        <div className="grid grid-cols-2">
            <div className="flex flex-col items-center p-12">
                <div className="flex  bg-[#252525] rounded-lg p-5 text-[#D9D6D6] border-[#313131] border-2">
                    <Markdown>
                        {output} 
                    </Markdown> 

                </div>
                <div className="grid grid-cols-2 p-12 gap-48">
                    <Button variant={"secondary"}>Tune</Button>
                    
                    <div className="flex flex-row gap-3 items-center p-0">
                        <Label htmlFor="resume">Resume: </Label>
                        <Input ref={resumeFileRef} 
                                onChange={async () => await uploadResume()} 
                                type="file"
                                className="text-black bg-white" hidden/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center p-12">
                <Textarea ref={jobDescriptionRef} 
                        placeholder={"Enter a job description"} 
                        className="resize-none mt-[50px] h-[300px] w-[650px] bg-[#3B3B3B] rounded-lg p-5 text-[#D9D6D6]"/>
            </div>
        </div>
    </>);    
}
 
