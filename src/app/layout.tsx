import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EV Data Visualization App",
  description: "View various insights about the EV data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-screen h-screen bg-gray-800 text-white`}
      >
        <div className="h-full flex flex-col justify-between">
          <header className="w-full flex flex-col items-center mt-6 mb-6">
            <h1 className="text-3xl font-bold text-white">EV Data Dashboard</h1>
            <p className="text-gray-300">
              Insights into Electric Vehicle Adoption
            </p>
          </header>
          <main className="w-full">{children}</main>
          <footer className="w-full text-center text-gray-400 py-4 text-sm">
            <p>
              Data Source:{" "}
              <a href="https://www.kaggle.com/" target="_blank">
                Kaggle
              </a>
            </p>
            <p>EV Data Visual &copy; 2025</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
