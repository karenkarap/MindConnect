import { NavLink } from 'react-router-dom';
import css from './DesktopMenu.module.css';
import Button from '../Button/Button';

interface DesktopMenuProps {
  isAuth: boolean;
}

const DesktopMenu = ({ isAuth }: DesktopMenuProps) => {
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
          {isAuth && (
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
    </>
  );
};

export default DesktopMenu;
