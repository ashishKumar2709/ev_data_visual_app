"use client"
import { useRouter } from "next/navigation";
export default function Home() {
const router = useRouter();
  return (
    <div className="h-full">
      <main className="h-full">
        <div className="h-full flex justify-center items-center">
        <button className="border bg-gray-700 rounded p-4 cursor-pointer" onClick={()=>router.push("/graph")}>View Graphs</button>
      </div>
      </main>
      <footer className="">
      </footer>
    </div>
  );
}
