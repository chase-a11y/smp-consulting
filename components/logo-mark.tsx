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
        d="M -100 50 L -100 30 L -58 -42 L -28 4 L 0 -52 L 28 4 L 58 -42 L 100 30 L 100 50 Z"
        fill={fill}
      />
    </svg>
  );
}
