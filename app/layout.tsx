import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Quiz app developed by Damola Taiwo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased flex justify-center items-center w-full h-screen bg-slate-700`}
      >
        {children}
      </body>
    </html>
  );
}
