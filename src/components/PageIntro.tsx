interface PageIntroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description && <p className="page-intro__description">{description}</p>}
    </header>
  );
}
