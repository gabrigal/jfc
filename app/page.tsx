'use client'

import { useState, useEffect, useRef, FormEvent, ReactNode } from 'react'
import Image from 'next/image'

// ─── Scroll-reveal hook ────────────────────────────────────────────────────────
function useReveal(animClass = 'reveal', threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add(animClass)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animClass, threshold])
  return ref
}

// ─── Staggered children reveal ─────────────────────────────────────────────────
function useStaggerReveal(count: number, delay = 80) {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const children = Array.from(container.children) as HTMLElement[]
    children.forEach((child, i) => {
      child.classList.add('reveal')
      child.style.transitionDelay = `${i * delay}ms`
    })
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child) => child.classList.add('visible'))
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [count, delay])
  return containerRef
}

// ─── Icons ─────────────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
)
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
  </svg>
)
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
)
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)
const XIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

// Service SVG icons
const KitchenSvg = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="1" />
    <path d="M2 10h20M7 3v4M12 3v4M17 3v4" />
    <rect x="6" y="13" width="5" height="4" rx="0.5" />
    <path d="M14 13h4M14 17h4" />
  </svg>
)
const BathroomSvg = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h16v4a4 4 0 01-4 4H8a4 4 0 01-4-4v-4z" />
    <path d="M4 12V5a2 2 0 012-2h1a2 2 0 012 2v1" />
    <path d="M8 21v1m8-1v1" />
    <circle cx="7" cy="6" r="0.5" fill="currentColor" />
  </svg>
)
const FlooringSvg = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="9" height="9" rx="0.5" />
    <rect x="13" y="2" width="9" height="9" rx="0.5" />
    <rect x="2" y="13" width="9" height="9" rx="0.5" />
    <rect x="13" y="13" width="9" height="9" rx="0.5" />
  </svg>
)
const PlasteringSvg = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17l4-4 3 3 4-5 4 3" />
    <rect x="2" y="3" width="20" height="14" rx="1" />
    <path d="M2 20h20" />
  </svg>
)
const PaintingSvg = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.37 2.63L14 7l-1.59-1.59a2 2 0 00-2.82 0L8 7l9 9 1.59-1.59a2 2 0 000-2.82L17 10l4.37-4.37a2.12 2.12 0 00-3-3z" />
    <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
    <path d="M14.5 17.5L4.5 15" />
  </svg>
)
const CarpentrySvg = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
)
const ClosetSvg = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="1" />
    <path d="M12 3v18" />
    <path d="M9 12h1m5 0h-1" />
    <path d="M2 7h20" />
  </svg>
)
const RadiatorSvg = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="1" />
    <path d="M6 6v12M10 6v12M14 6v12M18 6v12" />
    <path d="M2 9h20M2 15h20" />
  </svg>
)

// ─── Section header component ──────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  headline,
  sub,
  light = false,
}: {
  eyebrow: string
  headline: ReactNode
  sub?: string
  light?: boolean
}) {
  const ref = useReveal()
  return (
    <div ref={ref} className="mb-14">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-px bg-brand-500" />
        <span className="font-heading text-brand-400 text-xs tracking-[0.4em] uppercase">{eyebrow}</span>
      </div>
      <h2 className="font-display text-5xl md:text-7xl leading-[0.92] text-warm-100 mb-0">{headline}</h2>
      {sub && (
        <p className={`font-body text-lg mt-4 max-w-xl ${light ? 'text-warm-400' : 'text-warm-400'}`}>{sub}</p>
      )}
    </div>
  )
}

