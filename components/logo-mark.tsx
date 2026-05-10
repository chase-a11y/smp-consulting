export default function LogoMark({
  size = 30,
  fill = "currentColor",
  className,
}: {
  size?: number;
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="-110 -70 220 140"
      width={size}
      height={size * (140 / 220)}
      aria-label="SMP twin-peak mark"
      className={className}
      style={{ display: "block" }}
    >
      <path
        d="M -100 50 L -100 30 L -38 -50 L -20 -30 L -20 -10 L 0 -34 L 20 -10 L 20 -30 L 38 -50 L 100 30 L 100 50 L 60 50 L 60 30 L 38 4 L 20 24 L 20 50 L -20 50 L -20 24 L -38 4 L -60 30 L -60 50 Z"
        fill={fill}
      />
    </svg>
  );
}
