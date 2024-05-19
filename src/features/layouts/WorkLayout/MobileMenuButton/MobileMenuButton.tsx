import styles from './MobileMenuButton.module.scss';
import { MenuIcon } from '~/assets/icons';
import { Button } from '~/ui/Button';

interface LogoProps {
  onMenuBtnClick: () => void;
}
export function MobileMenuButton({ onMenuBtnClick }: LogoProps) {
  return (
    <Button
      isIcon={true}
      onClick={onMenuBtnClick}
      className={styles.menuButton}
    >
      <MenuIcon />
    </Button>
  );
}
