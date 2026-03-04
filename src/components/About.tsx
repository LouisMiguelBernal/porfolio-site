'use client'

import { useEffect, useRef } from 'react'

const experience = [
  {
    role: 'Data Analyst',
    company: 'PASIA – Procurement and Supply Institute of Asia',
    period: 'June 2025 — August 2025',
    desc: 'Optimized SQL ETL pipelines for automated ingestion and transformation of high-volume procurement data, ensuring 99% consistency across departments and daily data refreshes for real-time insights.',
    tags: ['Python', 'SQL', 'PowerBI', 'Excel'],
    type: 'work',
  },
  {
    role: 'Director — Programming & Creatives Committee',
    company: 'CSITPC',
    period: '2022 — 2025',
    desc: 'Led the programming and creatives committee, overseeing technical initiatives, event development, and creative direction across the organization.',
    tags: ['Programming', 'Project Management', 'Creative Direction'],
    type: 'org',
  },
  {
    role: 'Executive Committee Director — Finance & Public Relations',
    company: 'DLSUD CSO',
    period: '2022 — 2024',
    desc: 'Managed financial planning and public relations strategies for the student organization, coordinating cross-functional teams and external communications.',
    tags: ['Finance', 'Public Relations', 'Collaborative Leadership'],
    type: 'org',
  },
  {
    role: 'BS Computer Science — Intelligent Systems',
    company: 'De La Salle University Dasmariñas',
    period: '2022 — Present',
    desc: "Pursuing a Bachelor of Science in Computer Science with specialization in Intelligent Systems. Consistent Dean's Lister from 1st Year through 3rd Year.",
    tags: ['Machine Learning', 'AI', 'Data Science', "Dean's Lister"],
    type: 'edu',
  },
  {
    role: 'Gr. 12 Specialist — Programming & Algorithm Dept.',
    company: 'Technosaders · Full-time',
    period: '2021 — 2022',
    desc: 'Served as a specialist for the Programming and Algorithm Department, applying collaborative leadership and analytical skills in Cavite, Calabarzon, Philippines.',
    tags: ['Robotics', 'Analytical Skills', 'Algorithms'],
    type: 'org',
  },
]

const TYPE_ICON: Record<string, string> = {
  work: '◈',
  org:  '◉',
  edu:  '⬡',
}

const TYPE_COLOR: Record<string, string> = {
  work: 'var(--accent)',
  org:  'var(--accent-2)',
  edu:  '#c084fc',
}

function useScrollAnimation(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

export default function About() {
  const headRef = useRef<HTMLDivElement>(null)
  const bioRef  = useRef<HTMLDivElement>(null)
  const expRef  = useRef<HTMLDivElement>(null)
  useScrollAnimation(headRef as React.RefObject<HTMLElement>)
  useScrollAnimation(bioRef  as React.RefObject<HTMLElement>)
  useScrollAnimation(expRef  as React.RefObject<HTMLElement>)

  return (
    <section id="about" style={{ padding: '120px 32px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headRef} className="section-animate" style={{ marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            border: '1px solid #1e2d3d', borderRadius: '999px',
            padding: '5px 14px', marginBottom: '20px',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#e8edf2', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Information
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: '#e8edf2',
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
          }}>
            Professional Overview
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#6b8299', maxWidth: '480px', lineHeight: 1.65 }}>
            A peek into my background, roles, and the journey.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '64px',
          alignItems: 'start',
        }}>

          {/* ── Bio ── */}
          <div ref={bioRef} className="section-animate">
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
              I'm a <span style={{ color: 'var(--text)' }}>Computer Science student</span> at De La Salle University Dasmariñas,
              specializing in Intelligent Systems. I'm passionate about data, machine learning,
              and building tools that solve real problems.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '32px' }}>
              Outside of academics I lead technical committees, tinker with side projects,
              and chase the next interesting dataset. Based in{' '}
              <span style={{ color: 'var(--text)' }}>Cavite, Philippines</span>.
            </p>

            {/* Info chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'School',   value: 'DLSUD — BSCS Intelligent Systems',  href: 'https://www.dlsud.edu.ph/' },
                { label: 'GitHub',   value: 'https://github.com/LouisMiguelBernal.com/',            href: 'https://github.com/LouisMiguelBernal' },
                { label: 'LinkedIn', value: 'https://www.linkedin.com/in/louisbernal/.com',       href: 'https://www.linkedin.com/in/louisbernal/' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    color: 'var(--text-subtle)', letterSpacing: '0.05em', minWidth: '60px',
                  }}>
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-sans)', fontSize: '14px',
                      color: 'var(--accent)', textDecoration: 'none', transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{
              marginTop: '36px',
              display: 'flex', flexWrap: 'wrap', gap: '16px',
            }}>
              {[
                { label: 'Work',         color: 'var(--accent)',  icon: '◈' },
                { label: 'Organization', color: 'var(--accent-2)', icon: '◉' },
                { label: 'Education',    color: '#c084fc',         icon: '⬡' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: l.color, fontSize: '12px' }}>{l.icon}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.05em' }}>
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Experience / Education Timeline ── */}
          <div ref={expRef} className="section-animate">
            <h3 style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: 'var(--text-subtle)', letterSpacing: '0.1em', marginBottom: '28px',
            }}>
              EXPERIENCE & EDUCATION
            </h3>

            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute', left: '6px', top: '6px', bottom: '0',
                width: '1px', background: 'var(--bg-3)',
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                {experience.map((exp, i) => {
                  const color = TYPE_COLOR[exp.type]
                  const isFirst = i === 0

                  return (
                    <div key={i} style={{ paddingLeft: '28px', position: 'relative' }}>

                      {/* Timeline dot */}
                      <div style={{
                        position: 'absolute', left: 0, top: '5px',
                        width: '13px', height: '13px', borderRadius: '50%',
                        background: isFirst ? color : 'var(--bg-3)',
                        border: `2px solid ${isFirst ? color : 'var(--bg-3)'}`,
                        boxShadow: isFirst ? `0 0 10px ${color}55` : 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }} />

                      {/* Role + period */}
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'flex-start', marginBottom: '4px',
                        flexWrap: 'wrap', gap: '4px',
                      }}>
                        <span style={{
                          fontFamily: 'var(--font-sans)', fontSize: '15px',
                          fontWeight: 600, color: 'var(--text)',
                        }}>
                          {exp.role}
                        </span>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '11px',
                          color: 'var(--text-subtle)', letterSpacing: '0.03em',
                          flexShrink: 0,
                        }}>
                          {exp.period}
                        </span>
                      </div>

                      {/* Company — colored by type */}
                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                        color: color, marginBottom: '10px', letterSpacing: '0.02em',
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}>
                        <span style={{ opacity: 0.7 }}>{TYPE_ICON[exp.type]}</span>
                        {exp.company}
                      </div>

                      {/* Description */}
                      <p style={{
                        fontFamily: 'var(--font-sans)', fontSize: '13px',
                        color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '12px',
                      }}>
                        {exp.desc}
                      </p>

                      {/* Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {exp.tags.map(tag => (
                          <span key={tag} style={{
                            fontFamily: 'var(--font-mono)', fontSize: '11px',
                            color: 'var(--text-subtle)', background: 'var(--bg-3)',
                            padding: '2px 8px', borderRadius: '3px',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
