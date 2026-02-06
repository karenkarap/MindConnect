import { NavLink } from 'react-router-dom';
import css from './DesktopMenu.module.css';
import Button from '../Button/Button';
import type { User } from 'firebase/auth';

interface DesktopMenuProps {
  user: User | null;
  onLogin: () => void;
  onRegister: () => void;
}

const DesktopMenu = ({ user, onLogin, onRegister }: DesktopMenuProps) => {
  return (
    <>
      <nav className={css.navWrapper}>
        <ul className={css.desktopNavList}>
          <li>
            <NavLink
              to={'/'}
              className={({ isActive }) => `${css.link} ${isActive ? css.accentColor : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/psychologists'}
              className={({ isActive }) => `${css.link} ${isActive ? css.accentColor : ''}`}
            >
              Psychologists
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to={'favorites'}
                className={({ isActive }) => `${css.link} ${isActive ? css.accentColor : ''}`}
              >
                Favorites
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      <div className={css.buttonWrapper}>
        {user ? (
          <>
            <p>{user.displayName}</p>
            <Button text="Log out" color="transparent" />
          </>
        ) : (
          <>
            <Button text="Log in" color="transparent" onClick={onLogin} />
            <Button text="Registration" color="main" onClick={onRegister} />
          </>
        )}
      </div>
    </>
  );
};

export default DesktopMenu;
