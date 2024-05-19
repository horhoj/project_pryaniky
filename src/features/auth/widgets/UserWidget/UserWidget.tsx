import styles from './UserWidget.module.scss';
import { useAppSelector } from '~/store/hooks';

export function UserWidget() {
  const userName = useAppSelector((state) => state.settings.userName);

  return <div className={styles.UserWidget}>{userName ?? 'unknown'}</div>;
}
