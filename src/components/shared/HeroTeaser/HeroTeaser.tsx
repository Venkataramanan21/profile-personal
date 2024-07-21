import PaintPath from '../PaintPath/PaintPath';
import Styles from './HeroTeaser.module.css';
const HeroTeaser = () => {
  return (
    <div className={Styles.container}>
      <div className={`${Styles.paintPath} p-8 sm:p-20`}>
        <PaintPath />
      </div>
      <div className={Styles.header}>
        <div className={Styles.logoContainer}>
          <img className={Styles.logo} src="zesova.jpg" />
        </div>
        <div>Hi I am,</div>

        <div
          className={`${Styles.headerText} text-2xl sm:text-6xl font-bold sm:font-normal`}
        >
          Venkataramanan b
        </div>
        <div>Front End Developer - My Source Code needs caffeine to spark!</div>
      </div>
    </div>
  );
};
export default HeroTeaser;
