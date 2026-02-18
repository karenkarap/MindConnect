import { useState } from 'react';
import type { Psychologist } from '../../types/psychologistsTypes';
import SvgIcon from '../ui/icons/SvgIcon';
import css from './PsychologistCard.module.css';

interface PsychologistCardProps {
  psychologist: Psychologist;
}

const PsychologistCard = ({ psychologist }: PsychologistCardProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <li key={psychologist.id} className={css.listItem}>
      <div className={css.imageWrapper}>
        <img src={psychologist.avatar_url} alt={psychologist.name} className={css.image} />
      </div>

      <div className={css.contentWrapper}>
        <div className={css.headerCard}>
          <div className={css.textNameWrapper}>
            <p className={css.text}>Psychologist</p>
            <h2 className={css.name}>{psychologist.name}</h2>
          </div>

          <div className={css.ratingAndPrice}>
            <div className={css.ratingWrapper}>
              <SvgIcon name="star" width={15} height={14} />
              <p className={css.rating}>Rating: {psychologist.rating}</p>
            </div>

            <p className={css.priceText}>
              Price / 1 hour: <span className={css.price}>{psychologist.price_per_hour}$</span>
            </p>

            <button type="button" className={css.likeBtn}>
              <SvgIcon name="like" width={26} height={26} />
            </button>
          </div>
        </div>

        <ul className={css.advantagesList}>
          <li className={css.advantagesItem} key={psychologist.experience}>
            <span className={css.softerColor}>Experience:</span> {psychologist.experience}
          </li>
          <li className={css.advantagesItem} key={psychologist.license}>
            <span className={css.softerColor}>License:</span>
            {psychologist.license}
          </li>
          <li className={css.advantagesItem} key={psychologist.specialization}>
            <span className={css.softerColor}>Specialization:</span>
            {psychologist.specialization}
          </li>
          <li className={css.advantagesItem} key={psychologist.initial_consultation.slice(0, 5)}>
            <span className={css.softerColor}>Initial consultation: </span>
            {psychologist.initial_consultation}
          </li>
        </ul>

        <p className={css.description}>{psychologist.about}</p>
        {openId !== psychologist.id && (
          <button
            type="button"
            className={css.readMoreBtn}
            onClick={() => setOpenId(openId === psychologist.id ? null : psychologist.id)}
          >
            Read more
          </button>
        )}

        {openId === psychologist.id && (
          <>
            <ul className={css.reviewList}>
              {psychologist.reviews.map((review) => (
                <li className={css.reviewWrapper} key={review.reviewer}>
                  <div className={css.reviewRatingWrapper}>
                    <div className={css.reviewLogo}>{review.comment.slice(0, 1)}</div>
                    <div className={css.reviewLogoRatingWrapper}>
                      <p>{review.reviewer}</p>
                      <div className={css.reviewLogoRating}>
                        <SvgIcon name="star" width={15} height={14} />
                        {review.rating}
                      </div>
                    </div>
                  </div>

                  <p className={css.reviewComment}>{review.comment}</p>
                </li>
              ))}
            </ul>
            <button type="button" className={css.appointmentBtn}>
              Make an appointment
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default PsychologistCard;
