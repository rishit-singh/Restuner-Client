import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"

export default function Tuner()
{
    return (<>
        <div className="grid grid-cols-2">
            <div className="flex flex-col items-center p-12">
                <div className="h-[500px] w-[650px] bg-[#D9D9D9] rounded-lg p-5 text-[#303030]">
                    Output 
                </div>
                <div className="grid grid-cols-2 p-12 gap-64">
                    <Button>
                        Tune
                    </Button>
                    
                    <div className="flex flex-row gap-3 items-center">
                        <Label htmlFor="resume">Resume: </Label>
                        <Button>Select a file</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center p-12">
                <Textarea placeholder={"Enter a job description"} className="mt-[50px] h-[300px] w-[650px] bg-[#D9D9D9] rounded-lg p-5 text-[#303030]"/>
            </div>
        </div>
    </>);    
}
