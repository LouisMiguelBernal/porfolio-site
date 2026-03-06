'use client'

import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

function useScrollAnimation(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

function PhoneIcon({ size = 20, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3"/>
    </svg>
  )
}

const contactLinks = [
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/louisbernal',
    href: 'https://www.linkedin.com/in/louisbernal/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'GITHUB',
    value: 'github.com/LouisMiguelBernal',
    href: 'https://github.com/LouisMiguelBernal',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'EMAIL',
    value: 'miguellouis.work@gmail.com',
    href: 'mailto:miguellouis.work@gmail.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'LOCATION',
    value: 'Cavite, Philippines',
    href: null,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const headRef  = useRef<HTMLDivElement>(null)
  const leftRef  = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(headRef  as React.RefObject<HTMLElement>)
  useScrollAnimation(leftRef  as React.RefObject<HTMLElement>)
  useScrollAnimation(rightRef as React.RefObject<HTMLElement>)

  const [form, setForm]           = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending]     = useState(false)
  const [error, setError]         = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.')
      return
    }
    setSending(true)
    setError('')

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name:    form.name,
          email:   form.email,
          subject: form.subject || 'No Subject',
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setSubmitted(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    padding: '14px 16px',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--text)',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box' as const,
  }

  return (
    <section id="contact" style={{ padding: '120px 32px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <div ref={headRef} className="section-animate" style={{ marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            border: '1px solid var(--border)', borderRadius: '999px',
            padding: '5px 14px', marginBottom: '20px',
          }}>
            <PhoneIcon size={14} color="var(--accent)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Contact
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: 'var(--text)',
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
          }}>
            Let's Work Together
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.65 }}>
            Open to meaningful collaborations, opportunities, and new connections.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px', alignItems: 'stretch' }}>

          {/* ── LEFT: info card ── */}
          <div ref={leftRef} className="section-animate" style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '36px 32px',
            position: 'relative',
            overflow: 'hidden',
            height: '100%',
            boxSizing: 'border-box' as const,
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
              background: 'linear-gradient(90deg, var(--accent), transparent)',
            }} />

            <h3 style={{
              fontFamily: 'var(--font-sans)', fontSize: '26px', fontWeight: 700,
              color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: 1.1,
            }}>
              My Inbox is Always Open
            </h3>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '14px',
              color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '36px',
            }}>
              Reach out through any of the channels below. I'll get back to you within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {contactLinks.map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-mono)', fontSize: '10px',
                      color: 'var(--accent)', letterSpacing: '0.12em',
                      marginBottom: '2px',
                    }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
                          color: 'var(--text)', textDecoration: 'none', transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: form card ── */}
          <div ref={rightRef} className="section-animate" style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '36px 32px',
            position: 'relative',
            overflow: 'hidden',
            transitionDelay: '0.1s',
            height: '100%',
            boxSizing: 'border-box' as const,
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
              background: 'linear-gradient(90deg, var(--accent), transparent)',
            }} />

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'var(--accent-dim)',
                  border: '1px solid rgba(74,242,161,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
                  Message Sent!
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-muted)' }}>
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                {/* Name + Email row */}
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.12em', marginBottom: '8px' }}>
                      FULL NAME
                    </label>
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      placeholder="John Doe"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.12em', marginBottom: '8px' }}>
                      EMAIL ADDRESS
                    </label>
                    <input
                      name="email" value={form.email} onChange={handleChange}
                      placeholder="john@example.com" type="email"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.12em', marginBottom: '8px' }}>
                    SUBJECT
                  </label>
                  <input
                    name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Project Inquiry"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                {/* Message */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.12em', marginBottom: '8px' }}>
                    MESSAGE
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                    onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div style={{
                    marginBottom: '16px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255,80,80,0.08)',
                    border: '1px solid rgba(255,80,80,0.25)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    color: '#ff6b6b',
                  }}>
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  style={{
                    width: '100%',
                    background: sending ? 'var(--surface)' : 'var(--accent)',
                    border: 'none', borderRadius: '10px',
                    padding: '15px 24px',
                    fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 700,
                    color: sending ? 'var(--text-muted)' : '#050a07',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'all 0.2s', letterSpacing: '0.02em',
                    marginBottom: '16px',
                  }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.opacity = '0.88' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                >
                  {sending ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>

                {/* Footer note */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.05em' }}>
                    End-to-end encrypted communication
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
