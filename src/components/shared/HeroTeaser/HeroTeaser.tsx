import PaintPath from '../PaintPath/PaintPath';
import SocialHover from '../SocialHover/SocialHover';
import Styles from './HeroTeaser.module.css';
import { Link } from 'react-router-dom';
import { FaCode, FaDownload, FaGitAlt } from 'react-icons/fa';

const HeroTeaser = () => {
  return (
    <div className={Styles.container}>
      <div className={`${Styles.paintPath} p-8 sm:p-20`}>
        <PaintPath />
      </div>

      <div className={Styles.logoContainer}>
        <div className="p-2 transition-[padding] duration-500 ease-out">
          <SocialHover />
        </div>
      </div>

      <div className={`${Styles.header} ${Styles.glassCard} p-8 rounded-2xl text-slate-900 dark:text-white`}>
        <div>Hi I am,</div>

        <div
          className={`${Styles.headerText} text-2xl sm:text-6xl font-bold sm:font-normal text-center text-slate-900 dark:text-white`}
        >
          Venkataramanan b
        </div>
        <div>Full-Stack Developer | Java, React & SQL Expert | My Source Code needs caffeine to spark!</div>

        <div className="flex gap-4 mt-6 flex-wrap justify-center">
          <a className="flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-full hover:border-none shadow-md hover:bg-teal-700 transition duration-300 ease-in-out transform hover:scale-105" href='#featured-work'>
            <FaCode className="mr-2" />
            View My Work
          </a>
          <Link
            to="/experience"
            className="flex items-center px-6 py-3 bg-violet-600 text-white font-semibold rounded-full shadow-md hover:bg-violet-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaGitAlt className="mr-2" />
            Experience Log
          </Link>
          <a className="flex items-center px-6 py-3 bg-transparent border-2 border-teal-600 text-teal-700 dark:text-teal-400 font-semibold rounded-full hover:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition duration-300 ease-in-out transform hover:scale-105" href='/resume.pdf' download="Venkataramanan Resume.pdf">
            <FaDownload className="mr-2" />
            Download My Resume
          </a>
        </div>
      </div>
    </div>
  );
};
export default HeroTeaser;
