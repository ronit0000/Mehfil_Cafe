// src/App.jsx
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

export default function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.toLowerCase();
    if (hash === '#privacy-policy' || hash === '#privacy') return 'privacy';
    if (hash === '#terms-of-service' || hash === '#terms') return 'terms';
    return 'home';
  });

  useEffect(() => {
    // Prevent browser from auto-jumping to previous scroll positions on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (!window.location.hash || window.location.hash === '#home') {
      window.scrollTo(0, 0);
    }

    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#privacy-policy' || hash === '#privacy') {
        setRoute('privacy');
      } else if (hash === '#terms-of-service' || hash === '#terms') {
        setRoute('terms');
      } else {
        setRoute('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newRoute) => {
    if (newRoute === 'privacy') {
      window.location.hash = '#privacy-policy';
      setRoute('privacy');
    } else if (newRoute === 'terms') {
      window.location.hash = '#terms-of-service';
      setRoute('terms');
    } else {
      window.location.hash = '#home';
      setRoute('home');
    }
  };

  if (route === 'privacy') {
    return <PrivacyPolicy onBack={() => navigateTo('home')} />;
  }

  if (route === 'terms') {
    return <TermsOfService onBack={() => navigateTo('home')} />;
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="overflow-x-clip w-full max-w-full">
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Contact />
      </main>
      <Footer onNavigate={navigateTo} />
      <BackToTop />
    </>
  );
}
