// src/App.jsx
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import Menu          from './components/Menu';
import Gallery       from './components/Gallery';
import Testimonials  from './components/Testimonials';
import Reservation   from './components/Reservation';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop     from './components/BackToTop';

export default function App() {
  return (
    <>
      {/* Scroll progress bar at top */}
      <ScrollProgress />

      {/* Sticky navigation */}
      <Navbar />

      {/* Page sections */}
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating back-to-top */}
      <BackToTop />
    </>
  );
}
