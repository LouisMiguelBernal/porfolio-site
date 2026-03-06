'use client'

import { useEffect, useRef, useState } from 'react'

const skillGroups = [
  {
    category: 'AI & Machine Learning',
    icon: '⬡',
    color: '#c084fc',
    colorDim: '#2d1b4e',
    skills: [
      { name: 'PyTorch / TensorFlow', level: 92 },
      { name: 'Scikit-learn', level: 90 },
      { name: 'LangChain / RAG', level: 88 },
      { name: 'Computer Vision (YOLO)', level: 85 },
      { name: 'NLP / Transformers', level: 82 },
    ],
  },
  {
    category: 'Frontend',
    icon: '◈',
    color: '#4af2a1',
    colorDim: 'var(--accent-dim)',
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'CSS / Tailwind', level: 87 },
      { name: 'React Native', level: 75 },
      { name: 'Figma / UI Design', level: 72 },
    ],
  },
  {
    category: 'Backend & Data',
    icon: '◎',
    color: '#7eb8f7',
    colorDim: 'var(--accent-2-dim)',
    skills: [
      { name: 'Python / FastAPI', level: 93 },
      { name: 'SQL / PostgreSQL', level: 90 },
      { name: 'Node.js / Express', level: 84 },
      { name: 'Pandas / NumPy', level: 91 },
      { name: 'Power BI / Excel', level: 86 },
    ],
  },
  {
    category: 'DevOps & Tools',
    icon: '◉',
    color: '#fb923c',
    colorDim: '#3a1f0d',
    skills: [
      { name: 'Docker', level: 82 },
      { name: 'Git / GitHub', level: 92 },
      { name: 'Vercel / Deployment', level: 85 },
      { name: 'Streamlit', level: 88 },
      { name: 'Jupyter / Colab', level: 90 },
    ],
  },
]

// ML/Data tools NOT already in the 4 main boxes
const techStack = [
  'FAISS', 'Groq', 'HuggingFace', 'OpenCV', 'LSTM', 'XGBoost',
  'LightGBM', 'CatBoost', 'SHAP', 'Optuna', 'MLflow', 'Weights & Biases',
  'Apriori', 'KMeans', 'PCA', 't-SNE', 'UMAP', 'Monte Carlo',
  'Seaborn', 'Matplotlib', 'Plotly', 'Tableau', 'MongoDB', 'Redis',
]

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

function SkillRow({
  skill,
  color,
  index,
}: {
  skill: { name: string; level: number }
  color: string
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        padding: '10px 14px',
        borderRadius: '10px',
        background: hovered ? `${color}0e` : 'transparent',
        border: `1px solid ${hovered ? color + '30' : 'transparent'}`,
        transition: 'all 0.25s ease',
        cursor: 'default',
      }}
    >
      {/* Index number */}
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '10px',
        color: hovered ? color : 'var(--text-subtle)',
        minWidth: '18px', letterSpacing: '0.05em',
        transition: 'color 0.25s ease',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Skill name */}
      <span style={{
        fontFamily: 'var(--font-sans)', fontSize: '14px',
        color: hovered ? 'var(--text)' : 'var(--text-muted)',
        flex: 1, transition: 'color 0.25s ease',
        letterSpacing: '-0.01em',
      }}>
        {skill.name}
      </span>

      {/* Bar track */}
      <div style={{
        width: '80px', height: '4px',
        background: 'var(--bg-3)', borderRadius: '2px', overflow: 'hidden',
        flexShrink: 0,
      }}>
        <div
          ref={barRef}
          className="skill-bar-fill"
          data-level={skill.level}
          style={{
            height: '100%',
            width: '0%',
            background: hovered
              ? color
              : `linear-gradient(90deg, ${color}99, ${color}44)`,
            borderRadius: '2px',
            transition: 'width 0.85s cubic-bezier(0.16, 1, 0.3, 1), background 0.25s ease',
            boxShadow: hovered ? `0 0 6px ${color}80` : 'none',
          }}
        />
      </div>

      {/* Percent */}
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px',
        color: hovered ? color : 'var(--text-subtle)',
        minWidth: '32px', textAlign: 'right',
        transition: 'color 0.25s ease',
      }}>
        {skill.level}%
      </span>
    </div>
  )
}

function SkillCard({ group, delay }: { group: typeof skillGroups[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('visible')
        const bars = el.querySelectorAll<HTMLElement>('.skill-bar-fill')
        bars.forEach((bar, i) => {
          const target = bar.dataset.level ?? '0'
          setTimeout(() => { bar.style.width = `${target}%` }, i * 100 + 200)
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
      borderRadius: '20px',
      padding: '32px 28px',
      transitionDelay: `${delay}s`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '200px', height: '200px',
        background: `radial-gradient(circle at top right, ${group.color}12, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Accent top line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${group.color}, transparent)`,
      }} />

      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
        <div style={{
          width: '46px', height: '46px', borderRadius: '12px',
          background: group.colorDim,
          border: `1px solid ${group.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', color: group.color, flexShrink: 0,
        }}>
          {group.icon}
        </div>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-sans)', fontSize: '17px', fontWeight: 600,
            color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: '2px',
          }}>
            {group.category}
          </h3>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: group.color, letterSpacing: '0.08em', opacity: 0.8,
          }}>
            {group.skills.length} SKILLS
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--bg-3)', marginBottom: '16px' }} />

      {/* Skill rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {group.skills.map((skill, i) => (
          <SkillRow key={skill.name} skill={skill} color={group.color} index={i} />
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
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(192,132,252,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div ref={headRef} className="section-animate" style={{ marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            border: '1px solid var(--border)', borderRadius: '999px',
            padding: '5px 14px', marginBottom: '20px',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Skills
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: 'var(--text)',
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
          }}>
            Technologies & Tools
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '460px', lineHeight: 1.65 }}>
            A breakdown of my technical stack across AI, web, data, and infrastructure.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="skills-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          marginBottom: '56px',
        }}>
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} group={group} delay={i * 0.1} />
          ))}
        </div>

        {/* Also worked with */}
        <div ref={techRef} className="section-animate">
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-subtle)', letterSpacing: '0.08em' }}>
              ALSO WORKED WITH
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--bg-3)' }} />
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
                onMouseEnter={e => {
                  const el = e.target as HTMLElement
                  el.style.color = 'var(--accent)'
                  el.style.borderColor = 'rgba(74,242,161,0.3)'
                  el.style.background = 'var(--accent-dim)'
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  const el = e.target as HTMLElement
                  el.style.color = 'var(--text-muted)'
                  el.style.borderColor = 'var(--border)'
                  el.style.background = 'var(--bg-3)'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
