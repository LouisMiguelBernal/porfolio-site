'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(8,11,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(30,45,61,0.5)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: 'var(--accent)',
            background: 'var(--accent-dim)',
            padding: '4px 10px',
            borderRadius: '4px',
            border: '1px solid rgba(74,242,161,0.2)',
            letterSpacing: '0.05em',
          }}>LM</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '15px', color: 'var(--text)', letterSpacing: '-0.01em' }}>Louis Miguel Bernal</span>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: active === link.href ? 'var(--accent)' : 'var(--text-muted)',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'color 0.2s, background 0.2s',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--text)'; (e.target as HTMLElement).style.background = 'var(--bg-3)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = active === link.href ? 'var(--accent)' : 'var(--text-muted)'; (e.target as HTMLElement).style.background = 'transparent'; }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            style={{
              marginLeft: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              color: 'var(--accent)',
              border: '1px solid rgba(74,242,161,0.3)',
              padding: '7px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'all 0.2s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => { const el = e.target as HTMLElement; el.style.background = 'var(--accent-dim)'; el.style.borderColor = 'var(--accent)'; }}
            onMouseLeave={e => { const el = e.target as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(74,242,161,0.3)'; }}
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: '4px' }}
          className="mobile-burger"
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            {menuOpen
              ? <><path d="M6 18L18 6M6 6l12 12" /></>
              : <><path d="M4 6h16M4 12h16M4 18h16" /></>}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(8,11,15,0.97)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)', padding: '16px 32px 24px',
          display: 'flex', flexDirection: 'column', gap: '4px',
        }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid var(--bg-3)' }}>
              {link.label}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--accent)', textDecoration: 'none' }}>
            Resume ↗
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
