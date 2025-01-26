import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "../styles/globals.css";
import {AuthProvider} from "@/context/AuthProvider";
import Navbar from "@/components/nav/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "home101",
    description: "",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
        >
        <AuthProvider>
            <Navbar/>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
