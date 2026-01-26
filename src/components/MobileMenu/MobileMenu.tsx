import { NavLink } from 'react-router-dom';
import css from './MobileMenu.module.css';
import { IoClose } from 'react-icons/io5';
import Button from '../Button/Button';
import { useEffect } from 'react';

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
  isAuth: boolean;
}

const MobileMenu = ({ onClose, isOpen, isAuth }: MobileMenuProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className={`${css.backdrop} ${isOpen ? css.open : ''}`} onClick={handleClick}>
      <div className={`${css.mobileMenu} ${isOpen ? css.open : ''}`}>
        <button type="button" className={css.closeMenuBtn} onClick={onClose}>
          <IoClose />
        </button>

        <nav>
          <ul className={css.mobileNavList}>
            <li onClick={onClose}>
              <NavLink to={'/'} className={({ isActive }) => (isActive ? css.accentColor : '')}>
                Home
              </NavLink>
            </li>
            <li onClick={onClose}>
              <NavLink
                to={'/psychologists'}
                className={({ isActive }) => (isActive ? css.accentColor : '')}
              >
                Psychologists
              </NavLink>
            </li>
            {isAuth && (
              <li onClick={onClose}>
                <NavLink
                  to={'favorites'}
                  className={({ isActive }) => (isActive ? css.accentColor : '')}
                >
                  Favorites
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className={css.buttonsWrapper}>
          {isAuth ? (
            <>
              <p>Username</p>
              <Button text="Log out" color="transparent" />
            </>
          ) : (
            <>
              <Button text="Log in" color="transparent" />
              <Button text="Registration" color="main" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
