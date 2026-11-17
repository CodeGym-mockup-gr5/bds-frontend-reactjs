import Icon from './Icon';
import styles from './TableActionButton.module.css';

export default function TableActionButton({
  icon,
  label,
  ariaLabel = undefined,
  variant = 'default',
  onClick = undefined,
  disabled = false,
}) {
  const isDanger = variant === 'danger';
  const className = isDanger ? `${styles.button} ${styles.danger}` : styles.button;

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <Icon name={icon} />
      {label}
    </button>
  );
}
