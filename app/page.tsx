import styles from './styles.module.scss';

import '@/styles/global.scss';
import { Feed } from '@/components';

const Home = () => {
  return (
    <section className={styles.app}>
      <h1 className={styles.header}>
        Discover and Share
        <br />
        <span className={styles.orangeGradient}> AI-powered Prompts</span>
      </h1>
      <p>Promptopia is open-source AI prompting tool</p>

      <Feed />
    </section>
  );
};

export default Home;
