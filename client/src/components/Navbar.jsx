import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm'
import { useHero } from '../context/HeroContext'
import { assets } from '../assets/assets';
import SearchInput from './SearchInput';

const Navbar = () => {

    

    const navLinks = [
        { name: 'Home', id: 'home' },
        { name: 'Contact', id: 'contact' },
        { name: 'Experience', id: 'experience' },
        { name: 'About', id: 'about' },
    ];

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { setActive } = useHero()
    const navigate = useNavigate();

    const goDashboard = () => {
        setIsMenuOpen(false);
        navigate('/dashboard');
    }

    const handleNav = (id) => {
        // Set the active hero content; don't navigate away
        setIsMenuOpen(false)
        setActive(id)
        // also attempt to scroll to top so hero is visible
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

            {/* Logo */}
            <Link to='/'>
                <img src={assets.logo} alt="logo"
                    className={`h-9 ${isScrolled && "invert opacity-80"}`}
                />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <button key={i} onClick={() => handleNav(link.id)} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                    </button>
                ))}
                <button 
                onClick={goDashboard}
                className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
                    Dashboard
                </button>
            </div>

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-4">
                <SearchInput />
                <button onClick={() => setShowLogin(true)} className="border text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
                    Login
                </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
                <SearchInput />
                <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="menuIcon" className={`${isScrolled && 
                    'invert'} h-4`} />
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="close-menu" className='h-6.5' />
                </button>

                {navLinks.map((link, i) => (
                    <button key={i} onClick={() => handleNav(link.id)}>
                        {link.name}
                    </button>
                ))}

                <button onClick={() => setShowLogin(true)} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                    Login
                </button>
            </div>

            {/* Login modal */}
            {showLogin && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60" onClick={() => setShowLogin(false)}>
                    <div className="w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="relative">
                            <LoginForm onClose={() => setShowLogin(false)} onSubmit={async (creds) => {
                                // if LoginForm calls onSubmit, close modal after it resolves
                                try {
                                    await Promise.resolve();
                                } finally {
                                    setShowLogin(false)
                                }
                            }} />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar