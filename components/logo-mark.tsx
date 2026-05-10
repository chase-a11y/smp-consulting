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
      aria-label="SMP three-peak mark"
      className={className}
      style={{ display: "block" }}
    >
      <path
        d="M -95 50 L -95 18 L -52 -22 L -28 5 L 0 -60 L 28 5 L 52 -22 L 95 18 L 95 50 L 62 50 L 62 18 L 52 5 L 28 30 L 0 -28 L -28 30 L -52 5 L -62 18 L -62 50 Z"
        fill={fill}
      />
    </svg>
  );
}
