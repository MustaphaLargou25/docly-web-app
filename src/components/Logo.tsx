export function Logo({ size = 28, withWordmark = false }: { size?: number; withWordmark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Docly logo"
      >
        <defs>
          <linearGradient id="docly-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563EB" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <path
          d="M8 6h16l8 8v20a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4Z"
          fill="url(#docly-grad)"
        />
        <path d="M24 6v8h8" fill="#fff" fillOpacity="0.25" />
        <path
          d="M20 30V18m0 0-5 5m5-5 5 5"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {withWordmark && (
        <span className="text-[18px] font-bold tracking-tight text-foreground">Docly</span>
      )}
    </div>
  );
}
