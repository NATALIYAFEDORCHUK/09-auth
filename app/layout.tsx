import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "This is a modern web application on Next.js using App Router",
  openGraph: {
    title: "NoteHub",
    description: "This is a modern web application on Next.js using App Router",
    url: "https://08-zustand-theta-nine.vercel.app/",
    images: [
      {
        url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
        width: 1200,
        height: 630,
        alt: "note",
      },
    ],
    type: "article",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
        <AuthProvider>
        <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
