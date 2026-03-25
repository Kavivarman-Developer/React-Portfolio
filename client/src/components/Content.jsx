import { motion } from "framer-motion";
import portfolioImage from '../assets/portfolio.png'

const Content = () => {
    return (
        <section id="content" className="w-full">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left column: headline, description, CTAs */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-600 rounded-full text-sm font-semibold">Mern Stack Developer</span>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
                        >
                            Hi, I'm <span className="text-indigo-600">Kavi Varman</span>
                        </motion.h1>

                        <p className="max-w-xl text-gray-400 text-base sm:text-lg">
                            I build responsive, accessible React applications with a focus on clean UI and delightful user
                            interactions. Currently available for freelance and contract work.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center px-5 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition"
                            >
                                Contact Me
                            </a>
                            <a
                                href="#projects"
                                className="inline-flex items-center justify-center px-5 py-3 border border-gray-200 text-gray-400 rounded-md hover:bg-gray-50 transition"
                            >
                                View Projects
                            </a>
                        </div>
                    </div>

                    {/* Right column: profile image */}
                    {/* <div className="flex items-center justify-center md:justify-end">
                        <div className="relative">
                            <div className="hidden sm:block absolute transform rotate-1"></div>
                            <img
                                src={portfolioImage}
                                alt="Kavi Varman"
                                className="relative w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[420px] rounded-xl shadow-2xl object-cover"
                            />
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default Content
