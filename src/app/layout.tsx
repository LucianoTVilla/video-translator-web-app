import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Video Translator",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}></body>
      <AppWrapper>
        <div>{children}</div>
      </AppWrapper>
    </html>
  );
}
