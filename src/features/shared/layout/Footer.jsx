import { Link } from 'react-router-dom';
import logoColor from '../../../assets/images/logo-color.png';
import { THONG_TIN_LIEN_HE, COT_LIEN_KET, THONG_TIN_BAN_QUYEN } from './constants/footerData';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandColumn}>
            <Link to="/" className={styles.logoLink} aria-label="REALIA - Về trang chủ">
              <img src={logoColor} alt="REALIA" className={styles.logoImage} />
            </Link>
            <p className={styles.description}>{THONG_TIN_LIEN_HE.moTa}</p>

            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{THONG_TIN_LIEN_HE.diaChi}</span>
              </li>

              <li className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>
                  Hotline:{' '}
                  <a href={THONG_TIN_LIEN_HE.hotlineHref} className={styles.contactLink}>
                    {THONG_TIN_LIEN_HE.hotline}
                  </a>
                </span>
              </li>

              <li className={styles.contactItem}>
                <svg
                  className={styles.contactIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span>
                  Email:{' '}
                  <a href={THONG_TIN_LIEN_HE.emailHref} className={styles.contactLink}>
                    {THONG_TIN_LIEN_HE.email}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {COT_LIEN_KET.map((cot) => (
            <div key={cot.id} className={styles.linksColumn}>
              <h3 className={styles.columnHeading}>{cot.tieuDe}</h3>
              <ul className={styles.linkList}>
                {cot.danhSach.map((item) => (
                  <li key={item.id} className={styles.linkItem}>
                    {item.noiBo ? (
                      <Link to={item.duongDan} className={styles.navLink}>
                        {item.nhan}
                      </Link>
                    ) : (
                      <a href={item.duongDan} className={styles.navLink}>
                        {item.nhan}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyrightText}>{THONG_TIN_BAN_QUYEN.banQuyen}</p>
          <p className={styles.noteText}>{THONG_TIN_BAN_QUYEN.ghiChu}</p>
        </div>
      </div>
    </footer>
  );
}
