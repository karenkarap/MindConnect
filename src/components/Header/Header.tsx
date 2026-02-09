import { Link, useLocation } from 'react-router-dom';
import Container from '../Container/Container';
import css from './Header.module.css';
import { useState } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';
import DesktopMenu from '../DesktopMenu/DesktopMenu';
import { IoMenu } from 'react-icons/io5';
import { useAuthStore } from '../../store/authStore';

interface HeaderProps {
  onLogin: () => void;
  onRegister: () => void;
}

const Header = ({ onLogin, onRegister }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const user = useAuthStore((state) => state.user);

  return (
    <header className={`${css.header} ${isHome ? css.home : css.default}`}>
      <Container>
        <div className={css.headerWrapper}>
          <Link to={'/'} className={css.logo}>
            <span className={css.accentColor}>psychologists.</span>services
          </Link>

          <button
            type="button"
            className={css.openBtn}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <IoMenu />
          </button>

          <MobileMenu
            onClose={() => setIsMenuOpen((prev) => !prev)}
            isOpen={isMenuOpen}
            user={user}
            onLogin={onLogin}
            onRegister={onRegister}
          />
          <DesktopMenu user={user} onLogin={onLogin} onRegister={onRegister} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
