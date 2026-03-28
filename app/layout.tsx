import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JFC Renovations | Licensed Contractor — Woodside, Queens NY',
  description:
    'JFC Renovations is a fully licensed and insured contractor based in Woodside, Queens. Specializing in kitchen remodeling, bathroom renovation, basement finishing, home additions, flooring, and painting. Serving all of NYC.',
  keywords: 'contractor Queens NY, kitchen remodeling Queens, bathroom renovation Woodside, home renovation NYC, basement finishing Queens',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t?t==='dark':true);})();` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fjalla+One&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300;1,8..60,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink-900 text-warm-100 antialiased">{children}</body>
    </html>
  )
}
