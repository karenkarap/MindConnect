import { NavLink } from 'react-router-dom';
import css from './DesktopMenu.module.css';
import Button from '../ui/Button/Button';
import type { User } from 'firebase/auth';
import { logOutUser } from '../../services/api/authApi';
import SvgIcon from '../ui/icons/SvgIcon';

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

      <div className={user ? css.profileWrapper : css.buttonWrapper}>
        {user ? (
          <>
            <div className={css.profileCredWrapper}>
              <div className={css.profileIconWrapper}>
                <SvgIcon name="profile" width={24} height={24} />
              </div>
              <p>{user.displayName}</p>
            </div>

            <Button text="Log out" color="transparent" onClick={() => logOutUser()} />
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
