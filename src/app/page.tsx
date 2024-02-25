import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Navbar from "./Navbar";
import Tuner from "./Tuner";

export default function Home() {
  return (
    <main className="grid grid-rows-[8vh_1fr] w-100 h-[100vh]">
      <Navbar/>   
      <Tuner/> 
    </main>
  );
}
