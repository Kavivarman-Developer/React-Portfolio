import React, { createContext, useContext, useState } from 'react'

const HeroContext = createContext()

export const HeroProvider = ({ children }) => {
  const [active, setActive] = useState('home')
  return (
    <HeroContext.Provider value={{ active, setActive }}>
      {children}
    </HeroContext.Provider>
  )
}

export const useHero = () => useContext(HeroContext)

export default HeroContext
