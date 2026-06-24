import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ModalProvider from "@/components/modals/modal-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz - Ôn tập 600 câi hỏi giấy phép lái xe",
  description: "Ứng dụng web phục vụ cho việc ôn tập các câu hỏi thi lấy giấy phép lái xe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ModalProvider />
        <main>{children}</main>
        <Toaster position="top-center" duration={5000} richColors />
      </body>
    </html>
  );
}
