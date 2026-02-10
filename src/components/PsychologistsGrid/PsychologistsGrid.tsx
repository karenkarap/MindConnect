import type { Psychologist } from '../../types/psychologistsTypes';
import SvgIcon from '../ui/icons/SvgIcon';
import css from './PsychologistsGrid.module.css';

interface PsychologistsGridProps {
  psychologists: Psychologist[];
}

const PsychologistsGrid = ({ psychologists }: PsychologistsGridProps) => {
  console.log(psychologists);

  return (
    <ul className={css.list}>
      {psychologists.map((item) => (
        <li key={item.id} className={css.listItem}>
          <div className={css.imageWrapper}>
            <img src="#" alt={item.name} className={css.image} />
          </div>

          <div className={css.contentWrapper}>
            <div className={css.headerCard}>
              <div className={css.textNameWrapper}>
                <p className={css.text}>Psychologist</p>
                <h2 className={css.name}>{item.name}</h2>
              </div>

              <div className={css.ratingAndPrice}>
                <div>
                  <SvgIcon name="star" width={15} height={14} />
                  <p className={css.rating}>Rating: {item.rating}</p>
                </div>

                <div>
                  <p className={css.priceText}>
                    Price / 1 hour: <span className={css.price}>{item.price_per_hour}$</span>
                  </p>
                </div>
              </div>

              <button type="button" className={css.likeBtn}>
                <SvgIcon name="like" width={26} height={26} />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PsychologistsGrid;
