import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'سيبرها | Cyberha Intel',
  description: 'مدونة سيبرها لعرض اخبار التهديدات السيبرانية 2026',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-black">{children}</body>
    </html>
  )
}