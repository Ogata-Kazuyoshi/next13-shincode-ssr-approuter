import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Header from "@/app/Header";
import Footer from "@/app/Footer";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className='container mx-auto bg-slate-700 text-slate-50'>
            <Header />
            {children}
            <Footer />
        </body>
        </html>
    );
}
