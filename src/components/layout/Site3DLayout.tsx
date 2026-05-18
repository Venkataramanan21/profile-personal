import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { SiteRoutePrefixProvider } from '../../context/SiteRoutePrefixContext';
import { SITE_3D_PATH_PREFIX } from '../../lib/sitePaths';
import Footer from '../shared/Footer';
import SiteHeader from './SiteHeader';
import { Site3DScene } from './Site3DScene';

const CanvasFallback = () => (
  <div
    className="h-full w-full bg-[#040814]"
    aria-hidden
  />
);

function Site3DParallaxOutlet() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [2.2, -2.2]), { stiffness: 140, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-2.6, 2.6]), { stiffness: 140, damping: 22 });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my, reduceMotion]);

  if (reduceMotion) {
    return <Outlet />;
  }

  return (
    <motion.div
      className="min-h-full origin-top [transform-style:preserve-3d] px-[1px]"
      style={{ rotateX, rotateY }}
    >
      <Outlet />
    </motion.div>
  );
}

export default function Site3DLayout() {
  return (
    <SiteRoutePrefixProvider prefix={SITE_3D_PATH_PREFIX}>
      <div className="site-3d-active relative min-h-screen text-slate-900 dark:text-slate-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-teal-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
          <Suspense fallback={<CanvasFallback />}>
            <Canvas
              camera={{ position: [0, 1.6, 14], fov: 48 }}
              dpr={[1, 1.75]}
              gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
              <Site3DScene />
            </Canvas>
          </Suspense>
        </div>
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="relative flex-1 [perspective:2000px]">
            <Site3DParallaxOutlet />
          </main>
          <Footer />
        </div>
      </div>
    </SiteRoutePrefixProvider>
  );
}
