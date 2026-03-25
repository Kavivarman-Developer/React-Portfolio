import React from 'react'
import Hero from '../components/Hero'
import TargetCursor from './TargetCursor';
import Footer from '../components/SiteFooter';

const Home = (props) => {
    return (
        <>
            <Hero />
            <Footer />
            <TargetCursor />
        </>
    )
}

export default Home
