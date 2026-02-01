import PaintPath from '../PaintPath/PaintPath';
import SocialHover from '../SocialHover/SocialHover';
import Styles from './HeroTeaser.module.css';
import { FaCode, FaDownload } from 'react-icons/fa';

const HeroTeaser = () => {
  return (
    <div className={Styles.container}>
      <div className={`${Styles.paintPath} p-8 sm:p-20`}>
        <PaintPath />
      </div>
              
      <div className={`${Styles.header} bg-slate-900 dark:bg-slate-900/50 p-8 rounded-2xl text-white`}>
        <div className={Styles.logoContainer}>
          {/* I need to give a hover effect that makes it feel lie it grows */}

          
          <div className="p-2 transition-[padding] duration-500 ease-out">
              {/** To show my github, leetcode, instagram, twitter, linkedin Id's */}

              {/* <img className={Styles.logo} src="zesova.jpg" /> */}
              <SocialHover />
            </div>
          </div>
        <div>Hi I am,</div>

        <div
          className={`${Styles.headerText} text-2xl sm:text-6xl font-bold sm:font-normal text-center text-white`}
        >
          Venkataramanan b
        </div>
        <div>Full-Stack Developer | Java, React & SQL Expert | My Source Code needs caffeine to spark!</div>

        <div className="flex gap-4 mt-6 flex-wrap justify-center">
          <button className="flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-full hover:border-none shadow-md hover:bg-teal-700 transition duration-300 ease-in-out transform hover:scale-105">
            <FaCode className="mr-2" />
            View My Work
          </button>
          <button className="flex items-center px-6 py-3 bg-transparent border-2 border-teal-600 text-teal-600 font-semibold rounded-full hover:border-teal-700 hover:bg-green-100 transition duration-300 ease-in-out transform hover:scale-105">
            <FaDownload className="mr-2" />
            Download My Resume
          </button>
        </div>
      </div>
    </div>
  );
};
export default HeroTeaser;
