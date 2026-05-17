import { motion, useReducedMotion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

const KNOB_TRAVEL = 28;

interface ThemeToggleProps {
  embedded?: boolean;
}

const ThemeToggle = ({ embedded = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const reducedMotion = useReducedMotion();

  const spring = reducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 520, damping: 32 };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className={`${styles.root} ${embedded ? styles.embedded : ''}`}
    >
      <span className={styles.track} aria-hidden>
        <span className={styles.icons}>
          <motion.span
            className={`${styles.sunIcon} ${!isDark ? styles.sunActive : ''}`}
            animate={
              reducedMotion
                ? {}
                : {
                    rotate: isDark ? 0 : 360,
                    scale: isDark ? 0.85 : 1,
                  }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { rotate: { duration: 0.6, ease: 'easeOut' }, scale: { duration: 0.25 } }
            }
          >
            <Sun size={14} strokeWidth={2.25} />
          </motion.span>

          <span className={styles.moonIcon} data-active={isDark || undefined}>
            <motion.span
              className={isDark ? styles.moonActive : ''}
              style={{ display: 'flex' }}
              animate={
                reducedMotion
                  ? {}
                  : {
                      scale: isDark ? 1 : 0.85,
                      opacity: isDark ? 1 : 0.4,
                    }
              }
              transition={{ duration: 0.25 }}
            >
              <Moon size={14} strokeWidth={2.25} />
            </motion.span>
          </span>
        </span>

        <span
          className={`${styles.stars} ${isDark ? styles.starsVisible : ''}`}
          aria-hidden
        >
          <span className={styles.star} />
          <span className={styles.star} />
          <span className={styles.star} />
        </span>

        <motion.span
          className={styles.knob}
          animate={{ x: isDark ? KNOB_TRAVEL : 0 }}
          transition={spring}
        >
          <span
            className={`${styles.knobGlow} ${isDark ? styles.knobGlowMoon : styles.knobGlowSun}`}
          />
        </motion.span>
      </span>
    </button>
  );
};

export default ThemeToggle;
