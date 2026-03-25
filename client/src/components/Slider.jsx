import React, { useEffect, useState, useRef } from 'react'

const Slider = ({ items = [], interval = 4000 }) => {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!items.length) return
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % items.length)
    }, interval)
    return () => clearTimeout(timeoutRef.current)
  }, [index, items, interval])

  const prev = () => {
    clearTimeout(timeoutRef.current)
    setIndex((i) => (i - 1 + items.length) % items.length)
  }
  const next = () => {
    clearTimeout(timeoutRef.current)
    setIndex((i) => (i + 1) % items.length)
  }

  if (!items.length) return null

  const current = items[index]

  return (
    <div
      style={{ top: '425px' }}
      className="absolute left-1/2 transform -translate-x-1/2 z-50 w-[92%] max-w-3xl md:max-w-4xl"
    >
      <div className="bg-white/95 backdrop-blur-md shadow-lg rounded-xl overflow-hidden border border-slate-100">
        <div className="flex items-center gap-4 p-4">
          <div className="flex-1">
            <div className="text-sm text-slate-500">{current.title}</div>
            <div className="text-lg md:text-xl font-semibold text-slate-900 mt-1">{current.description}</div>
            {current.priceOff && (
              <div className="text-sm text-teal-600 font-medium mt-2">Save {current.priceOff}%</div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous"
              className="p-2 rounded-md hover:bg-slate-100"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="p-2 rounded-md hover:bg-slate-100"
            >
              ›
            </button>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-teal-400 via-indigo-400 to-pink-400" style={{ width: `${((index + 1) / items.length) * 100}%` }} />
      </div>
    </div>
  )
}

export default Slider
