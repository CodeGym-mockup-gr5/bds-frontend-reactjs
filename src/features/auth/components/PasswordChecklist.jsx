import { getPasswordChecklist } from '../utils/passwordPolicy';
import styles from './PasswordChecklist.module.css';

function CheckCircleIcon() {
  return (
    <svg
      className={styles.checkIcon}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" fill="currentColor" />
      <path
        d="M5 8.1L7.1 10.2L11.2 5.8"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PasswordChecklist({ password = '' }) {
  const items = getPasswordChecklist(password);

  return (
    <ul className={styles.list} aria-label="Yêu cầu mật khẩu mạnh">
      {items.map((item) => (
        <li key={item.id} className={`${styles.item} ${item.passed ? styles.itemPassed : ''}`}>
          {item.passed ? (
            <CheckCircleIcon />
          ) : (
            <span className={styles.circle} aria-hidden="true" />
          )}
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
