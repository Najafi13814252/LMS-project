import "./globals.css";
import localFont from 'next/font/local'
import { cn } from "@/lib/utils";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const arad = localFont({
  src: [
    {
      path: '../public/fonts/AradFD-RegularDots4.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/AradFD-MediumDots4.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/AradFD-SemiBoldDots4.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../public/fonts/AradFD-BoldDots4.woff2',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../public/fonts/AradFD-ExtraBoldDots4.woff2',
      weight: '800',
      style: 'normal'
    },
  ],
  variable: '--font-arad',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="rtl"
      className={cn("font-sans", arad.variable)}
    >
      <body>
        <ClerkProvider>          
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
