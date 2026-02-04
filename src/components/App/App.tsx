import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import css from './App.module.css';
import Home from '../../pages/Home/Home';
import Psychologists from '../../pages/Psychologists/Psychologists';
import Favorites from '../../pages/Favorites/Favorites';
import SvgSprite from '../ui/icons/SpriteIcons';
import { useState } from 'react';
import Modal from '../Modal/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <SvgSprite />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/psychologists" element={<Psychologists />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        {isModalOpen && <Modal variant="LogIn" onClose={handleModal} />}
      </main>
    </>
  );
}

export default App;
