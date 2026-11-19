// src/App.jsx
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
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
import MenuBrowse from './components/MenuBrowse';

function Home() {
  const [route, setRoute] = useState('home');

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

    handleHashChange();
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
      <main className="home-content">
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
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#F5EDD6',
            border: '1px solid rgba(212,168,67,0.3)',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
          },
          success: { iconTheme: { primary: '#D4A843', secondary: '#0A0A0A' } },
          error: { iconTheme: { primary: '#E8782A', secondary: '#0A0A0A' } },
        }}
      />
    </>
  );
}

export default function App({ page }) {
  return page.path === '/' ? <Home /> : <MenuBrowse menuPage={page.page ? page : null} />;
}
