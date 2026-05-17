import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Loader = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        background: '#030712',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                >
                    {/* Grid bg */}
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none',
                        backgroundImage: 'linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }} />

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ textAlign: 'center', position: 'relative' }}
                    >
                        {/* Spinning ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            style={{
                                width: 80, height: 80, borderRadius: '50%',
                                border: '2px solid transparent',
                                borderTopColor: '#00e5ff',
                                borderRightColor: '#7c3aed',
                                margin: '0 auto 28px',
                            }}
                        />

                        {/* Logo */}
                        <div style={{
                            position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
                            fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800,
                            background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>
                            KV
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            style={{ color: '#8b98b8', fontSize: 14, letterSpacing: '2px', textTransform: 'uppercase' }}
                        >
                            Loading Portfolio...
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Loader