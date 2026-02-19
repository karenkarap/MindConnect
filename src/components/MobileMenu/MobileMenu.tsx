import { NavLink } from 'react-router-dom';
import css from './MobileMenu.module.css';
import { IoClose } from 'react-icons/io5';
import Button from '../ui/Button/Button';
import { useEffect } from 'react';
import type { User } from 'firebase/auth';
import { logOutUser } from '../../services/api/authApi';

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
  user: User | null;
  onLogin: () => void;
  onRegister: () => void;
}

const MobileMenu = ({ onClose, isOpen, user, onLogin, onRegister }: MobileMenuProps) => {
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
            {user && (
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
          {user ? (
            <>
              <p>{user.displayName}</p>
              <Button text="Log out" color="transparent" onClick={() => logOutUser()} />
            </>
          ) : (
            <>
              <Button text="Log in" color="transparent" onClick={onLogin} />
              <Button text="Registration" color="main" onClick={onRegister} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
