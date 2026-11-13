function SvgIcon({ className = '', children }) {
  return (
    <svg
      className={className}
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

export function SearchIcon({ className = '' }) {
  return (
    <SvgIcon className={className}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </SvgIcon>
  );
}

export function WarningIcon({ className = '' }) {
  return (
    <SvgIcon className={className}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </SvgIcon>
  );
}

export function ClipboardIcon({ className = '' }) {
  return (
    <SvgIcon className={className}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </SvgIcon>
  );
}

export function ChevronLeftIcon({ className = '' }) {
  return (
    <SvgIcon className={className}>
      <polyline points="15 18 9 12 15 6" />
    </SvgIcon>
  );
}

export function ChevronRightIcon({ className = '' }) {
  return (
    <SvgIcon className={className}>
      <polyline points="9 18 15 12 9 6" />
    </SvgIcon>
  );
}
