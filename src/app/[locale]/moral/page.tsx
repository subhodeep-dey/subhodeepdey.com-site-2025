import { useTranslations } from "next-intl";

function MoralCodeContent() {
  const t = useTranslations("common");

  return (
    <div className="container mx-auto px-6 py-12 md:px-12 lg:px-24">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">{t("moral.title")}</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">{t("moral.moralIntro")}</p>
        
        <h2>{t('moral.principle1Title')}</h2>
        <p>{t('moral.principle1Text')}</p>
        
        <h2>{t('moral.principle2Title')}</h2>
        <p>{t('moral.principle2Text')}</p>
        
        <h2>{t('moral.principle3Title')}</h2>
        <p>{t('moral.principle3Text')}</p>
        
        <h2>{t('moral.principle4Title')}</h2>
        <p>{t('moral.principle4Text')}</p>
        
        <h2>{t('moral.principle5Title')}</h2>
        <p>{t('moral.principle5Text')}</p>
        
        <h2>{t('moral.conclusion')}</h2>
        <p>{t('moral.conclusionText')}</p>
      </div>
    </div>
  );
}

export default function Moral() {
  // Moral page doesn't need to fetch data, so we can render it directly
  return <MoralCodeContent />;
}