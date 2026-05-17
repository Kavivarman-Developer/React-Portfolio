import React from 'react'
import { motion } from 'framer-motion'

const educationData = [
    {
        year: '2022–2024',
        degree: "Master's Degree",
        institution: 'Annamalai University',
        location: 'Chidambaram',
        icon: '🎓',
        accentColor: '#f472b6',
    },
    {
        year: '2019–2022',
        degree: "Bachelor's Degree",
        institution: 'J J College Of Arts And Science',
        location: 'Pudukkottai, 614624',
        icon: '📚',
        accentColor: '#7c3aed',
    },
    {
        year: '2016–2017',
        degree: 'Higher Secondary Education',
        institution: 'Govt Boys Hr Sec School',
        location: 'Keeramangalam, Pudukkottai',
        icon: '🏫',
        accentColor: '#00e5ff',
    },
    {
        year: '2018–2019',
        degree: 'Higher Secondary School',
        institution: 'Govt Higher Secondary School',
        location: 'Kulamangalam, Pudukkottai',
        icon: '🏫',
        accentColor: '#10b981',
    },
]

const Education = () => {
    return (
        <section
            id="education"
            style={{
                padding: '120px 32px',
                background: 'rgba(255,255,255,0.01)',
                fontFamily: "'DM Sans', sans-serif",
            }}
        >
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                {/* Section label */}
                <div style={{
                    fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
                    color: '#00e5ff', fontWeight: 600, marginBottom: 16,
                    display: 'flex', alignItems: 'center', gap: 10,
                }}>
                    <span style={{ height: 1, width: 32, background: '#00e5ff', display: 'inline-block' }} />
                    Background
                </div>

                <h2 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800,
                    letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 16, color: '#f0f4ff',
                }}>
                    My{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, #f472b6, #7c3aed)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>Education</span>
                </h2>
                <p style={{ color: '#8b98b8', fontSize: 17, marginBottom: 60 }}>My academic background and achievements</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                    {educationData.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ translateY: -4 }}
                            style={{
                                padding: 28, borderRadius: 20,
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderLeft: `3px solid ${edu.accentColor}`,
                                transition: 'all 0.3s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(255,255,255,0.14)`}
                            onMouseLeave={e => e.currentTarget.style.borderColor = `rgba(255,255,255,0.08)`}
                        >
                            <div style={{ fontSize: 28, marginBottom: 12 }}>{edu.icon}</div>
                            <div style={{
                                fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700,
                                color: edu.accentColor, letterSpacing: 1, textTransform: 'uppercase',
                                marginBottom: 8,
                            }}>
                                {edu.year}
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 600, color: '#f0f4ff', marginBottom: 6 }}>
                                {edu.degree}
                            </div>
                            {edu.institution && (
                                <div style={{ fontSize: 14, color: '#8b98b8', marginBottom: 4 }}>{edu.institution}</div>
                            )}
                            <div style={{ fontSize: 12, color: edu.accentColor + 'cc', letterSpacing: '0.5px' }}>
                                📍 {edu.location}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Education