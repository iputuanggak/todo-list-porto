import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Putu Angga - Todo List Porto",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${noto_sans.variable} relative bg-[#F8F9FA] antialiased`}
      >
        {children}
        <div className="pointer-events-none fixed inset-0">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/img/overlay.png`}
            alt=""
            className="h-full -translate-y-40 scale-150 object-cover object-right md:object-left"
          />
        </div>
      </body>
    </html>
  );
}
