'use client'

import { useEffect, useRef } from 'react'

const skillGroups = [
  {
    category: 'Frontend',
    icon: '◈',
    color: 'var(--accent)',
    colorDim: 'var(--accent-dim)',
    skills: [
      { name: 'React / Next.js', level: 96 },
      { name: 'TypeScript', level: 92 },
      { name: 'CSS / Tailwind', level: 90 },
      { name: 'React Native', level: 78 },
    ],
  },
  {
    category: 'Backend',
    icon: '⬡',
    color: 'var(--accent-2)',
    colorDim: 'var(--accent-2-dim)',
    skills: [
      { name: 'Node.js / Express', level: 94 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'Redis', level: 82 },
      { name: 'Go', level: 70 },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: '◎',
    color: '#c084fc',
    colorDim: '#2d1b4e',
    skills: [
      { name: 'Docker / Kubernetes', level: 85 },
      { name: 'AWS / GCP', level: 80 },
      { name: 'CI/CD Pipelines', level: 88 },
      { name: 'Terraform', level: 68 },
    ],
  },
]

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go',
  'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'GCP',
  'GraphQL', 'REST', 'WebSockets', 'Prisma', 'tRPC', 'Zod',
  'Tailwind', 'Figma', 'Git', 'Vercel', 'Terraform', 'K8s',
]

function useScrollAnimation(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

function SkillCard({ group, delay }: { group: typeof skillGroups[0], delay: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible')
        // Animate bars
        const bars = el.querySelectorAll<HTMLElement>('.skill-bar-fill')
        bars.forEach((bar, i) => {
          const target = bar.dataset.level ?? '0'
          setTimeout(() => {
            bar.style.width = `${target}%`
          }, i * 100 + 200)
        })
      }
    }, { threshold: 0.2 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="section-animate" style={{
      background: 'var(--bg-2)',
      border: '1px solid var(--bg-3)',
      borderRadius: '16px',
      padding: '32px',
      transitionDelay: `${delay}s`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: group.colorDim,
          border: `1px solid ${group.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', color: group.color,
        }}>
          {group.icon}
        </div>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 600, color: 'var(--text)' }}>{group.category}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {group.skills.map(skill => (
          <div key={skill.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)' }}>{skill.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)' }}>{skill.level}%</span>
            </div>
            <div style={{ height: '4px', background: 'var(--bg-3)', borderRadius: '2px', overflow: 'hidden' }}>
              <div
                className="skill-bar-fill"
                data-level={skill.level}
                style={{
                  height: '100%',
                  width: '0%',
                  background: `linear-gradient(90deg, ${group.color}, ${group.color}99)`,
                  borderRadius: '2px',
                  transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const headRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(headRef as React.RefObject<HTMLElement>)
  useScrollAnimation(techRef as React.RefObject<HTMLElement>)

  return (
    <section id="skills" style={{
      padding: '120px 32px',
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--bg-3)',
      borderBottom: '1px solid var(--bg-3)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG decoration */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(126,184,247,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={headRef} className="section-animate" style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em' }}>03 / SKILLS</span>
            <div style={{ height: '1px', flex: 1, background: 'var(--bg-3)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Technologies & tools
          </h2>
        </div>

        {/* Skill cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '56px' }}>
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} group={group} delay={i * 0.1} />
          ))}
        </div>

        {/* Tech tag cloud */}
        <div ref={techRef} className="section-animate">
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-subtle)', letterSpacing: '0.08em' }}>ALSO WORKED WITH</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {techStack.map(tech => (
              <span
                key={tech}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '12px',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-3)',
                  border: '1px solid var(--border)',
                  padding: '6px 14px', borderRadius: '6px',
                  transition: 'all 0.2s', cursor: 'default',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => { const el = e.target as HTMLElement; el.style.color = 'var(--accent)'; el.style.borderColor = 'rgba(74,242,161,0.3)'; el.style.background = 'var(--accent-dim)'; }}
                onMouseLeave={e => { const el = e.target as HTMLElement; el.style.color = 'var(--text-muted)'; el.style.borderColor = 'var(--border)'; el.style.background = 'var(--bg-3)'; }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
