import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Game Tic Tac Toe",
  description: "game tic tac toe with nextjs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-row"}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
