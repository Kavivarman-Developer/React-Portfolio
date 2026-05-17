import { useEffect, useRef, useState } from "react";
import ParticleCanvas from "./ParticleCanvas";

const PortfolioEffects = () => {
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -400, y: -400 });
  const [cursorPos, setCursorPos] = useState({ x: -400, y: -400 });
  const [ringPos, setRingPos] = useState({ x: -400, y: -400 });
  const [hovering, setHovering] = useState(false);
  const targetRef = useRef({ x: -400, y: -400 });

  useEffect(() => {
    document.body.classList.add("kavi-cursor-active");
    return () => document.body.classList.remove("kavi-cursor-active");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let raf;
    const onMove = (e) => {
      const next = { x: e.clientX, y: e.clientY };
      targetRef.current = next;
      setMousePos(next);
      setCursorPos(next);
    };

    const animate = () => {
      setRingPos((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.12,
        y: prev.y + (targetRef.current.y - prev.y) * 0.12,
      }));
      raf = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const interactive = document.querySelectorAll("button, a, input, textarea, .project-card, .skill-chip, .service-card");
    const hover = () => setHovering(true);
    const unhover = () => setHovering(false);

    interactive.forEach((el) => {
      el.addEventListener("mouseenter", hover);
      el.addEventListener("mouseleave", unhover);
    });

    return () => {
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", hover);
        el.removeEventListener("mouseleave", unhover);
      });
    };
  });

  return (
    <>
      <div className="cursor" style={{ transform: `translate(${cursorPos.x - 5}px, ${cursorPos.y - 5}px)` }} />
      <div className={`cursor-ring${hovering ? " hovering" : ""}`} style={{ transform: `translate(${ringPos.x - 18}px, ${ringPos.y - 18}px)` }} />
      <div className="mouse-glow" style={{ left: mousePos.x, top: mousePos.y }} />
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <ParticleCanvas />
    </>
  );
};

export default PortfolioEffects;
