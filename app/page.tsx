import styles from './styles.module.scss';

const Home = () => {
  return (
    <section className={styles.app}>
      <h1 className={styles.header}>
        Discover and Share
        <br />
        <span className={styles.orange_gradient}> AI-powered Prompts</span>
      </h1>
      <p>Promptopia is open-source AI prompting tool</p>
    </section>
  );
};

export default Home;
