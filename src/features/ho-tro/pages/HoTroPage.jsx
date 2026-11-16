import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DANH_SACH_HUONG_DAN, THONG_TIN_TRANG } from '../constants/supportData';
import SupportCard from '../components/SupportCard';
import SupportDetailModal from '../components/SupportDetailModal';
import styles from './HoTroPage.module.css';

export default function HoTroPage() {
  const navigate = useNavigate();
  const [selectedGuide, setSelectedGuide] = useState(null);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/" className={styles.breadcrumbLink}>
            Trang chủ
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Hỗ trợ</span>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>{THONG_TIN_TRANG.tieuDe}</h1>
          <p className={styles.subtitle}>{THONG_TIN_TRANG.moTa}</p>
        </header>

        <section className={styles.grid} aria-label="Danh sách chủ đề hướng dẫn">
          {DANH_SACH_HUONG_DAN.map((item) => (
            <SupportCard key={item.id} item={item} onSelect={setSelectedGuide} />
          ))}
        </section>

        <div className={styles.bottomActions}>
          <button type="button" className={styles.exitButton} onClick={() => navigate('/')}>
            Thoát
          </button>
        </div>

        <SupportDetailModal
          isOpen={Boolean(selectedGuide)}
          item={selectedGuide}
          onClose={() => setSelectedGuide(null)}
        />
      </div>
    </div>
  );
}
