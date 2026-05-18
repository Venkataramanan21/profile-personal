import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCode, FaDownload, FaGitAlt } from 'react-icons/fa';
import { useSitePath } from '../../../context/SiteRoutePrefixContext';
import PaintPath from '../PaintPath/PaintPath';
import SocialHover from '../SocialHover/SocialHover';
import Styles from './HeroTeaser.module.css';
import { site } from '../../../content/site';

const HeroTeaser = () => {
  const flagshipCase = useSitePath(`/projects/${site.flagshipSlug}`);
  const experiencePath = useSitePath('/experience');
  const resumePath = useSitePath('/resume');
  return (
    <>
      <motion.div className={Styles.logoContainer}>
        <motion.div className="p-2 transition-[padding] duration-500 ease-out">
          <SocialHover />
        </motion.div>
      </motion.div>

      <div className={Styles.container}>
        <motion.div className={`${Styles.paintPath} p-8 sm:p-20`}>
          <PaintPath />
        </motion.div>

        <motion.div
          className={`${Styles.header} ${Styles.glassCard} p-8 rounded-2xl text-slate-900 dark:text-white`}
        >
          <p className="text-slate-700 dark:text-slate-200">Hi, I am</p>

          <h1
            className={`${Styles.headerText} text-2xl sm:text-6xl font-bold sm:font-normal text-center text-slate-900 dark:text-white`}
          >
            {site.name}
          </h1>
          <p className="mx-auto max-w-2xl text-center text-slate-700 dark:text-slate-300">
            {site.tagline}
          </p>

          <motion.div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to={flagshipCase}
              className="flex items-center rounded-full bg-teal-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-teal-700"
            >
              <FaCode className="mr-2" />
              Read flagship case study
            </Link>
            <Link
              to={experiencePath}
              className="flex items-center rounded-full bg-violet-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-violet-700"
            >
              <FaGitAlt className="mr-2" />
              Experience log
            </Link>
            <Link
              to={resumePath}
              className="flex items-center rounded-full border-2 border-teal-600 px-6 py-3 font-semibold text-teal-700 transition duration-300 ease-in-out hover:scale-105 hover:border-teal-700 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-900/30"
            >
              <FaDownload className="mr-2" />
              Resume
            </Link>
            <a
              href="/resume.pdf"
              download={site.resumeFileName}
              className="flex items-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-teal-500 hover:text-teal-700 dark:border-slate-600 dark:text-slate-300 dark:hover:text-teal-400"
            >
              PDF
            </a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default HeroTeaser;
