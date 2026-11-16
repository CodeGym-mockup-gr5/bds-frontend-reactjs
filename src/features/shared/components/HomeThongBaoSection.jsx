import { formatDate } from '../../../utils/format';
import { THONG_BAO_TAM } from '../constants/homeData';
import styles from './HomeThongBaoSection.module.css';

export default function HomeThongBaoSection() {
  return (
    <section className={styles.section} aria-labelledby="home-thong-bao-title">
      <h2 id="home-thong-bao-title" className={styles.heading}>
        Thông báo
      </h2>

      <div className={styles.card}>
        <ul className={styles.list}>
          {THONG_BAO_TAM.map((item) => (
            <li key={item.id} className={styles.item}>
              <time dateTime={item.ngay} className={styles.date}>
                {formatDate(item.ngay)}
              </time>
              <div className={styles.content}>
                <h3 className={styles.itemTitle}>{item.tenThongBao}</h3>
                <p className={styles.itemDesc}>{item.noiDung}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
