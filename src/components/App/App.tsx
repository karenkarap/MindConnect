import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../../pages/Home/Home';
import Psychologists from '../../pages/Psychologists/Psychologists';
import Favorites from '../../pages/Favorites/Favorites';
import SvgSprite from '../ui/icons/SpriteIcons';
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import type { ModalType } from '../../types/modalType';
import type { LoginData, RegisterData } from '../../types/authTypes';
import { logInUser, registerUser } from '../../services/api/authApi';
import { useAuthStore } from '../../store/authStore';
import { initAuthListener } from '../../services/api/authListener';
import { Toaster } from 'react-hot-toast';

function App() {
  const [modalType, setModalType] = useState<ModalType>(null);

  const loading = useAuthStore((state) => state.loading);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const unsubscribe = initAuthListener();

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const openModalRegister = () => {
    setModalType('register');
  };

  const openModalLogin = () => {
    setModalType('login');
  };

  const closeModal = () => {
    setModalType(null);
  };

  const handleRegisterForm = async (data: RegisterData) => {
    try {
      const user = await registerUser(data);
      closeModal();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginForm = async (data: LoginData) => {
    try {
      const user = await logInUser(data);
      closeModal();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <SvgSprite />
      <Header onLogin={openModalLogin} onRegister={openModalRegister} />
      <main>
        <Routes>
          <Route path="/" element={<Home onOpen={openModalLogin} />} />
          <Route path="/psychologists" element={<Psychologists />} />
          {user && <Route path="/favorites" element={<Favorites />} />}
        </Routes>
        {modalType && (
          <Modal
            variant={modalType}
            onClose={closeModal}
            onSubmitLogin={handleLoginForm}
            onSubmitRegister={handleRegisterForm}
          />
        )}
      </main>
    </>
  );
}

export default App;
