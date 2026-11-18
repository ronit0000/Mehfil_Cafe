// src/components/ScrollProgress.jsx
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
      ticking = false;
    };
    const handler = () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-0.5 transition-all duration-100"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #D4A843, #E8782A)',
        boxShadow: '0 0 10px rgba(212,168,67,0.6)',
      }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
