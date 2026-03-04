'use client'

import { useEffect, useRef } from 'react'

const projects = [
  {
    title: 'VisorAI',
    description: 'A YOLOv11-Powered Mobile Application for Real-Time Detection of LTO Road Markings with Auditory Feedback. Designed to assist drivers and pedestrians by identifying road markings through the camera and providing immediate audio cues.',
    tags: ['YOLOv11', 'Python', 'Mobile', 'Computer Vision', 'Audio Feedback'],
    accent: 'var(--accent)',
    accentDim: 'var(--accent-dim)',
    featured: true,
    year: '2025',
    link: '#',
    github: '#',
    emoji: '⬡',
  },
  {
    title: 'DeepS&P',
    description: 'Institutional-grade S&P 500 AI forecasting platform powered by a 3-layer LSTM (256 hidden units, dropout-regularized) trained on 90+ years of historical data. Includes Monte Carlo simulation with up to 2,000 stochastic paths and dynamic financial dashboards.',
    tags: ['TensorFlow', 'Python', 'LSTM', 'Monte Carlo', 'Finance'],
    accent: 'var(--accent-2)',
    accentDim: 'var(--accent-2-dim)',
    featured: true,
    year: '2025',
    link: '#',
    github: '#',
    emoji: '◈',
  },
  {
    title: 'GiftxAI',
    description: 'Enterprise-grade RAG-powered gift recommendation system leveraging Groq Llama 3.3, triple-validation for strict accuracy, and FAISS vector embeddings. Zero hallucinations with real-time performance metrics.',
    tags: ['LangChain', 'HuggingFace', 'FAISS', 'Groq', 'RAG'],
    accent: '#c084fc',
    accentDim: '#2d1b4e',
    featured: false,
    year: '2025',
    link: '#',
    github: '#',
    emoji: '◉',
  },
  {
    title: 'Airbnb NYC Analytics',
    description: 'End-to-end data analysis pipeline on 48K+ Airbnb NYC listings. Includes association rule mining (Apriori), KMeans clustering, and XGBoost predictive models for demand and price forecasting backed by a PostgreSQL database.',
    tags: ['SQL', 'Python', 'Scikit-learn', 'XGBoost', 'PostgreSQL'],
    accent: '#fb923c',
    accentDim: '#3a1f0d',
    featured: false,
    year: '2025',
    link: '#',
    github: '#',
    emoji: '◎',
  },
  {
    title: 'QuantMaven',
    description: 'Interactive Streamlit trading dashboard integrating real-time stock data, technical indicators (RSI, Bollinger Bands), and 10 years of historical performance. Dynamic programming algorithms for max-profit optimization with 50% faster insights.',
    tags: ['Streamlit', 'Pandas', 'YFinance', 'Plotly', 'Python'],
    accent: '#34d399',
    accentDim: '#0d3327',
    featured: false,
    year: '2024',
    link: '#',
    github: '#',
    emoji: '◫',
  },
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

function FeaturedCard({ project }: { project: typeof projects[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  useScrollAnimation(ref as React.RefObject<HTMLElement>)

  return (
    <div ref={ref} className="section-animate card-hover" style={{
      background: 'var(--bg-2)',
      border: '1px solid var(--bg-3)',
      borderRadius: '16px',
      padding: '36px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow top-right */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '200px', height: '200px',
        background: `radial-gradient(circle at top right, ${project.accent}12, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '12px',
          background: project.accentDim,
          border: `1px solid ${project.accent}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', color: project.accent, flexShrink: 0,
        }}>
          {project.emoji}
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
            style={{ color: 'var(--text-subtle)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-subtle)')}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            title="View Project"
            style={{ color: 'var(--text-subtle)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-subtle)')}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            {project.title}
          </h3>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-subtle)', background: 'var(--bg-3)', padding: '2px 8px', borderRadius: '4px' }}>
            {project.year}
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          {project.description}
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: project.accent, background: project.accentDim,
            border: `1px solid ${project.accent}20`,
            padding: '3px 10px', borderRadius: '4px', letterSpacing: '0.03em',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function SmallCard({ project }: { project: typeof projects[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  useScrollAnimation(ref as React.RefObject<HTMLElement>)

  return (
    <div ref={ref} className="section-animate card-hover" style={{
      background: 'var(--bg-2)',
      border: '1px solid var(--bg-3)',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '20px', color: project.accent }}>{project.emoji}</div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            title="View on GitHub"
            style={{ color: 'var(--text-subtle)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-subtle)')}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            title="View Project"
            style={{ color: 'var(--text-subtle)', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-subtle)')}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          {project.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65 }}>
          {project.description}
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: 'auto' }}>
        {project.tags.slice(0, 3).map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: 'var(--text-muted)', background: 'var(--bg-3)',
            padding: '2px 8px', borderRadius: '3px',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const headRef = useRef<HTMLDivElement>(null)
  useScrollAnimation(headRef as React.RefObject<HTMLElement>)

  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <section id="projects" style={{ padding: '120px 32px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header — matches Certificates pill style */}
        <div ref={headRef} className="section-animate" style={{ marginBottom: '56px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            border: '1px solid #1e2d3d', borderRadius: '999px',
            padding: '5px 14px', marginBottom: '20px',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#e8edf2', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Projects
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700, color: '#e8edf2',
            letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '12px',
          }}>
            Things I've Built
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#6b8299', maxWidth: '460px', lineHeight: 1.65 }}>
            A selection of ML, data, and full-stack projects — from forecasting engines to RAG systems.
          </p>
        </div>

        {/* Featured grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          {featured.map(p => <FeaturedCard key={p.title} project={p} />)}
        </div>

        {/* Small cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {rest.map(p => <SmallCard key={p.title} project={p} />)}
        </div>

      </div>
    </section>
  )
}
