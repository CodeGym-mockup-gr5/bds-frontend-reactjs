function Icon({ size = 16, className = '', children }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function SearchIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Icon>
  );
}

export function SearchXIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="13.5" y1="8.5" x2="8.5" y2="13.5" />
      <line x1="8.5" y1="8.5" x2="13.5" y2="13.5" />
    </Icon>
  );
}

export function PinIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Icon>
  );
}

export function ArrowLeftIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </Icon>
  );
}

export function ArrowUpRightIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="8 7 17 7 17 16" />
    </Icon>
  );
}

export function ChevronDownIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <polyline points="6 9 12 15 18 9" />
    </Icon>
  );
}

export function ChevronLeftIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <polyline points="15 18 9 12 15 6" />
    </Icon>
  );
}

export function ChevronRightIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <polyline points="9 18 15 12 9 6" />
    </Icon>
  );
}

export function CheckIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  );
}

export function CloseIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  );
}

export function AlertIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </Icon>
  );
}

export function ResetIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <polyline points="3 3 3 9 9 9" />
    </Icon>
  );
}

export function ImageIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </Icon>
  );
}

export function FilterIcon({ size, className }) {
  return (
    <Icon size={size} className={className}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </Icon>
  );
}
