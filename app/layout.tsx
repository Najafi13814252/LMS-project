import "./globals.css";
import localFont from 'next/font/local'
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { EditorProvider } from "@/components/custom/EditorProvider";

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
        <EditorProvider>
          <ClerkProvider>
            {children}

            <Toaster toastOptions={{
              success: {
                duration: 4000,
                style: {
                  border: 'solid 1px oklch(76.8% 0.233 130.85)',
                  color: 'oklch(76.8% 0.233 130.85)',
                  backgroundColor: '#f7fee7'
                }
              },
              error: {
                duration: 4000,
                style: {
                  border: 'solid 1px #fb2c36',
                  color: '#fb2c36',
                  backgroundColor: '#fef2f2'
                }
              }
            }} />
          </ClerkProvider>
        </EditorProvider>

      </body>
    </html>
  );
}
