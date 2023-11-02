import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SessProvider from '@/components/sessProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LMS',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className} container mx-auto p-4`}>
        <SessProvider>
          <main>
            {children}
          </main>
        </SessProvider>
      </body>
    </html>
  )
}
