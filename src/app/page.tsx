"use client";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col">
      <header className="w-full flex flex-col items-center mt-6 mb-6">
        <h1 className="text-3xl font-bold text-white">EV Data Dashboard</h1>
        <p className="text-gray-300">Insights into Electric Vehicle Adoption</p>
      </header>
      <main className="h-full w-full">
        <div className="h-full flex justify-center items-center">
          <button
            className="border bg-gray-700 rounded p-4 cursor-pointer"
            onClick={() => router.push("/graph")}
          >
            Dashboard
          </button>
        </div>
      </main>
      <footer className="text-center text-gray-400 py-4 text-sm">
        <p>Data Source: <a href="https://www.kaggle.com/" target="_blank" >Kaggle</a></p>
        <p>EV Data Visual &copy; 2025</p>
      </footer>
    </div>
  );
}
