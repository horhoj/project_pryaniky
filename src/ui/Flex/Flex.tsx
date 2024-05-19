import styles from './Flex.module.scss';

interface FlexProps {
  children?: React.ReactNode;
}
export function Flex({ children }: FlexProps) {
  return <div className={styles.Flex}>{children}</div>;
}
