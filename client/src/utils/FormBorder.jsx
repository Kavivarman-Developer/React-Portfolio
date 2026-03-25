import React from 'react'

const FormBorder = ({ children, className = '' }) => {
  return (
    <div className={`relative rounded-xl ${className}`} style={{ padding: 8 }}>
      <style>{`
        .fb-edge {
          position: absolute;
          z-index: 0;
          pointer-events: none;
        }

        .fb-edge.top, .fb-edge.bottom {
          left: 0; right: 0; height: 3px; border-radius: 3px;
          background: linear-gradient(90deg, rgba(59,130,246,0) 0%, rgba(96,165,250,0.95) 40%, rgba(59,130,246,0.95) 60%, rgba(96,165,250,0) 100%);
          background-size: 200% 100%;
          animation: fbShiftX 3s linear infinite;
        }

        .fb-edge.left, .fb-edge.right {
          top: 0; bottom: 0; width: 3px; border-radius: 3px;
          background: linear-gradient(180deg, rgba(59,130,246,0) 0%, rgba(96,165,250,0.95) 40%, rgba(59,130,246,0.95) 60%, rgba(96,165,250,0) 100%);
          background-size: 100% 200%;
          animation: fbShiftY 3s linear infinite;
        }

        .fb-edge.top { top: 0; }
        .fb-edge.bottom { bottom: 0; transform: rotate(180deg); }
        .fb-edge.left { left: 0; }
        .fb-edge.right { right: 0; transform: rotate(180deg); }

        @keyframes fbShiftX {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fbShiftY {
          0% { background-position: 50% 0%; }
          50% { background-position: 50% 100%; }
          100% { background-position: 50% 0%; }
        }

        .fb-corners {
          position: absolute; inset: 0; z-index: 0; border-radius: 12px; box-shadow: 0 8px 30px rgba(59,130,246,0.06);
          pointer-events: none;
        }
      `}</style>

      <div className="fb-edge top" aria-hidden />
      <div className="fb-edge right" aria-hidden />
      <div className="fb-edge bottom" aria-hidden />
      <div className="fb-edge left" aria-hidden />
      <div className="fb-corners" aria-hidden />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default FormBorder
