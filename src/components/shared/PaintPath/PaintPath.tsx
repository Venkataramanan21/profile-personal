import { useEffect, useRef } from 'react';

const PaintPath = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // const element = ref.current;
      const path = ref.current.querySelector('.path') as SVGPathElement;
      if (path) {
        const totalLength = path.getTotalLength();
        path.style.strokeDasharray = String(totalLength);
        path.style.strokeDashoffset = String(totalLength / 3);
        path.style.animation = 'animation: dash 5s ease alternate infinite';
        // path.animate({ strokeDashoffset: 0 }, { strokeDashoffset: String(totalLength) });
        path.animate(
          [
            { strokeDashoffset: totalLength },
            { strokeDashoffset: 0 },
            { strokeDashoffset: totalLength },
          ],
          { duration: 7000, iterations: Infinity, easing: 'ease-in' }
        );
      }
    }
  }, []);

  return (
    <div ref={ref} className="w-full h-full">
      <svg viewBox="0 0 1005 768" className="w-full h-full">
        <path
          className="path"
          fill="transparent"
          stroke="#00000010"
          stroke-width="10"
          d="M117.787 82.3594C68.6242 82.3594 40.0658 122.33 88.7115 168.296C137.357 214.262 859.214 130.99 732.889 9.74644C650.653 -69.1821 30.0433 864.447 6 717.223C55.1628 601.309 859.214 820.48 963.215 679.251C1025.39 570.531 997.136 383.248 963.215 344.832"
        />
      </svg>
    </div>
  );
};

export default PaintPath;
