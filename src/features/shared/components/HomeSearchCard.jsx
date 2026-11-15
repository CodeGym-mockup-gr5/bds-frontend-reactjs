import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOAI_BDS_OPTIONS, VI_TRI_OPTIONS } from '../../bat-dong-san/constants/batDongSanOptions';
import { ChevronDownIcon, SearchIcon } from './HomeIcons';
import styles from './HomeSearchCard.module.css';

export default function HomeSearchCard() {
  const navigate = useNavigate();
  const [tuKhoa, setTuKhoa] = useState('');
  const [loaiBds, setLoaiBds] = useState('');
  const [viTri, setViTri] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const trimmedKeyword = tuKhoa.trim();

    if (trimmedKeyword) {
      params.set('tuKhoa', trimmedKeyword);
    }
    if (loaiBds) {
      params.set('loaiBds', loaiBds);
    }
    if (viTri) {
      params.set('viTri', viTri);
    }

    const query = params.toString();
    navigate(query ? `/bat-dong-san?${query}` : '/bat-dong-san');
  };

  return (
    <section className={styles.heroCard} aria-labelledby="home-search-title">
      <h1 id="home-search-title" className={styles.title}>
        Tìm bất động sản phù hợp với bạn
      </h1>

      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.keywordWrap}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            className={styles.keywordInput}
            value={tuKhoa}
            maxLength={100}
            placeholder="Nhập địa chỉ hoặc từ khóa"
            aria-label="Nhập địa chỉ hoặc từ khóa"
            onChange={(event) => setTuKhoa(event.target.value)}
          />
        </div>

        <div className={styles.selectWrap}>
          <select
            className={styles.select}
            value={loaiBds}
            aria-label="Loại BĐS"
            onChange={(event) => setLoaiBds(event.target.value)}
          >
            <option value="">Loại BĐS</option>
            {LOAI_BDS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className={styles.selectIcon} />
        </div>

        <div className={styles.selectWrap}>
          <select
            className={styles.select}
            value={viTri}
            aria-label="Vị trí"
            onChange={(event) => setViTri(event.target.value)}
          >
            <option value="">Vị trí</option>
            {VI_TRI_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className={styles.selectIcon} />
        </div>

        <button type="submit" className={styles.submitButton}>
          Tìm kiếm
        </button>
      </form>
    </section>
  );
}
