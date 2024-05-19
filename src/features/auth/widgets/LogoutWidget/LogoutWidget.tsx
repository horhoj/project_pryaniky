import { authSlice } from '../../store/authSlice';
import styles from './LogoutWidget.module.scss';
import { useAppDispatch } from '~/store/hooks';
import { Button } from '~/ui/Button';

export function LogoutWidget() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(authSlice.thunks.logoutThunk());
  };

  return (
    <Button
      onClick={handleLogout}
      isIcon={true}
      className={styles.LogoutWidget}
    >
      exit
    </Button>
  );
}
