'use client'

import { useEffect, useRef, useState } from 'react'

const roles = ['AI Engineer', 'Data Analyst', 'Computer Vision Engineer', 'Data Scientist', 'Software Engineer']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 32px 80px',
      }}
    >
      {/* Background grid */}
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />

      {/* Gradient orbs */}
      <div style={{
        position: 'absolute', top: '15%', right: '-5%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(74,242,161,0.07) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(126,184,247,0.06) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative' }}>
        <div ref={containerRef}>

          {/* Status badge */}
          <div style={{ marginBottom: '32px', animation: 'fadeUp 0.6s ease both', animationDelay: '0.1s', opacity: 0 }} className="animate-fade-up">
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: 'var(--accent)', background: 'var(--accent-dim)',
              border: '1px solid rgba(74,242,161,0.2)',
              padding: '6px 14px', borderRadius: '100px', letterSpacing: '0.05em',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulse-glow 2s ease infinite' }} />
              Let’s Build Something Impactful
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            animation: 'fadeUp 0.7s ease both',
            animationDelay: '0.2s',
            color: 'var(--text)',
          }}>
            Hi, I'm Miguel.
          </h1>

          {/* Typed role */}
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '32px',
            animation: 'fadeUp 0.7s ease both',
            animationDelay: '0.3s',
            height: 'clamp(2.4rem, 6vw, 5.5rem)',
            display: 'flex', alignItems: 'flex-start',
          }}>
            <span className="gradient-text">{displayed}</span>
            <span style={{ display: 'inline-block', width: '3px', height: '0.85em', marginLeft: '6px', marginTop: '0.1em', background: 'var(--accent)', borderRadius: '2px', animation: 'blink 1s step-end infinite' }} />
          </div>

          {/* Description */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: 'var(--text-muted)',
            lineHeight: 1.7,
            maxWidth: '520px',
            marginBottom: '48px',
            fontWeight: 400,
            animation: 'fadeUp 0.7s ease both',
            animationDelay: '0.4s',
          }}>
            I architect machine learning systems with rigorous data pipelines, optimized model training, and production deployment. Building intelligent solutions grounded in statistical learning and real-world impact.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', animation: 'fadeUp 0.7s ease both', animationDelay: '0.5s' }}>
            <a
              href="#projects"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '14px',
                background: 'var(--accent)', color: '#050a07',
                padding: '13px 28px', borderRadius: '8px',
                textDecoration: 'none', fontWeight: 500,
                transition: 'all 0.25s ease', letterSpacing: '0.01em',
                border: '1px solid var(--accent)',
              }}
              onMouseEnter={e => { const el = e.target as HTMLElement; el.style.background = '#3dd98c'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 24px rgba(74,242,161,0.25)'; }}
              onMouseLeave={e => { const el = e.target as HTMLElement; el.style.background = 'var(--accent)'; el.style.transform = ''; el.style.boxShadow = ''; }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '14px',
                background: 'transparent', color: 'var(--text)',
                padding: '13px 28px', borderRadius: '8px',
                textDecoration: 'none', fontWeight: 400,
                border: '1px solid var(--border)', letterSpacing: '0.01em',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => { const el = e.target as HTMLElement; el.style.borderColor = 'var(--text-subtle)'; el.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { const el = e.target as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.transform = ''; }}
            >
              Get In Touch
            </a>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'flex', gap: '40px', flexWrap: 'wrap',
            marginTop: '72px',
            paddingTop: '40px',
            borderTop: '1px solid var(--bg-3)',
            animation: 'fadeUp 0.7s ease both',
            animationDelay: '0.7s',
          }}>
            {[
              { num: '4+', label: 'Years Experience' },
              { num: '47+', label: 'Projects Shipped' },
              { num: '50+', label: 'Models Deployed' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--text)', lineHeight: 1, marginBottom: '4px' }}>{stat.num}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        animation: 'fadeIn 1s ease 1.2s both',
      }}>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--text-subtle), transparent)' }} />
      </div>
    </section>
  )
}
