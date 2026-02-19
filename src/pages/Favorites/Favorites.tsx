import { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { getFavorites } from '../../services/api/favorites';

const Favorites = () => {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const res = await getFavorites(user?.uid);
        console.log(res);
      }
    };
    getData();
  }, []);

  return <div>Favorites</div>;
};

export default Favorites;
