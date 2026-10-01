export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`arrow-icon ${className}`.trim()}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3.5" y1="12.5" x2="12.5" y2="3.5" />
      <polyline points="5.5 3.5 12.5 3.5 12.5 10.5" />
    </svg>
  );
}
