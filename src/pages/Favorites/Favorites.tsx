import { useAuthStore } from '../../store/authStore';

const Favorites = () => {
  const user = useAuthStore((state) => state.user);

  return <div>Favorites</div>;
};

export default Favorites;
