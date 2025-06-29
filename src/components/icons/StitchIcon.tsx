const icons = {
  ChainIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.5 13c-1.2 1.2-1.2 3.1 0 4.2 1.2 1.2 3.1 1.2 4.2 0" />
      <path d="M14.7 8.8c1.2-1.2 3.1-1.2 4.2 0 .9.9 1.2 2.2.9 3.4" />
      <path d="M9.2 14.2c-1.2-1.2-1.2-3.1 0-4.2-1.2-1.2-3.1-1.2-4.2 0-1.2 1.2-1.2 3.1 0 4.2" />
      <path d="M4.9 19.1c-1.2-1.2-1.2-3.1 0-4.2.9-.9 2.2-1.2 3.4-.9" />
    </svg>
  ),
  SingleCrochetIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 7 7 17" />
      <path d="m7 7 10 10" />
    </svg>
  ),
  HalfDoubleCrochetIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 17h16" />
      <path d="M12 4v13" />
    </svg>
  ),
  DoubleCrochetIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 17h16" />
      <path d="M12 4v13" />
      <path d="M8 10h8" />
    </svg>
  ),
  MagicRingIcon: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="8" />
      <path d="m10 12-2-2" />
      <path d="m10 12 2-2" />
      <path d="M12 10v4" />
      <path d="M12 14a2 2 0 1 0-4 0" />
    </svg>
  ),
};

type StitchIconProps = React.SVGProps<SVGSVGElement> & {
  name: keyof typeof icons | string;
};

export function StitchIcon({ name, ...props }: StitchIconProps) {
  const IconComponent = icons[name as keyof typeof icons];
  if (!IconComponent) {
    // Fallback icon
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  }
  return <IconComponent {...props} />;
}
