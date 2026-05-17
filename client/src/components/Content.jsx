import { motion } from 'framer-motion'

const Content = () => {
    return (
        <section id="content" style={{ width: '100%', fontFamily: "'DM Sans', sans-serif" }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

                    {/* Left */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <span style={{
                            display: 'inline-block', padding: '6px 16px', borderRadius: 100,
                            background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)',
                            fontSize: 11, fontWeight: 600, letterSpacing: '1.5px',
                            textTransform: 'uppercase', color: '#00e5ff', width: 'fit-content',
                        }}>
                            MERN Stack Developer
                        </span>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800,
                                lineHeight: 1.05, letterSpacing: '-2px', color: '#f0f4ff',
                                margin: 0,
                            }}
                        >
                            Hi, I'm{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>
                                Kavi Varman
                            </span>
                        </motion.h1>

                        <p style={{ color: '#8b98b8', fontSize: 17, lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
                            I build responsive, accessible React applications with a focus on clean UI and delightful user interactions. Currently available for freelance and contract work.
                        </p>

                        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                            <a
                                href="#contact"
                                style={{
                                    padding: '13px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600,
                                    background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
                                    color: 'white', textDecoration: 'none',
                                }}
                            >
                                Contact Me
                            </a>
                            <a
                                href="#projects"
                                style={{
                                    padding: '13px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600,
                                    background: 'transparent', color: '#f0f4ff',
                                    border: '1px solid rgba(255,255,255,0.14)', textDecoration: 'none',
                                    transition: 'all 0.3s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#00e5ff'; e.currentTarget.style.color = '#00e5ff'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = '#f0f4ff'; }}
                            >
                                View Projects
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Content