import Container from '../../components/Container/Container';
import css from './Home.module.css';
import SvgIcon from '../../components/ui/icons/SvgIcon';
import heroImage from '../../assets/images/hero/image 1.webp';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  onOpen: () => void;
}

const Home = ({ onOpen }: HomeProps) => {
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      onOpen();
    } else {
      navigate('psychologists');
    }
  };

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
            <button type="button" className={css.button} onClick={handleClick}>
              Get started <SvgIcon width={15} height={16} name={'arrow'} />
            </button>
          </div>
          <div className={css.imageContainer}>
            <div className={css.imageWrapper}>
              <img src={heroImage} alt="Hero" loading="lazy" />
            </div>
            <div className={css.violet}>
              <SvgIcon name={'question'} width={10} height={17} />
            </div>
            <div className={css.yellow}>
              <SvgIcon name="person" width={17} height={15} />
            </div>

            <div className={css.infoContainer}>
              <div className={css.infoContainerWhite}>
                <SvgIcon name="check" width={20} height={15} />
              </div>
              <div>
                <p className={css.infoContainerText}>Experienced psychologists</p>
                <p className={css.infoContainerCount}>15,000</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Home;
