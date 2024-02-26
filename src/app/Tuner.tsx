"use client"

import Conditional from "@/components/ui/Conditional";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"
import { useError } from "@/hooks/useError";
import {useRef, useState, RefObject, useEffect} from "react";
import Markdown from "react-markdown";

const DefaultErrorMessage: string = "Unknown error occured";

export default function Tuner()
{
    const resumeFileRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const jobDescriptionRef: RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null);

    const [output, setOutput] = useState<string>("Select a resume and give me a job description.");

    const [uploadState, setUploadState] = useState<number>(0);
   
    const APIURL = "localhost:8001"; 

    const {ErrorMessage, ShowError, UpdateError } = useError(DefaultErrorMessage, false); 

    const uploadResume = async () => {
        setUploadState(1);
        setOutput("Uploding resume");

        const formData: FormData = new FormData();

        formData.append("resume", (resumeFileRef.current?.files as FileList)[0]);
        formData.append("job_description", jobDescriptionRef.current?.value as string);

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
 
                switch (response.State) {
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

    const onTuneHandler = async () => {
        if (resumeFileRef.current?.files?.length as number < 1)
        {
            UpdateError("Please select a resume file.", true, 3000);

            return;
        }      
        
        if (jobDescriptionRef.current?.value.length as number < 1)
        {
            UpdateError("Please enter a job description.", true, 3000);

            return;
        }
        
        await uploadResume();
    };

    return (<>
        <div className="grid grid-cols-2">
            <div className="flex flex-col items-center p-12">
                <div className="flex flex-col bg-[#252525] rounded-lg p-5 text-[#D9D6D6] border-[#313131] border-2">
                    <Markdown>
                        {output} 
                    </Markdown> 
                </div>
            </div>
            <div className="flex flex-col items-center p-12 gap-5">
                <Textarea ref={jobDescriptionRef} 
                        placeholder={"Enter a job description"} 
                        className="resize-none mt-[50px] h-[300px] w-[650px] bg-[#3B3B3B] rounded-lg p-5 text-[#D9D6D6]"/>
                
                <div className="grid grid-cols-2 p-12 gap-24">
                    <Button variant={"secondary"} onClick={onTuneHandler} >Tune</Button>
                    
                    <div className="flex flex-row gap-3 items-center p-0">
                        <Label htmlFor="resume">Resume: </Label>
                        <Input ref={resumeFileRef} 
                            type="file"
                            className="text-black bg-white" hidden />
                    </div>
                </div>

                <Conditional Condition={ShowError as boolean}>
                    <Alert variant={"destructive"} >
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{ErrorMessage}</AlertDescription>
                    </Alert>
                </Conditional>
            </div>
        </div>
    </>);    
}
 