import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('impressum.title'),
    description: t('impressum.description'),
  };
}

export default function ImpressumPage({ params: { locale } }: { params: { locale: string } }) {
  
  const t = useTranslations('common');

  return (
    <div className="container mx-auto px-6 py-12 md:px-12 lg:px-24">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('impressum.title')}</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <h2>{t('impressum.responsible')}</h2>
        <p>
          {t('impressum.name')}<br />
          {t('impressum.address')}<br />
          {t('impressum.country')}
        </p>
        
        <h2>{t('impressum.contact')}</h2>
        <p>
          {t('impressum.email')}: contact@example.com<br />
          {t('impressum.website')}: www.example.com
        </p>
        
        <h2>{t('impressum.businessRegistration')}</h2>
        <p>{t('impressum.registrationInfo')}</p>
        
        <h2>{t('impressum.vatId')}</h2>
        <p>{t('impressum.vatIdNumber')}</p>
        
        <h2>{t('impressum.disclaimer')}</h2>
        <p>{t('impressum.disclaimerContent')}</p>
      </div>
    </div>
  );
}