import React from 'react'
import { motion } from 'framer-motion'

const ContentTemplate = ({ data }) => {
  if (!data) return null

  const { title, description1, description2, description3 } = data

  return (
    <>
      <section className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight text-indigo-600"
            >
              {title}
            </motion.h1>

            <section className="mb-6 w-full">
              <div className="w-full max-h-[36rem] overflow-y-auto md:overflow-visible md:max-h-none snap-y snap-mandatory">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-center md:text-left snap-start min-h-[140px]">
                    <div className="text-xs sm:text-sm text-gray-400">Description 1</div>
                    <div className="text-lg sm:text-xl font-semibold mt-2">{description1}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-center md:text-left snap-start min-h-[140px]">
                    <div className="text-xs sm:text-sm text-gray-400">Description 2</div>
                    <div className="text-lg sm:text-xl font-semibold mt-2">{description2}</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      </section>
    </>
  )
}

export default ContentTemplate
