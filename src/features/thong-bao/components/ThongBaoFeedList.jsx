import { formatDate } from '../../../utils/format';
import styles from './ThongBaoFeedList.module.css';

export default function ThongBaoFeedList({ items, isUpdating = false, footer = null }) {
  return (
    <div className={styles.card} aria-busy={isUpdating}>
      <ul className={`${styles.list} ${isUpdating ? styles.listUpdating : ''}`}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <time dateTime={item.ngay} className={styles.date}>
              {formatDate(item.ngay)}
            </time>
            <div className={styles.content}>
              <h2 className={styles.title}>{item.tenThongBao}</h2>
              {item.noiDung && <p className={styles.description}>{item.noiDung}</p>}
            </div>
          </li>
        ))}
      </ul>
      {footer}
    </div>
  );
}
