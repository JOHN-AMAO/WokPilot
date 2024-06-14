import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/Provider/ModalProvider";
import { QueryProvider } from "@/Provider/query-provider";
import { SocketProvider } from "@/Provider/socket-provider";
const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorkPilot",
  description: "Build powerful Teams, Projects, Do great work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ClerkProvider>
        <body className={font.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <SocketProvider>
              <QueryProvider>
                <ModalProvider />
                {children}
              </QueryProvider>
            </SocketProvider>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
