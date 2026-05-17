import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Loader = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const finish = () => setTimeout(() => setIsLoading(false), 650)
        const fallback = setTimeout(() => setIsLoading(false), 2200)

        if (document.readyState === 'complete') {
            finish()
        } else {
            window.addEventListener('load', finish, { once: true })
        }

        return () => {
            clearTimeout(fallback)
            window.removeEventListener('load', finish)
        }
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        background: 'radial-gradient(circle at 50% 38%, rgba(0,229,255,0.10), transparent 32%), #030712',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'DM Sans', sans-serif",
                        overflow: 'hidden',
                    }}
                >
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        backgroundImage: 'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 35%, transparent 100%)',
                    }} />

                    <motion.div
                        animate={{ x: ['-20%', '20%', '-20%'], opacity: [0.2, 0.38, 0.2] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            width: 320,
                            height: 320,
                            borderRadius: '50%',
                            background: 'rgba(124,58,237,0.22)',
                            filter: 'blur(80px)',
                        }}
                    />

                    <motion.div
                        animate={{ x: ['18%', '-18%', '18%'], y: ['8%', '-8%', '8%'], opacity: [0.16, 0.32, 0.16] }}
                        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            width: 260,
                            height: 260,
                            borderRadius: '50%',
                            background: 'rgba(244,114,182,0.18)',
                            filter: 'blur(75px)',
                        }}
                    />

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        style={{
                            textAlign: 'center',
                            position: 'relative',
                            width: 'min(280px, 86vw)',
                            padding: '28px 24px',
                            borderRadius: 18,
                            border: '1px solid rgba(255,255,255,0.08)',
                            background: 'rgba(255,255,255,0.025)',
                            boxShadow: '0 24px 80px rgba(0,0,0,0.38)',
                            backdropFilter: 'blur(18px)',
                        }}
                    >
                        <div style={{ position: 'relative', width: 92, height: 92, margin: '0 auto 22px' }}>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    position: 'absolute', inset: 0, borderRadius: '50%',
                                    border: '2px solid rgba(255,255,255,0.08)',
                                    borderTopColor: '#00e5ff',
                                    borderRightColor: '#7c3aed',
                                }}
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    position: 'absolute', inset: 12, borderRadius: '50%',
                                    border: '1px solid transparent',
                                    borderBottomColor: '#f472b6',
                                    borderLeftColor: 'rgba(0,229,255,0.8)',
                                }}
                            />
                            <div style={{
                                position: 'absolute', inset: 18,
                                borderRadius: 16,
                                background: 'linear-gradient(135deg, rgba(0,229,255,0.13), rgba(124,58,237,0.16))',
                                border: '1px solid rgba(255,255,255,0.09)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontFamily: "'Syne', sans-serif",
                                fontSize: 20,
                                fontWeight: 800,
                                color: '#f0f4ff',
                            }}>
                                KV
                            </div>
                        </div>

                        <div style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: 20,
                            fontWeight: 800,
                            marginBottom: 8,
                            background: 'linear-gradient(135deg, #f0f4ff, #00e5ff 45%, #f472b6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            Portfolio
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.55, 1, 0.55] }}
                            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                            style={{ color: '#8b98b8', fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase' }}
                        >
                            Loading experience
                        </motion.p>

                        <div style={{
                            height: 3,
                            marginTop: 20,
                            borderRadius: 999,
                            background: 'rgba(255,255,255,0.08)',
                            overflow: 'hidden',
                        }}>
                            <motion.div
                                animate={{ x: ['-100%', '240%'] }}
                                transition={{ duration: 1.05, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                    width: '42%',
                                    height: '100%',
                                    borderRadius: 999,
                                    background: 'linear-gradient(90deg, #00e5ff, #7c3aed, #f472b6)',
                                }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Loader
