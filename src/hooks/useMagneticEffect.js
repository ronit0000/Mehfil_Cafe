// src/hooks/useMagneticEffect.js
import { useRef, useCallback } from 'react';

export function useMagneticEffect(strength = 0.35) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    ref.current.style.transform = 'translate(0px, 0px)';
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = '';
    }, 500);
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
