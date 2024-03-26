import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { TicketInfoProvider } from "@/hooks/useTicketInfo";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stacker AI Support",
  description: "Stacker AI Support Desk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container flex bg-white">
          <TicketInfoProvider>
            <AuthProvider>
              <Sidebar />
              <div className="flex flex-col h-screen w-full">{children}</div>
            </AuthProvider>
          </TicketInfoProvider>
        </main>
      </body>
    </html>
  );
}
