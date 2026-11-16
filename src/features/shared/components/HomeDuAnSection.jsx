import { formatArea } from '../../../utils/format';
import { getOptionLabel, VI_TRI_OPTIONS } from '../../bat-dong-san/constants/batDongSanOptions';
import { DU_AN_MOI_TAM } from '../constants/homeData';
import { HomePlaceholderIcon } from './HomeIcons';
import styles from './HomeDuAnSection.module.css';

export default function HomeDuAnSection() {
  return (
    <section className={styles.section} aria-labelledby="home-du-an-title">
      <h2 id="home-du-an-title" className={styles.heading}>
        Các dự án mới
      </h2>

      <div className={styles.grid}>
        {DU_AN_MOI_TAM.map((item) => {
          const viTriLabel = getOptionLabel(VI_TRI_OPTIONS, item.viTri);
          const dienTichText = formatArea(item.dienTich);
          const metaText = [viTriLabel, dienTichText].filter(Boolean).join(' · ');

          return (
            <article key={item.id} className={styles.card}>
              <div className={styles.media}>
                <HomePlaceholderIcon />
              </div>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{item.tieuDe}</h3>
                <p className={styles.cardMeta}>{metaText}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
