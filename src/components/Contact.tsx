'use client'

import { useRef, useState } from 'react'
import { useEffect } from 'react'

function useScrollAnimation(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

export default function Contact() {
  const headRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useScrollAnimation(headRef as React.RefObject<HTMLElement>)
  useScrollAnimation(formRef as React.RefObject<HTMLElement>)

  const handleSubmit = async () => {
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1200))
    setStatus('sent')
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'var(--bg-3)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box' as const,
  }

  return (
    <section id="contact" style={{ padding: '120px 32px', position: 'relative', overflow: 'hidden' }}>
      {/* BG glow */}
      <div style={{
        position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(ellipse, rgba(74,242,161,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div ref={headRef} className="section-animate" style={{ marginBottom: '48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em' }}>04 / CONTACT</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '16px' }}>
            Let's work together
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            Have a project in mind or just want to chat? My inbox is always open. I'll get back to you within 24 hours.
          </p>
        </div>

        {/* Form */}
        <div ref={formRef} className="section-animate">
          {status === 'sent' ? (
            <div style={{
              textAlign: 'center', padding: '48px',
              background: 'var(--bg-2)',
              border: '1px solid rgba(74,242,161,0.2)',
              borderRadius: '16px',
            }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>✓</div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 600, color: 'var(--accent)', marginBottom: '8px' }}>Message sent!</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-muted)' }}>I'll get back to you soon. Talk soon!</p>
            </div>
          ) : (
            <div style={{
              background: 'var(--bg-2)',
              border: '1px solid var(--bg-3)',
              borderRadius: '16px',
              padding: '40px',
              display: 'flex', flexDirection: 'column', gap: '20px',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>NAME</label>
                  <input
                    type="text" placeholder="Your name"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'rgba(74,242,161,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(74,242,161,0.06)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>EMAIL</label>
                  <input
                    type="email" placeholder="you@example.com"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'rgba(74,242,161,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(74,242,161,0.06)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>MESSAGE</label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(74,242,161,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(74,242,161,0.06)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={status === 'sending'}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '14px',
                  background: status === 'sending' ? 'var(--accent-dim)' : 'var(--accent)',
                  color: status === 'sending' ? 'var(--accent)' : '#050a07',
                  border: 'none', borderRadius: '8px',
                  padding: '14px 28px', cursor: 'pointer',
                  fontWeight: 500, letterSpacing: '0.01em',
                  transition: 'all 0.25s ease',
                  display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center',
                }}
                onMouseEnter={e => { if (status !== 'sending') { (e.target as HTMLElement).style.transform = 'translateY(-2px)'; (e.target as HTMLElement).style.boxShadow = '0 8px 24px rgba(74,242,161,0.25)'; } }}
                onMouseLeave={e => { (e.target as HTMLElement).style.transform = ''; (e.target as HTMLElement).style.boxShadow = ''; }}
              >
                {status === 'sending' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25"/><path d="M21 12a9 9 0 01-9 9"/></svg>
                    Sending...
                  </>
                ) : 'Send Message →'}
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}
