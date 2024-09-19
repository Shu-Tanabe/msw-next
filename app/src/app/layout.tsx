"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Client, fetchExchange, Provider } from "urql";
import { MSWProvider } from "@/mocks/mock-provider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = new Client({
    url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
    exchanges: [fetchExchange],
    requestPolicy: "cache-and-network",
    fetchOptions: {
      credentials: "same-origin",
    },
  });
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider value={client}>
          <MSWProvider>{children}</MSWProvider>
        </Provider>
      </body>
    </html>
  );
}
