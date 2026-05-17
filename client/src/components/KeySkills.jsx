import React from 'react'
import { motion } from 'framer-motion'

const keySkills = [
    'Team work skills',
    'Sincere, Hardworking and Honest',
    'Ability to Grasp New Skills',
    'Positive Attitude',
    'Time Management',
]

const KeySkills = () => {
    return (
        <section
            style={{
                padding: '120px 32px',
                fontFamily: "'DM Sans', sans-serif",
            }}
        >
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

                    {/* Image side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: 320, height: 320, borderRadius: 24,
                                background: 'linear-gradient(135deg, rgba(0,229,255,0.1), rgba(124,58,237,0.15))',
                                border: '1px solid rgba(0,229,255,0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 80,
                            }}>
                                💪
                            </div>
                            {/* Decorative glow */}
                            <div style={{
                                position: 'absolute', inset: -20, borderRadius: 32,
                                background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.15), transparent 70%)',
                                zIndex: -1, pointerEvents: 'none',
                            }} />
                        </div>
                    </motion.div>

                    {/* Skills list */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div style={{
                            fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
                            color: '#00e5ff', fontWeight: 600, marginBottom: 16,
                            display: 'flex', alignItems: 'center', gap: 10,
                        }}>
                            <span style={{ height: 1, width: 32, background: '#00e5ff', display: 'inline-block' }} />
                            Strengths
                        </div>

                        <h2 style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800,
                            letterSpacing: '-2px', lineHeight: 1.1,
                            marginBottom: 36, color: '#f0f4ff',
                        }}>
                            My{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>Key Skills</span>
                        </h2>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {keySkills.map((skill, index) => (
                                <motion.li
                                    key={skill}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 14,
                                        padding: '14px 20px', borderRadius: 12,
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        fontSize: 15, color: '#f0f4ff',
                                        transition: 'all 0.3s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'rgba(0,229,255,0.25)'
                                        e.currentTarget.style.background = 'rgba(0,229,255,0.04)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                                    }}
                                >
                                    <span style={{
                                        width: 6, height: 6, borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
                                        flexShrink: 0,
                                    }} />
                                    {skill}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default KeySkills