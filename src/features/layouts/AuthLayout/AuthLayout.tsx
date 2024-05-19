import styles from './AuthLayout.module.scss';

interface AuthLayoutProps {
  children?: React.ReactNode;
}
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.authLayoutWrapper}>
      <div className={styles.AuthLayout}>
        <div>{children}</div>
      </div>
    </div>
  );
}
