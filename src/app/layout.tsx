import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/lib/provider/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toast styles
import ClientWrapper from "@/components/shared/ClientWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
 export const metadata: Metadata = {
  title: "bet365all",
  description: "bet365all",

  icons: {
    icon: "https://ossimg.bet365all.live/fevicon/fevicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Wrap client-side logic */}
          <ClientWrapper>{children}</ClientWrapper>
          <ToastContainer position="top-right" autoClose={5000} />
        </body>
      </html>
    </Providers>
  );
}
