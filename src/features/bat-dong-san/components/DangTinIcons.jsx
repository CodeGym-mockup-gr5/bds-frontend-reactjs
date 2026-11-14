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

export function WarningIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z" />
    </svg>
  );
}

export function CheckIcon({ className = '' }) {
  return (
    <SvgIcon className={className}>
      <polyline points="20 6 9 17 4 12" />
    </SvgIcon>
  );
}

export function UploadIcon({ className = '' }) {
  return (
    <SvgIcon className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </SvgIcon>
  );
}

export function ImageIcon({ className = '' }) {
  return (
    <SvgIcon className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </SvgIcon>
  );
}

export function TrashIcon({ className = '' }) {
  return (
    <SvgIcon className={className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </SvgIcon>
  );
}

export function RetryIcon({ className = '' }) {
  return (
    <SvgIcon className={className}>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
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
