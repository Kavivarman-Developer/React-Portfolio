import React from 'react'
import { useHero } from '../context/HeroContext'
import Contact from './Contact'
import About from './About'
import Profile from './Profile'
import Content from './Content'
import Dasboard from '../pages/Dasboard'

const Hero = (props) => {
    const { active } = useHero()

    const renderContent = () => {
        switch (active) {
            case 'about':
                return (
                    <div>
                        <About />
                    </div>
                )
            case 'experience':
                return (
                    <div>
                        <h1 className="text-4xl font-bold">Experience</h1>
                        <p className="mt-4 max-w-xl">Highlights of my experience shown here.</p>
                    </div>
                )
            case 'contact':
                return (
                    <div>
                        <Contact />
                    </div>
                )
            case 'profile':
                return (
                    <div>
                        <Profile />
                    </div>
                )
                case 'dashboard':
                return (
                    <div>
                        <Dasboard />
                    </div>
                )
            default:'content'
                return (
                    <div>
                        <Content />
                    </div>
                )
        }
    }

    return (
        <div id="home" className='flex flex-col items-start justify-center px-6 md:px-16 xl:32 text-white bg-[url("/src/assets/laptop.jpg")] bg-no-repeat bg-cover bg-center h-screen'>
           <div className='flex flex-col'>
            <div className='absolute left-42'>
            </div>
            <div>
              {renderContent()}
            </div>
           </div>
        </div>
    )
}

export default Hero
