import React, { useEffect, useRef, useState } from 'react'

const ensureStyles = (() => {
  let added = false
  return () => {
    if (added) return
    added = true
    const css = `
    .tc-cursor-outer{position:fixed;left:0;top:0;pointer-events:none;z-index:9999;will-change:transform;}
    .tc-cursor-inner{width:18px;height:18px;border-radius:50%;border:2px solid rgba(252, 252, 252, 0.85);background:transparent;box-sizing:border-box;transform-origin:center;border-radius:50%;}
    .tc-cursor-inner.tc-hover{background:rgba(255, 254, 254, 0.85);transform:scale(1.15);}
    .tc-cursor-ring{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:36px;height:36px;border-radius:50%;border:2px dashed rgba(255, 98, 0, 0.6);box-sizing:border-box}
    @keyframes tc-spin{to{transform:rotate(360deg)}}
    `
    const s = document.createElement('style')
    s.setAttribute('data-tc-styles', 'true')
    s.appendChild(document.createTextNode(css))
    document.head.appendChild(s)
  }
})()

const TargetCursor = ({ spinDuration = 2, hideDefaultCursor = false, parallaxOn = true, hoverDuration = 0.15 }) => {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const target = useRef({ x: pos.current.x, y: pos.current.y })
  const raf = useRef(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    ensureStyles()
    if (hideDefaultCursor) {
      const prev = document.body.style.cursor
      document.body.style.cursor = 'none'
      return () => { document.body.style.cursor = prev }
    }
    return undefined
  }, [hideDefaultCursor])

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (el && el.closest && el.closest('.cursor-target')) {
        setHover(true)
      } else setHover(false)
    }

    window.addEventListener('mousemove', onMove)

    const animate = () => {
      if (parallaxOn) {
        pos.current.x += (target.current.x - pos.current.x) * 0.15
        pos.current.y += (target.current.y - pos.current.y) * 0.15
      } else {
        pos.current.x = target.current.x
        pos.current.y = target.current.y
      }

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      }

      if (innerRef.current) {
        innerRef.current.style.transition = `transform ${hoverDuration}s ease, background ${hoverDuration}s ease, border-color ${hoverDuration}s ease`
        innerRef.current.classList.toggle('tc-hover', !!hover)
      }

      if (ringRef.current) {
        ringRef.current.style.animation = spinDuration > 0 ? `tc-spin ${spinDuration}s linear infinite` : 'none'
      }

      raf.current = requestAnimationFrame(animate)
    }

    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [parallaxOn, hoverDuration, spinDuration])

  const outerStyle = { position: 'fixed', left: 0, top: 0, pointerEvents: 'none' }
  const innerStyle = { width: 18, height: 18 }
  const ringStyle = { }

  return (
    <div ref={outerRef} className="tc-cursor-outer" style={outerStyle} aria-hidden>
      <div ref={ringRef} className="tc-cursor-ring" style={ringStyle} />
      <div ref={innerRef} className="tc-cursor-inner" style={innerStyle} />
    </div>
  )
}

export default TargetCursor
