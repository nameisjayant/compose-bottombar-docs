import { useId } from "react";

/** The app's launcher icon (docs/logo.svg in the library repo), inlined so it stays crisp. */
export function Logo({ size = 32, className }: { size?: number; className?: string }) {
  const id = useId();
  return (
    <svg className={className} width={size} height={size} viewBox="18 18 72 72" role="img" aria-label="Compose Bottombar logo">
      <defs>
        <linearGradient id={id} x1="18" y1="18" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5B3CE0" />
          <stop offset="1" stopColor="#3F63EA" />
        </linearGradient>
      </defs>
      <rect x="18" y="18" width="72" height="72" rx="18" fill={`url(#${id})`} />
      <g transform="translate(54 54) scale(0.85) translate(-54 -54)" fillRule="evenodd">
        <path fill="#FFFFFF" fillOpacity="0.35" d="M39,50a15,15 0,1 0,30 0a15,15 0,1 0,-30 0zM43,50a11,11 0,1 1,22 0a11,11 0,1 1,-22 0z" />
        <path fill="#FFFFFF" d="M32,57H41.88A14,14 0,0 0,66.12 57H76a8,8 0,0 1,8 8a8,8 0,0 1,-8 8H32a8,8 0,0 1,-8 -8a8,8 0,0 1,8 -8zM30.5,65a2.5,2.5 0,1 0,5 0a2.5,2.5 0,1 0,-5 0zM72.5,65a2.5,2.5 0,1 0,5 0a2.5,2.5 0,1 0,-5 0z" />
        <path fill="#FFFFFF" d="M43,50a11,11 0,1 1,22 0a11,11 0,1 1,-22 0zM50,50a4,4 0,1 0,8 0a4,4 0,1 0,-8 0z" />
      </g>
    </svg>
  );
}
