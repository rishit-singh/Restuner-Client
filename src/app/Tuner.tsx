import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"

export default function Tuner()
{
    return (<>
        <div className="grid grid-cols-2">
            <div className="flex flex-col items-center p-12">
                <div className="h-[500px] w-[650px] bg-[#252525] rounded-lg p-5 text-[#D9D6D6] border-[#313131] border-2">
                    Output 
                </div>
                <div className="grid grid-cols-2 p-12 gap-52">
                    <Button variant={"secondary"}>Tune</Button>
                    
                    <div className="flex flex-row gap-3 items-center p-0">
                        <Label htmlFor="resume">Resume: </Label>
                        <Button className="m-0" variant={"secondary"}>Select a file</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center p-12">
                <Textarea placeholder={"Enter a job description"} className="mt-[50px] h-[300px] w-[650px] bg-[#3B3B3B] rounded-lg p-5 text-[#D9D6D6]"/>
            </div>
        </div>
    </>);    
}
