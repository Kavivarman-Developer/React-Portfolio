import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaWhatsapp, FaGithub } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await emailjs.send(
                'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID',
                { from_name: formData.name, from_email: formData.email, message: formData.message, to_name: 'Kavivarman' },
                'YOUR_PUBLIC_KEY'
            )
            toast.success('Message sent successfully!')
            setFormData({ name: '', email: '', message: '' })
        } catch {
            toast.error('Failed to send message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo = [
        { icon: <FaPhone />, label: 'Phone', value: '+91 9943958576', href: 'tel:+919943958576' },
        { icon: <FaEnvelope />, label: 'Email', value: 'kavivarman@example.com', href: 'mailto:kavivarman@example.com' },
        { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Pudukkottai, Tamil Nadu 614624', href: null },
    ]

    const socials = [
        { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/kavivarman-s-ba57382a2' },
        { icon: <FaInstagram />, url: 'https://www.instagram.com' },
        { icon: <FaWhatsapp />, url: 'https://web.whatsapp.com/' },
        { icon: <FaGithub />, url: 'https://github.com/Kavivarman-Developer?tab=repositories' },
    ]

    const inputStyle = {
        width: '100%', padding: '14px 18px', borderRadius: 12,
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
        color: '#f0f4ff', fontFamily: "'DM Sans', sans-serif", fontSize: 15,
        outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box',
    }

    return (
        <section
            id="contact"
            style={{ padding: '120px 32px', fontFamily: "'DM Sans', sans-serif" }}
        >
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>

                {/* Section label */}
                <div style={{
                    fontSize: 11, letterSpacing: 3, textTransform: 'uppercase',
                    color: '#00e5ff', fontWeight: 600, marginBottom: 16,
                    display: 'flex', alignItems: 'center', gap: 10,
                }}>
                    <span style={{ height: 1, width: 32, background: '#00e5ff', display: 'inline-block' }} />
                    Let's Connect
                </div>

                <h2 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800,
                    letterSpacing: '-2px', lineHeight: 1.1, marginBottom: 60, color: '#f0f4ff',
                }}>
                    Start a{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, #00e5ff, #7c3aed)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>Project</span>
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>

                    {/* Left: info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p style={{ color: '#8b98b8', fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
                            Have a project in mind? I'm open to freelance work, full-time opportunities, and interesting collaborations. Let's build something remarkable together.
                        </p>

                        {contactInfo.map(c => (
                            <div key={c.label} style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-start' }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                                    background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 17, color: '#00e5ff',
                                }}>
                                    {c.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#8b98b8', marginBottom: 4 }}>{c.label}</div>
                                    {c.href ? (
                                        <a href={c.href} style={{ fontSize: 15, fontWeight: 500, color: '#00e5ff', textDecoration: 'none' }}>{c.value}</a>
                                    ) : (
                                        <div style={{ fontSize: 15, fontWeight: 500, color: '#f0f4ff' }}>{c.value}</div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Social links */}
                        <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
                            {socials.map((s, i) => (
                                <motion.a
                                    key={i}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ translateY: -2 }}
                                    style={{
                                        width: 44, height: 44, borderRadius: 12,
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 17, color: '#8b98b8', textDecoration: 'none',
                                        transition: 'all 0.3s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = '#00e5ff'
                                        e.currentTarget.style.color = '#00e5ff'
                                        e.currentTarget.style.background = 'rgba(0,229,255,0.08)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                                        e.currentTarget.style.color = '#8b98b8'
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                                    }}
                                >
                                    {s.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {[
                                { label: 'Your Name', name: 'name', type: 'text', placeholder: 'John Doe' },
                                { label: 'Email Address', name: 'email', type: 'email', placeholder: 'john@company.com' },
                            ].map(field => (
                                <div key={field.name}>
                                    <label style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: '#8b98b8', marginBottom: 8, display: 'block' }}>
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        required
                                        placeholder={field.placeholder}
                                        style={inputStyle}
                                        onFocus={e => e.target.style.borderColor = '#00e5ff'}
                                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                                    />
                                </div>
                            ))}
                            <div>
                                <label style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: '#8b98b8', marginBottom: 8, display: 'block' }}>
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Tell me about your project..."
                                    style={{ ...inputStyle, resize: 'none' }}
                                    onFocus={e => e.target.style.borderColor = '#00e5ff'}
                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                                />
                            </div>
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ translateY: -2, boxShadow: '0 8px 30px rgba(0,229,255,0.3)' }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    width: '100%', padding: '14px 32px', borderRadius: 12,
                                    fontSize: 15, fontWeight: 600,
                                    background: isSubmitting ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #00e5ff, #7c3aed)',
                                    color: 'white', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    fontFamily: "'DM Sans', sans-serif", opacity: isSubmitting ? 0.6 : 1,
                                }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message →'}
                            </motion.button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}

export default Contact