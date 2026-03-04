'use client'

import { useEffect, useRef, useState } from 'react'

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
    company: 'Computer Science & Information Technology Program Council',
    period: '2022 — 2025',
    desc: 'Led the programming and creatives committee, overseeing technical initiatives, event development, and creative direction across the organization.',
    tags: ['Programming', 'Project Management', 'Creative Direction'],
    type: 'org',
  },
  {
    role: 'Executive Committee Director — Finance & Public Relations',
    company: 'DLSUD Council of Student Organizations',
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
    company: 'Technosaders · De La Salle Medical and Health Sciences Institute',
    period: '2021 — 2022',
    desc: 'Served as a specialist for the Programming and Algorithm Department, applying collaborative leadership and analytical skills in Cavite, Calabarzon, Philippines.',
    tags: ['Robotics', 'Analytical Skills', 'Algorithms'],
    type: 'org',
  },
]

const photos = [
  '/pictures/1.jpg',
  '/pictures/2.jpg',
  '/pictures/3.jpg',
  '/pictures/4.jpg',
  '/pictures/5.jpg',
  '/pictures/6.jpg',
  '/pictures/7.jpg',
  '/pictures/8.jpg',
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

function PhotoSlideshow() {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [sliding, setSliding] = useState(false)

  const advance = (next: number) => {
    if (sliding) return
    setPrev(current)
    setSliding(true)
    setCurrent(next)
    setTimeout(() => {
      setPrev(null)
      setSliding(false)
    }, 550)
  }

  useEffect(() => {
    const id = setInterval(() => {
      advance((current + 1) % photos.length)
    }, 3200)
    return () => clearInterval(id)
  }, [current, sliding])

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0.7; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0);     opacity: 1; }
          to   { transform: translateX(-100%); opacity: 0.7; }
        }
      `}</style>

      <div style={{ marginBottom: '28px' }}>
        {/* Frame */}
        <div style={{
          width: '100%',
          aspectRatio: '4 / 3',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
        }}>
          {/* Accent top line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, var(--accent), var(--accent-2), #c084fc)',
            zIndex: 4,
          }} />

          {/* Outgoing */}
          {prev !== null && (
            <img
              src={photos[prev]}
              alt=""
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                animation: 'slideOutLeft 0.55s ease forwards',
                zIndex: 1,
              }}
            />
          )}

          {/* Current */}
          <img
            key={current}
            src={photos[current]}
            alt={`Photo ${current + 1}`}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              animation: sliding ? 'slideInRight 0.55s ease forwards' : 'none',
              zIndex: 2,
            }}
          />

          {/* Counter badge */}
          <div style={{
            position: 'absolute', bottom: '12px', right: '12px', zIndex: 5,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            borderRadius: '20px', padding: '4px 10px',
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: '#fff', letterSpacing: '0.06em',
          }}>
            {current + 1} / {photos.length}
          </div>

          {/* Prev / Next arrows */}
          {[
            { dir: -1, side: 'left' as const },
            { dir:  1, side: 'right' as const },
          ].map(({ dir, side }) => (
            <button
              key={side}
              onClick={() => advance((current + dir + photos.length) % photos.length)}
              style={{
                position: 'absolute', top: '50%', [side]: '10px',
                transform: 'translateY(-50%)',
                zIndex: 5,
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50%', width: '32px', height: '32px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#fff', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.4)')}
              aria-label={dir === -1 ? 'Previous' : 'Next'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {dir === -1
                  ? <polyline points="15 18 9 12 15 6" />
                  : <polyline points="9 18 15 12 9 6" />}
              </svg>
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '12px' }}>
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => advance(i)}
              aria-label={`Go to photo ${i + 1}`}
              style={{
                width: i === current ? '22px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === current ? 'var(--accent)' : 'var(--border)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>
      </div>
    </>
  )
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
            border: '1px solid var(--border)', borderRadius: '999px',
            padding: '5px 14px', marginBottom: '20px',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Information
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: 'var(--text)',
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
          }}>
            Professional Overview
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.65 }}>
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

            {/* Photo Slideshow */}
            <PhotoSlideshow />

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
                { label: 'School',   value: 'DLSUD — BSCS Intelligent Systems', href: 'https://www.dlsud.edu.ph/' },
                { label: 'GitHub',   value: 'github.com/LouisMiguelBernal',      href: 'https://github.com/LouisMiguelBernal' },
                { label: 'LinkedIn', value: 'linkedin.com/in/louisbernal',       href: 'https://www.linkedin.com/in/louisbernal/' },
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
            <div style={{ marginTop: '36px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {[
                { label: 'Work',         color: 'var(--accent)',   icon: '◈' },
                { label: 'Organization', color: 'var(--accent-2)', icon: '◉' },
                { label: 'Education',    color: '#c084fc',          icon: '⬡' },
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
                      <div style={{
                        position: 'absolute', left: 0, top: '5px',
                        width: '13px', height: '13px', borderRadius: '50%',
                        background: isFirst ? color : 'var(--bg-3)',
                        border: `2px solid ${isFirst ? color : 'var(--bg-3)'}`,
                        boxShadow: isFirst ? `0 0 10px ${color}55` : 'none',
                      }} />

                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'flex-start', marginBottom: '4px',
                        flexWrap: 'wrap', gap: '4px',
                      }}>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>
                          {exp.role}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.03em', flexShrink: 0 }}>
                          {exp.period}
                        </span>
                      </div>

                      <div style={{
                        fontFamily: 'var(--font-mono)', fontSize: '12px',
                        color: color, marginBottom: '10px', letterSpacing: '0.02em',
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}>
                        <span style={{ opacity: 0.7 }}>{TYPE_ICON[exp.type]}</span>
                        {exp.company}
                      </div>

                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '12px' }}>
                        {exp.desc}
                      </p>

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
