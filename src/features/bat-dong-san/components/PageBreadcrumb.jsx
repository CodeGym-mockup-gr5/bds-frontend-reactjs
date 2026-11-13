import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../../../components/Icons';
import styles from './PageBreadcrumb.module.css';

const FIRST_ENTRY_KEY = 'default';

export default function PageBreadcrumb({ items, fallbackPath = '/' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key === FIRST_ENTRY_KEY) {
      navigate(fallbackPath);
      return;
    }
    navigate(-1);
  };

  return (
    <nav className={styles.breadcrumb} aria-label="Đường dẫn">
      <button type="button" className={styles.back} onClick={handleBack}>
        <ArrowLeftIcon size={14} />
        Trở về
      </button>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className={styles.item}>
              <span className={styles.separator} aria-hidden="true">
                /
              </span>
              {item.to && !isLast ? (
                <Link to={item.to} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
