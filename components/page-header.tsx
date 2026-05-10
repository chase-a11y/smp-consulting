interface PageHeaderProps {
  eyebrow: string;
  title: string;
  titleEmphasis?: string;
  lede?: string;
}

export default function PageHeader({ eyebrow, title, titleEmphasis, lede }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="wrap">
        <span className="eyebrow">
          <span className="dot"></span>{eyebrow}
        </span>
        <h1 style={{ marginTop: 14 }}>
          {title}
          {titleEmphasis && (
            <>
              {" "}
              <em style={{ fontStyle: "italic" }}>{titleEmphasis}</em>
            </>
          )}
        </h1>
        {lede && <p className="lede" style={{ marginTop: 18, maxWidth: "56ch" }}>{lede}</p>}
      </div>
    </div>
  );
}
