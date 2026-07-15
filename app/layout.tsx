import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SceneWrapper } from '@/components/scene/scene-wrapper'
import { Navbar }       from '@/components/navbar'
import { Footer }       from '@/components/footer'

export const metadata: Metadata = {
  title: 'InnovatorsHub — University Innovation Club',
  description: 'The premier university innovation club for students passionate about technology, entrepreneurship, and the future.',
  icons: { icon: '/icon.svg' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050a14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased bg-transparent text-foreground">
        {/* Fixed scene layers — shared across every page */}
        <SceneWrapper />

        {/* Global navbar */}
        <Navbar />

        {/* Page content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Global footer — cream top padding creates whitespace gap on all pages */}
        <div className="relative z-10" style={{ background: '#f5f0eb', paddingTop: '64px' }}>
          <Footer />
        </div>
      </body>
    </html>
  )
}
