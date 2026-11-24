export function BrandMark({ className = '' }) {
  return (
    <svg
      className={`brand-symbol ${className}`.trim()}
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path className="brand-symbol__frame" d="M15 5h34l18 18v26L49 67H15L5 57V15L15 5Z" />
      <path className="brand-symbol__j" d="M16 21h18v25c0 8-4 12-12 12-5 0-9-2-11-6" />
      <path className="brand-symbol__b" d="M40 21h8c7 0 11 4 11 9 0 5-4 8-10 9H40m9 0c7 0 10 3 10 8 0 6-4 10-11 10h-8V21Z" />
      <path className="brand-symbol__signal" d="M32 36h9" />
      <circle className="brand-symbol__pulse" cx="57" cy="14" r="2.25" />
    </svg>
  )
}
