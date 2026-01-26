import Container from '../../components/Container/Container';
import css from './Home.module.css';
import SvgIcon from '../../components/ui/icons/SvgIcon';
import heroImage from '../../assets/images/hero/image 1.webp';

const Home = () => {
  return (
    <section className={css.heroSection}>
      <Container>
        <div className={css.wrapper}>
          <div className={css.textContainer}>
            <h1 className={css.title}>
              The road to the <span className={css.accent}>depths</span> of the human soul
            </h1>
            <p className={css.text}>
              We help you to reveal your potential, overcome challenges and find a guide in your own
              life with the help of our experienced psychologists.
            </p>
            <button type="button" className={css.button}>
              Get started <SvgIcon size={16} name={'arrow'} />
            </button>
          </div>
          <div className={css.imageContainer}>
            <div className={css.imageWrapper}>
              <img src={heroImage} alt="Hero" loading="lazy" />
            </div>
            <div className={css.violet}>
              <SvgIcon name={'question'} size={17} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Home;
