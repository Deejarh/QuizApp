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
        className={`${inter.className} antialiased flex justify-center items-center w-full p-4 h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
