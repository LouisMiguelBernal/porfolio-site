'use client'

import { time } from 'console'
import { useEffect, useRef } from 'react'

const experience = [
  {
    role: 'Data Analyst',
    company: 'PASIA – Procurement and Supply Institute of Asia',
    period: 'June 2025 — Auguest 2025',
    desc: 'Optimized SQL ETL pipelines for automated ingestion and transformation of high-volume procurement data, ensuring 99% consistency across departments and daily data refreshes for real-time insights',
    tags: ['Python', 'SQL', 'PowerBI', 'Excel'],
  },
  {
    role: 'Full Stack Developer',
    company: 'Vanta Systems',
    period: '2020 — 2022',
    desc: 'Built and maintained 5 customer-facing products used by 80K+ users. Owned the migration from a monolithic Rails app to a microservices architecture using Node.js and Docker.',
    tags: ['React', 'Node.js', 'Ruby on Rails', 'AWS'],
  },
  {
    role: 'Frontend Engineer',
    company: 'Studio Flux',
    period: '2019 — 2020',
    desc: 'Delivered high-quality UI for fintech and SaaS clients. Collaborated closely with designers to translate Figma mockups into pixel-perfect, accessible React components.',
    tags: ['React', 'TypeScript', 'Storybook'],
  },
]

function useScrollAnimation(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

export default function About() {
  const headRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const expRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(headRef as React.RefObject<HTMLElement>)
  useScrollAnimation(bioRef as React.RefObject<HTMLElement>)
  useScrollAnimation(expRef as React.RefObject<HTMLElement>)

  return (
    <section id="about" style={{ padding: '120px 32px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headRef} className="section-animate" style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em' }}>/ ABOUT</span>
            <div style={{ height: '1px', flex: 1, background: 'var(--bg-3)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Professional Overview
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>
          {/* Bio */}
          <div ref={bioRef} className="section-animate">
            {/* Avatar placeholder */}
            <div style={{
              width: '80px', height: '80px', borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--accent-dim), var(--accent-2-dim))',
              border: '1px solid var(--border)',
              marginBottom: '28px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '32px',
            }}>
              👨‍💻
            </div>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '20px' }}>
              I'm a full stack developer with 5 years of professional experience building 
              products at startups and agencies. I care deeply about <span style={{ color: 'var(--text)' }}>developer experience</span>, 
              code quality, and shipping things that actually work.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '32px' }}>
              When I'm not coding, I'm usually reading about distributed systems, tinkering with 
              side projects, or hiking somewhere quiet. Based in <span style={{ color: 'var(--text)' }}>San Francisco, CA</span>.
            </p>

            {/* Info chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Email', value: 'Louis Miguel Bernal@example.com', href: 'mailto:Louis Miguel Bernal@example.com' },
                { label: 'GitHub', value: 'github.com/Louis Miguel Bernalchen', href: '#' },
                { label: 'LinkedIn', value: 'linkedin.com/in/Louis Miguel Bernalchen', href: '#' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.05em', minWidth: '60px' }}>{item.label}</span>
                  <a href={item.href} style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--accent)', textDecoration: 'none', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.opacity = '0.7'}
                    onMouseLeave={e => (e.target as HTMLElement).style.opacity = '1'}>
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline */}
          <div ref={expRef} className="section-animate">
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-subtle)', letterSpacing: '0.1em', marginBottom: '28px' }}> EXPERIENCE</h3>
            <div style={{ position: 'relative' }}>
              {/* Timeline line */}
              <div style={{ position: 'absolute', left: '6px', top: '6px', bottom: '0', width: '1px', background: 'var(--bg-3)' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                {experience.map((exp, i) => (
                  <div key={i} style={{ paddingLeft: '28px', position: 'relative' }}>
                    {/* Dot */}
                    <div style={{
                      position: 'absolute', left: 0, top: '6px',
                      width: '13px', height: '13px', borderRadius: '50%',
                      background: i === 0 ? 'var(--accent)' : 'var(--bg-3)',
                      border: `2px solid ${i === 0 ? 'var(--accent)' : 'var(--bg-3)'}`,
                      boxShadow: i === 0 ? '0 0 10px rgba(74,242,161,0.4)' : 'none',
                    }} />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>{exp.role}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.03em' }}>{exp.period}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', marginBottom: '10px', letterSpacing: '0.02em' }}>{exp.company}</div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '12px' }}>{exp.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {exp.tags.map(tag => (
                        <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', background: 'var(--bg-3)', padding: '2px 8px', borderRadius: '3px' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
