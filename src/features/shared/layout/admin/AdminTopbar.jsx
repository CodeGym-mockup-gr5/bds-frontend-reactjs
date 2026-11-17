import { Fragment } from 'react';
import { Link, useMatches } from 'react-router-dom';
import Icon from '../../../../components/Icon';
import headerStyles from '../Header.module.css';
import AdminAccountMenu from './AdminAccountMenu';
import styles from './AdminTopbar.module.css';

function getBreadcrumb(matches) {
  const found = [...matches].reverse().find((match) => match.handle?.breadcrumb);
  return found ? found.handle.breadcrumb : [];
}

export default function AdminTopbar() {
  const breadcrumb = getBreadcrumb(useMatches());

  return (
    <header className={styles.topbar}>
      <nav aria-label="Đường dẫn">
        <ol className={styles.breadcrumb}>
          {breadcrumb.map((label, index) => (
            <Fragment key={label}>
              {index > 0 && (
                <li className={styles.separator} aria-hidden="true">
                  /
                </li>
              )}
              <li aria-current={index === breadcrumb.length - 1 ? 'page' : undefined}>{label}</li>
            </Fragment>
          ))}
        </ol>
      </nav>

      <div className={styles.actions}>
        <Link
          to="/admin/thong-bao"
          className={headerStyles.notificationButton}
          aria-label="Thông báo"
          title="Thông báo"
        >
          <Icon name="bell" size={20} />
        </Link>
        <AdminAccountMenu />
      </div>
    </header>
  );
}