// ─── NAV ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    setDark(saved ? saved === 'dark' : true)
  }, [])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-ink-950/96 backdrop-blur-lg py-3 shadow-2xl shadow-black/60 border-b border-white/[0.04]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="bg-brand-500 group-hover:bg-brand-400 transition-colors px-2.5 py-1.5 flex items-center justify-center">
            <span className="font-display text-[2.8rem] leading-none tracking-[0.04em] text-white">
              JFC
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-[0.75rem] tracking-[0.35em] text-warm-300 uppercase leading-tight">
              Pro-Renovations Inc.
            </span>
            <span className="font-heading text-[0.6rem] tracking-[0.2em] text-warm-400/60 uppercase leading-tight">
              Home &amp; Office Improvement
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="nav-link font-heading text-xs tracking-[0.3em] uppercase text-warm-300 hover:text-brand-400 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="hidden md:flex items-center justify-center w-9 h-9 text-warm-300 hover:text-brand-400 transition-colors"
          aria-label="Toggle theme"
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* CTA */}
        <a
          href="tel:7185550100"
          className="hidden md:flex items-center gap-2.5 bg-brand-500 hover:bg-brand-400 text-ink-900 px-5 py-2.5 font-heading text-xs tracking-[0.2em] uppercase transition-all hover:shadow-lg hover:shadow-brand-500/25 hover:-translate-y-px"
        >
          <PhoneIcon />
          <span>(718) 555-0100</span>
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-warm-200 hover:text-brand-400 transition-colors p-1"
          aria-label="Toggle menu"
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-72 border-t border-white/[0.06]' : 'max-h-0'
        }`}
      >
        <div className="bg-ink-950/98 backdrop-blur-lg px-6 py-5 flex flex-col gap-4">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="font-heading text-xs tracking-[0.3em] uppercase text-warm-300 hover:text-brand-400 transition-colors py-1"
            >
              {label}
            </a>
          ))}
          <a href="tel:7185550100" className="flex items-center gap-2 text-brand-400 font-heading text-sm mt-2">
            <PhoneIcon /> (718) 555-0100
          </a>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-warm-300 hover:text-brand-400 font-heading text-xs tracking-[0.3em] uppercase transition-colors py-1 mt-1"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  )
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink-900 texture-overlay">
      {/* Background depth layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm gold bloom — top right */}
        <div
          className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #C8922A 0%, transparent 70%)' }}
        />
        {/* Warm charcoal bloom — bottom left */}
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #EA580C 0%, transparent 70%)' }}
        />
        {/* Vertical gold rule */}
        <div className="absolute left-[72px] top-1/4 bottom-1/4 w-px hidden xl:block"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(249,115,22,0.5), transparent)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 xl:gap-24 items-center">
          {/* Left: Main content */}
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="hero-eyebrow flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-brand-500" />
              <span className="font-heading text-brand-400 text-xs tracking-[0.45em] uppercase">
                Woodside, Queens · Est. 2007
              </span>
            </div>

            {/* Stacked display headline */}
            <div className="mb-8 -ml-1">
              <div
                className="hero-line font-display text-[clamp(4.5rem,12vw,9.5rem)] leading-[0.88] text-warm-100 tracking-[0.01em]"
                style={{ animationDelay: '0.2s' }}
              >
                BUILT
              </div>
              <div
                className="hero-line font-display text-[clamp(4.5rem,12vw,9.5rem)] leading-[0.88] gold-shimmer tracking-[0.01em]"
                style={{ animationDelay: '0.38s' }}
              >
                RIGHT.
              </div>
              <div
                className="hero-line font-display text-[clamp(4.5rem,12vw,9.5rem)] leading-[0.88] text-warm-100 tracking-[0.01em]"
                style={{ animationDelay: '0.56s' }}
              >
                BUILT TO
              </div>
              <div
                className="hero-line font-display text-[clamp(4.5rem,12vw,9.5rem)] leading-[0.88] gold-shimmer tracking-[0.01em]"
                style={{ animationDelay: '0.72s' }}
              >
                LAST.
              </div>
            </div>

            <p className="hero-body font-body text-warm-300 text-lg leading-relaxed max-w-lg">
              JFC Renovations delivers expert craftsmanship across Queens, Manhattan, Brooklyn, and
              all NYC boroughs — residential &amp; commercial, small and large. Every project, done right.
            </p>

            <div className="hero-cta flex flex-wrap gap-4 mt-9">
              <a
                href="#contact"
                className="bg-brand-500 hover:bg-brand-400 text-ink-900 px-9 py-4 font-heading text-sm tracking-[0.2em] uppercase transition-all hover:shadow-xl hover:shadow-brand-500/25 hover:-translate-y-px"
              >
                Get Free Estimate
              </a>
              <a
                href="#services"
                className="border border-warm-100/20 hover:border-brand-500/60 text-warm-200 hover:text-brand-400 px-9 py-4 font-heading text-sm tracking-[0.2em] uppercase transition-all"
              >
                Our Services
              </a>
            </div>
          </div>

          {/* Right: Floating stat cards */}
          <div className="hidden lg:flex flex-col gap-4 min-w-[220px]">
            {[
              { num: '25+', label: 'Years Experience', sub: 'Serving NYC since 2007' },
              { num: '1,000+', label: 'Projects Done', sub: 'Residential & commercial' },
              { num: '100%', label: 'Licensed & Insured', sub: 'NYS certified contractor' },
            ].map(({ num, label, sub }, i) => (
              <div
                key={num}
                className="hero-stat border border-warm-100/[0.07] bg-white/[0.025] backdrop-blur-sm px-6 py-5 hover:border-brand-500/40 transition-colors group"
                style={{ animationDelay: `${0.7 + i * 0.14}s` }}
              >
                <div className="font-display text-5xl text-brand-400 leading-none group-hover:text-brand-300 transition-colors">
                  {num}
                </div>
                <div className="font-heading text-warm-100 text-sm tracking-wide mt-1">{label}</div>
                <div className="font-body text-warm-400/70 text-xs italic mt-0.5">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.35), transparent)' }}
      />
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: <KitchenSvg />,
    title: 'Kitchen Renovations',
    desc: 'Complete kitchen transformations — custom cabinetry, stone countertops, new layouts, and finishes built to last.',
  },
  {
    icon: <BathroomSvg />,
    title: 'Bathroom Renovations',
    desc: 'Full bath overhauls from tile and vanities to walk-in showers, soaking tubs, and plumbing reconfigurations.',
  },
  {
    icon: <FlooringSvg />,
    title: 'All Types of Flooring',
    desc: 'Hardwood, engineered wood, ceramic tile, LVP, laminate, and more — expertly installed in any room.',
  },
  {
    icon: <PlasteringSvg />,
    title: 'Plastering',
    desc: 'Smooth wall finishes, skim coats, patch repairs, and decorative plaster work for walls and ceilings.',
  },
  {
    icon: <PaintingSvg />,
    title: 'Painting',
    desc: 'Interior and exterior painting with premium paints, meticulous prep, and crisp professional results.',
  },
  {
    icon: <CarpentrySvg />,
    title: 'Carpentry',
    desc: 'Custom trim, moldings, built-ins, doors, and fine woodworking crafted to fit your space perfectly.',
  },
  {
    icon: <ClosetSvg />,
    title: 'Closets',
    desc: 'Custom closet design and build — walk-ins, reach-ins, and built-in storage solutions for every room.',
  },
  {
    icon: <RadiatorSvg />,
    title: 'Radiator Covers',
    desc: 'Custom-built radiator covers that blend seamlessly with your interior while improving safety and style.',
  },
]

function Services() {
  const gridRef = useStaggerReveal(SERVICES.length, 90)

  return (
    <section id="services" className="py-24 bg-ink-800">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="What We Do"
          headline={<>OUR<br />SERVICES</>}
          sub="Residential & commercial renovation work across Queens, Manhattan, Brooklyn and all NYC boroughs — small jobs and large, done right."
        />

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="group border border-white/[0.06] bg-ink-900/60 p-7 hover:border-brand-500/50 hover:bg-ink-900/90 transition-all duration-300 cursor-default"
            >
              <div className="text-brand-500 mb-5 group-hover:scale-110 group-hover:text-brand-400 transition-all duration-300">
                {icon}
              </div>
              <h3 className="font-heading text-warm-100 text-lg tracking-wide mb-2.5 group-hover:text-brand-300 transition-colors">
                {title}
              </h3>
              <p className="font-body text-warm-400 text-sm leading-relaxed">{desc}</p>
              <div className="mt-5 w-0 group-hover:w-12 h-px bg-brand-500/60 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const leftRef = useReveal('reveal-left')
  const rightRef = useReveal('reveal-right')

  return (
    <section id="about" className="py-24 bg-ink-900 texture-overlay">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
          {/* Image side */}
          <div ref={leftRef} className="relative">
            {/* Main image area */}
            <div className="aspect-[9/20] bg-ink-800 relative overflow-hidden border border-white/[0.06]">
              <Image
                src="/images/owner.jpg"
                alt="JFC Pro-Renovations owner"
                fill
                className="object-cover object-center"
                priority
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, #111111 0%, transparent 60%)' }}
              />
            </div>

            {/* Corner accents */}
            <div className="absolute -bottom-4 -right-4 w-28 h-28 border-b-2 border-r-2 border-brand-500/50 pointer-events-none" />
            <div className="absolute -top-4 -left-4 w-18 h-18 border-t-2 border-l-2 border-brand-700/30 pointer-events-none" />

            {/* Floating badge */}
            <div className="absolute bottom-8 left-8 bg-brand-500 text-ink-900 px-5 py-4">
              <div className="font-display text-4xl leading-none">25+</div>
              <div className="font-heading text-[0.65rem] tracking-[0.2em] uppercase mt-1">
                Years in NYC
              </div>
            </div>
          </div>

          {/* Text side */}
          <div ref={rightRef}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-500" />
              <span className="font-heading text-brand-400 text-xs tracking-[0.4em] uppercase">
                Who We Are
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl leading-[0.92] text-warm-100 mb-7">
              NYC&apos;S<br />
              <span className="gold-shimmer">TRUSTED</span>
              <br />
              RENOVATORS
            </h2>

            <div className="space-y-4 font-body text-warm-400 leading-relaxed">
              <p>
                JFC Renovations has been transforming homes and businesses across Queens, Manhattan, Brooklyn,
                and all of NYC since 2007. Over 1,000 completed projects — residential and commercial — built
                on honest work and exceptional craftsmanship.
              </p>
              <p>
                As a fully licensed and insured New York contractor, we take on projects of every size:
                from a single bathroom refresh to full interior renovations for commercial spaces. No job
                is too small, and no project is too large.
              </p>
              <p>
                We&apos;re not a franchise. We&apos;re your neighbors, and we treat every space we work in
                as if it were our own.
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {[
                'Fully licensed & insured in New York State',
                'Free, no-obligation in-home estimates',
                'Local family-run business since 2007',
                'All work backed by a written guarantee',
                'We pull all required permits — always above board',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="text-brand-400 mt-0.5 flex-shrink-0">
                    <CheckIcon />
                  </span>
                  <span className="font-body text-warm-300 text-sm">{point}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-block mt-9 bg-brand-500 hover:bg-brand-400 text-ink-900 px-9 py-4 font-heading text-sm tracking-[0.2em] uppercase transition-all hover:shadow-xl hover:shadow-brand-500/25 hover:-translate-y-px"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── STATS BAND ───────────────────────────────────────────────────────────────
function StatsBand() {
  const ref = useStaggerReveal(4, 80)

  return (
    <section className="bg-brand-500 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-2 divide-x-0 md:divide-x divide-ink-900/20">
          {[
            { num: '25+', label: 'Years Experience' },
            { num: '1,000+', label: 'Projects Completed' },
            { num: '5★', label: 'Average Rating' },
            { num: '100%', label: 'Licensed & Insured' },
          ].map(({ num, label }) => (
            <div key={num} className="text-center px-4">
              <div className="font-display text-5xl md:text-6xl text-ink-900 leading-none">{num}</div>
              <div className="font-heading text-ink-900/60 text-xs tracking-[0.25em] uppercase mt-1.5">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
const WHY_ITEMS = [
  {
    title: 'Free Estimates',
    desc: 'We come to you. A detailed, written estimate with no pressure and no obligation — ever.',
  },
  {
    title: 'Licensed & Insured',
    desc: 'Fully licensed by New York State and fully insured. Your home and your investment are protected.',
  },
  {
    title: 'Local Expertise',
    desc: 'Queens-born and raised. We know NYC homes — the quirks, the codes, and how to do it right.',
  },
  {
    title: 'Quality Materials',
    desc: 'We use only premium materials and have long-standing relationships with trusted local suppliers.',
  },
  {
    title: 'On-Time Delivery',
    desc: 'We set realistic timelines and honor them. No unexplained delays, no moving goalposts.',
  },
  {
    title: 'Satisfaction Guaranteed',
    desc: "Every project comes with a written warranty — we don't consider a job done until you love it.",
  },
]

function WhyChooseUs() {
  const gridRef = useStaggerReveal(WHY_ITEMS.length, 90)

  return (
    <section className="py-24 bg-ink-800">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="The JFC Difference"
          headline={<>WHY<br />CHOOSE US</>}
        />

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_ITEMS.map(({ title, desc }) => (
            <div
              key={title}
              className="group border-l-2 border-brand-600/30 hover:border-brand-500 bg-ink-900/40 hover:bg-ink-900/80 pl-6 pr-5 py-6 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-brand-400">
                  <CheckIcon />
                </span>
                <h3 className="font-heading text-warm-100 text-base tracking-wide group-hover:text-brand-300 transition-colors">
                  {title}
                </h3>
              </div>
              <p className="font-body text-warm-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  { label: 'Kitchen Remodel', cols: 2, rows: 2, src: '/images/kitchen-1.jpg' },
  { label: 'Luxury Bathroom', cols: 1, rows: 1, src: '/images/bathroom-1.jpg' },
  { label: 'Modern Kitchen', cols: 1, rows: 1, src: '/images/kitchen-2.jpg' },
  { label: 'Kitchen Renovation', cols: 1, rows: 1, src: '/images/kitchen-3.jpg' },
  { label: 'Home Addition', cols: 2, rows: 1, src: null },
  { label: 'Bathroom Tile Work', cols: 1, rows: 1, src: null },
  { label: 'Hardwood Floors', cols: 1, rows: 1, src: null },
  { label: 'Exterior Paint', cols: 1, rows: 1, src: null },
]

function Gallery() {
  const gridRef = useStaggerReveal(GALLERY_ITEMS.length, 60)

  return (
    <section id="gallery" className="py-24 bg-ink-900 texture-overlay">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Our Portfolio"
          headline={<>RECENT<br />WORK</>}
          sub="A selection of completed projects across Queens and the greater NYC area."
        />

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[220px]"
        >
          {GALLERY_ITEMS.map(({ label, cols, rows, src }) => (
            <div
              key={label}
              className="group relative overflow-hidden border border-white/[0.05] bg-ink-800/60 hover:border-brand-500/40 transition-all duration-300 cursor-pointer"
              style={{
                gridColumn: `span ${cols}`,
                gridRow: `span ${rows}`,
              }}
            >
              {src ? (
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, #ccc 0, #ccc 1px, transparent 0, transparent 48px), repeating-linear-gradient(90deg, #ccc 0, #ccc 1px, transparent 0, transparent 48px)',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-warm-400/20 text-xs tracking-widest uppercase text-center px-3">
                      {label}
                    </span>
                  </div>
                </>
              )}
              {/* Hover reveal label */}
              <div className="absolute bottom-0 left-0 right-0 p-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: 'linear-gradient(to top, rgba(8,12,24,0.95), transparent)' }}
              >
                <span className="font-heading text-warm-200 text-sm tracking-wide">{label}</span>
              </div>
              {/* Gold overlay on hover */}
              <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/[0.06] transition-colors duration-300" />
            </div>
          ))}
        </div>

        <p className="text-center font-body text-warm-400/50 text-sm italic mt-6">
          Portfolio photos coming soon — contact us to request project examples and references.
        </p>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Maria Gonzalez',
    location: 'Woodside, Queens',
    text: "JFC completely transformed our kitchen. They were professional from day one, always showed up on time, and the quality of the work was outstanding. Our kitchen looks like it belongs in a magazine. Couldn't be happier.",
    stars: 5,
  },
  {
    name: 'Patrick Sullivan',
    location: 'Sunnyside, Queens',
    text: 'They finished our basement ahead of schedule and under budget. The team was respectful, clean, and the craftsmanship is top notch. My family uses the space every day. Will absolutely use JFC again.',
    stars: 5,
  },
  {
    name: 'Jennifer & Tom Kim',
    location: 'Jackson Heights, Queens',
    text: 'We got four estimates and JFC was the most thorough and honest. Our bathroom renovation came out beautifully — they turned a tiny NYC bathroom into something truly luxurious. Highly recommend.',
    stars: 5,
  },
]

function Testimonials() {
  const gridRef = useStaggerReveal(TESTIMONIALS.length, 130)

  return (
    <section className="py-24 bg-ink-800">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Client Stories"
          headline={<>WHAT OUR<br />CLIENTS SAY</>}
        />

        <div ref={gridRef} className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(({ name, location, text, stars }) => (
            <div
              key={name}
              className="border border-white/[0.06] bg-ink-900/50 p-7 flex flex-col hover:border-brand-500/30 transition-colors duration-300 group"
            >
              {/* Stars */}
              <div className="flex gap-0.5 text-brand-400 mb-5">
                {Array.from({ length: stars }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              {/* Opening quote mark */}
              <div className="font-display text-6xl text-brand-600/40 leading-none mb-1 -mt-1">&ldquo;</div>

              {/* Quote text */}
              <p className="font-body text-warm-300 text-sm leading-relaxed italic flex-1">{text}</p>

              {/* Attribution */}
              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <div className="font-heading text-warm-100 text-sm tracking-wide">{name}</div>
                <div className="flex items-center gap-1.5 text-warm-400/60 text-xs font-body mt-0.5">
                  <MapPinIcon />
                  {location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const leftRef = useReveal('reveal-left')
  const rightRef = useReveal('reveal-right')

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please call us directly at (718) 555-0100.')
    } finally {
      setSubmitting(false)
    }
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }))

  return (
    <section id="contact" className="py-24 bg-ink-900 texture-overlay">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-px bg-brand-500" />
            <span className="font-heading text-brand-400 text-xs tracking-[0.4em] uppercase">
              Get In Touch
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.92] text-warm-100">
            START YOUR
            <br />
            <span className="gold-shimmer">PROJECT</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20">
          {/* Contact info */}
          <div ref={leftRef}>
            <p className="font-body text-warm-300 text-lg leading-relaxed mb-10">
              Ready to transform your home? Contact us for a free, no-obligation estimate. We respond to
              all inquiries within 24 hours — usually the same day.
            </p>

            <div className="space-y-7">
              {[
                {
                  icon: <PhoneIcon />,
                  label: 'Phone',
                  content: (
                    <a
                      href="tel:7185550100"
                      className="font-body text-warm-200 text-lg hover:text-brand-400 transition-colors"
                    >
                      (718) 555-0100
                    </a>
                  ),
                },
                {
                  icon: <MailIcon />,
                  label: 'Email',
                  content: (
                    <a
                      href="mailto:jfcprorenovations@gmail.com"
                      className="font-body text-warm-200 hover:text-brand-400 transition-colors"
                    >
                      jfcprorenovations@gmail.com
                    </a>
                  ),
                },
                {
                  icon: <MapPinIcon />,
                  label: 'Service Area',
                  content: (
                    <div className="font-body text-warm-300 text-sm leading-relaxed">
                      41-31 51st St, Apt. 4G<br />Woodside, Queens, NY
                      <br />
                      <span className="text-warm-400/60">Serving Queens, Manhattan, Brooklyn &amp; all NYC boroughs</span>
                    </div>
                  ),
                },
                {
                  icon: <ClockIcon />,
                  label: 'Hours',
                  content: (
                    <div className="font-body text-warm-300 text-sm leading-relaxed">
                      Mon – Fri: 7:00 AM – 6:00 PM
                      <br />
                      Saturday: 8:00 AM – 4:00 PM
                      <br />
                      <span className="text-warm-400/60">Sunday: By appointment</span>
                    </div>
                  ),
                },
              ].map(({ icon, label, content }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="text-brand-400 mt-0.5 flex-shrink-0">{icon}</div>
                  <div>
                    <div className="font-heading text-warm-300/70 text-xs tracking-[0.3em] uppercase mb-1.5">
                      {label}
                    </div>
                    {content}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 border border-brand-500/25 bg-brand-500/[0.04]">
              <div className="font-heading text-brand-400 text-xs tracking-[0.3em] uppercase mb-2">
                Free Estimates
              </div>
              <p className="font-body text-warm-300 text-sm leading-relaxed">
                We provide free in-home estimates for all projects. No hard sell, no hidden fees — just
                honest advice and a clear scope of work.
              </p>
            </div>
          </div>

          {/* Form */}
          <div ref={rightRef}>
            {submitted ? (
              <div className="border border-brand-500/30 bg-brand-500/[0.04] p-12 text-center flex flex-col items-center justify-center min-h-[480px]">
                <div className="text-brand-400 mb-5">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="9 12 11 14 15 10" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="font-display text-4xl text-warm-100 mb-3">Message Sent!</h3>
                <p className="font-body text-warm-300 text-sm leading-relaxed max-w-xs">
                  Thank you for reaching out. We&apos;ll be in touch within 24 hours to discuss your project.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-heading text-warm-400/70 text-[0.65rem] tracking-[0.3em] uppercase mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={set('name')}
                      className="form-input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-warm-400/70 text-[0.65rem] tracking-[0.3em] uppercase mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      className="form-input"
                      placeholder="(718) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-heading text-warm-400/70 text-[0.65rem] tracking-[0.3em] uppercase mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set('email')}
                    className="form-input"
                    placeholder="you@email.com"
                  />
                </div>

                <div>
                  <label className="block font-heading text-warm-400/70 text-[0.65rem] tracking-[0.3em] uppercase mb-2">
                    Service Needed
                  </label>
                  <select
                    value={form.service}
                    onChange={set('service')}
                    className="form-input"
                    style={{ backgroundColor: '#1A1A1A' }}
                  >
                    <option value="">Select a service...</option>
                    <option value="kitchen">Kitchen Remodeling</option>
                    <option value="bathroom">Bathroom Renovation</option>
                    <option value="basement">Basement Finishing</option>
                    <option value="addition">Home Addition</option>
                    <option value="flooring">Flooring</option>
                    <option value="painting">Painting</option>
                    <option value="other">Other / Multiple</option>
                  </select>
                </div>

                <div>
                  <label className="block font-heading text-warm-400/70 text-[0.65rem] tracking-[0.3em] uppercase mb-2">
                    Project Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    className="form-input resize-none"
                    placeholder="Tell us about your project — scope, timeline, any questions..."
                  />
                </div>

                {error && (
                  <p className="font-body text-red-400/80 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-500 hover:bg-brand-400 disabled:bg-brand-700 disabled:cursor-not-allowed text-ink-900 py-4 font-heading text-sm tracking-[0.25em] uppercase transition-all hover:shadow-xl hover:shadow-brand-500/25"
                >
                  {submitting ? 'Sending...' : 'Request Free Estimate'}
                </button>

                <p className="font-body text-warm-400/40 text-xs text-center">
                  No spam. No obligation. We respond within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-white/[0.04] py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl tracking-[0.15em] text-brand-400">
              JFC RENOVATIONS
            </div>
            <div className="font-body text-warm-400/50 text-xs mt-0.5">
              Woodside, Queens, New York
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6">
            {['Services', 'About', 'Gallery', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-heading text-warm-400/50 hover:text-brand-400 text-xs tracking-[0.3em] uppercase transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="text-center md:text-right">
            <p className="font-body text-warm-400/35 text-xs leading-relaxed">
              &copy; {new Date().getFullYear()} JFC Renovations.
              <br />
              Licensed &amp; Insured · New York State
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <About />
      <StatsBand />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
