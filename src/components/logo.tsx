export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="28" height="28" rx="7" className="fill-primary" />
        <path
          d="M19.5 8.5c.3.3.3.8 0 1.1l-2.6 2.6 1.4 1.4 2.6-2.6c.3-.3.8-.3 1.1 0 .9 1.5.7 3.5-.6 4.8-1.2 1.2-3 1.5-4.5.8l-5.4 5.4c-.6.6-1.6.6-2.2 0l-.9-.9c-.6-.6-.6-1.6 0-2.2l5.4-5.4c-.7-1.5-.4-3.3.8-4.5 1.3-1.3 3.3-1.5 4.8-.6z"
          className="fill-accent"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-foreground">
        FixIt<span className="text-accent">Now</span>
      </span>
    </div>
  );
}