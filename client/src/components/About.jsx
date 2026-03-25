import React from 'react'
import reactIcon from '../assets/React.svg'

// Card data (could be moved to a separate file)
const CARD_ITEMS = [
  { text: 'HTML', color: 'bg-indigo-500', },
  { text: 'CSS', color: 'bg-green-500' },
  { text: 'JavaScript', color: 'bg-cyan-400' },
  { text: "React",color: 'bg-white-400',icon: reactIcon },
  { text: 'Node Js', color: 'bg-green-400' },
  { text: 'Express Js', color: 'bg-yellow-400' },
  { text: 'MongoDB', color: 'bg-yellow-400' },
  { text: 'Git', color: 'bg-green-500' },
  { text: 'Photoshop', color: 'bg-green-500' },
  { text: 'Tailwind CSS', color: 'bg-green-500' },
  { text: 'SQL', color: 'bg-green-500' },
]

// Helpers / constants
const CHUNK_SIZE = 4 // number of cards per visual row
const ROW_MIN_WIDTH = 220
const BASE_DURATION = 30 // seconds for the first row; subsequent rows will be slightly faster

function chunkArray(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

// Small presentational card — keeps markup consistent and easy to reuse
function Card({ text, color, icon }) {
  return (
    <div className="card-compact flex items-center" role="listitem">
      <div className={`w-10 h-10 flex items-center justify-center rounded-md ${color} flex-shrink-0 overflow-hidden`}>
        {/* If an icon is provided, show it; otherwise fall back to a decorative circle */}
        {icon ? (
          <img src={icon} alt="icon" className="w-6 h-6 object-contain" />
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
            <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.08)" />
          </svg>
        )}
      </div>
      <p className="text-sm md:text-base font-medium text-white/95 ml-3">{text}</p>
    </div>
  )
}

export default function About() {
  // Build rows of items. Each row duplicates its items to create a seamless loop.
  const rows = chunkArray(CARD_ITEMS, CHUNK_SIZE)

  return (
    <div className="min-h-screen text-white flex items-center justify-center sm:px-8 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* Left content */}
        <div className="space-y-6 sm:space-y-4">
          <h1 className="text-3xl sm:text-2xl md:text-5xl font-semibold leading-tight">
            Hey, <span className="font-light">It's my skills</span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
            I'm a passionate developer with expertise in various technologies. I enjoy building web applications and continuously learning new skills to stay up-to-date in the ever-evolving tech landscape.
          </p>

          <button className="bg-white text-blue-600 px-5 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition">What is Copilot in Edge?</button>
        </div>

        {/* Right side: animated rows that alternate direction */}
        <div className='shadow-inset'>
          <div className="space-y-4">
            {rows.map((rowItems, rowIndex) => {
              // Alternate direction: even rows move left-to-right visually (animation 'normal'), odd rows reverse
              const direction = rowIndex % 2 === 0 ? 'normal' : 'reverse'
              // Slight speed variation per row
              const duration = Math.max(8, BASE_DURATION - rowIndex * 2)

              return (
                <div key={rowIndex} className="row overflow-hidden" aria-hidden={false}>
                  <div
                    className="row-track"
                    style={{ animationDuration: `${duration}s`, animationDirection: direction }}
                  >
                    {/* Duplicate items to allow continuous looping */}
                    {[...rowItems, ...rowItems].map((item, i) => (
                      <div key={i} style={{ minWidth: ROW_MIN_WIDTH }} className="pr-2">
                        <Card text={item.text} color={item.color} icon={item.icon} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
