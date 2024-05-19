import { useEffect, useState } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import classNames from 'classnames';
import styles from './WorkLayout.module.scss';
import { MobileMenuButton } from './MobileMenuButton';
import { Header } from './Header';
import { MenuContent } from './LeftMenuContent';
import { Drawer } from '~/ui/Drawer';
import { UserWidget } from '~/features/auth/widgets/UserWidget';
import { LogoutWidget } from '~/features/auth/widgets/LogoutWidget';

interface WorkLayoutProps {
  children?: React.ReactNode;
}

export function WorkLayout({ children }: WorkLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useMediaQuery('only screen and (max-width: 600px)');

  useEffect(() => {
    setIsOpen(false);
  }, [isMobile]);

  const handleMenuButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isMobile && (
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position={'right'}
        >
          <Header>
            <div className={classNames(styles.headerRightBlock, styles.right)}>
              <MobileMenuButton onMenuBtnClick={handleMenuButtonClick} />
            </div>
          </Header>
          <MenuContent isMobile={true} />
        </Drawer>
      )}
      <div className={styles.WorkLayout}>
        <Header>
          <div className={styles.headerLeftBlock}>
            <UserWidget />
            <LogoutWidget />
          </div>
          {isMobile && (
            <MobileMenuButton onMenuBtnClick={handleMenuButtonClick} />
          )}
          {!isMobile && <MenuContent isMobile={false} />}
        </Header>
        <div className={styles.content}>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </>
  );
}
