import styles from './App.module.scss';
import { useAuthFetchUserData } from '~/features/auth/hooks/useAuthFetchUserData';
import { Router } from '~/router/Router';
import { Spinner } from '~/ui/Spinner';

export function App() {
  const fetchAuthUserDataRequest = useAuthFetchUserData();

  return (
    <>
      <Spinner isShow={fetchAuthUserDataRequest.isLoading} />
      <div className={styles.App}>
        {!fetchAuthUserDataRequest.isLoading && <Router />}
      </div>
    </>
  );
}
