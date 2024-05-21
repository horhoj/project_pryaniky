import classNames from 'classnames';
import styles from './Flex.module.scss';

interface FlexProps {
  children?: React.ReactNode;
  isAdaptive?: boolean;
}
export function Flex({ children, isAdaptive: isModal = true }: FlexProps) {
  return (
    <div className={classNames(styles.Flex, isModal && styles.isModal)}>
      {children}
    </div>
  );
}
