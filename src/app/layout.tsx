import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PrivyProvider from "@/lib/providers/PrivyProvider";
import Header from "./components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LiveFrames App",
  description: "LiveFrames app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col w-full min-h-screen  mx-auto p-4">
          <PrivyProvider>
            <Header>{children}</Header>
          </PrivyProvider>
        </main>
      </body>
    </html>
  );
}
