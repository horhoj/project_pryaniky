import classNames from 'classnames';
import styles from './MenuContent.module.scss';
import { LeftMenuLink } from './MenuLink';
import { routes } from '~/router/routes';

interface MenuContent {
  isMobile: boolean;
}

export function MenuContent({ isMobile }: MenuContent) {
  return (
    <nav
      className={classNames(
        styles.MenuContent,
        !isMobile && styles.MenuContentDesktop,
      )}
    >
      <LeftMenuLink to={routes.MAIN}>Main</LeftMenuLink>
      <LeftMenuLink to={routes.ABOUT}>About</LeftMenuLink>
    </nav>
  );
}
