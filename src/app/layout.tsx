import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VisionX - Premium Glasses Store",
  description: "Discover premium eyeglasses and sunglasses at VisionX. Upload your prescription and get the perfect pair delivered to your doorstep.",
  keywords: "eyeglasses, sunglasses, prescription glasses, vision care",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
