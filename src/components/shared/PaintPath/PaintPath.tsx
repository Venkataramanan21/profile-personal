import { useEffect, useRef } from 'react';

const PATH_D =
  'M117.787 82.3594C68.6242 82.3594 40.0658 122.33 88.7115 168.296C137.357 214.262 859.214 130.99 732.889 9.74644C650.653 -69.1821 30.0433 864.447 6 717.223C55.1628 601.309 859.214 820.48 963.215 679.251C1025.39 570.531 997.136 383.248 963.215 344.832';

const PaintPath = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = ref.current?.querySelector('.path') as SVGPathElement | null;
    if (!path) return;

    let animation: Animation | null = null;
    let frameId = 0;

    const startAnimation = () => {
      const totalLength = path.getTotalLength();
      if (!totalLength) return;

      path.getAnimations().forEach((a) => a.cancel());

      path.style.strokeDasharray = `${totalLength}`;
      path.style.strokeDashoffset = `${totalLength}`;

      animation = path.animate(
        [
          { strokeDashoffset: totalLength },
          { strokeDashoffset: 0 },
          { strokeDashoffset: totalLength },
        ],
        { duration: 7000, iterations: Infinity, easing: 'ease-in-out' }
      );
    };

    frameId = requestAnimationFrame(startAnimation);

    return () => {
      cancelAnimationFrame(frameId);
      animation?.cancel();
      path.getAnimations().forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div ref={ref} className="w-full h-full">
      <svg
        viewBox="0 0 1005 768"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full overflow-visible text-teal-900/30 dark:text-teal-100/35"
        aria-hidden
      >
        <path
          className="path"
          fill="none"
          stroke="currentColor"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          d={PATH_D}
        />
      </svg>
    </div>
  );
};

export default PaintPath;
