import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HMP Entrepreneurship Blog',
  description: 'Entrepreneurship Blog by Vu Huy Minh Pham',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="fixed justify-center">
          <ul className="p-5 sm:space-x-10 flex flex-col sm:flex-row justify-center w-screen font-bold">
            <li>
              <Link href="/about-project">About Project</Link>
            </li>
            <li>
              <Link href="/posts">Blog</Link>
            </li>
            <li>
              <Link href="/about-me">About Me</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
