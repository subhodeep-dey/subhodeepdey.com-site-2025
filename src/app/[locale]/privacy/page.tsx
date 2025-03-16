import { useTranslations } from 'next-intl';


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: 'Privacy Policy',
    description: 'Description of the privacy policy',
  };
}

export default function PrivacyPolicyPage({ params: { locale } }: { params: { locale: string } }) {
  
  const t = useTranslations('common');

  return (
    <div className="container mx-auto px-6 py-12 md:px-12 lg:px-24">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('privacy.title')}</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">{t('privacy.lastUpdated')}: March 16, 2025</p>
        
        <h2>{t('privacy.introduction')}</h2>
        <p>{t('privacy.introText')}</p>
        
        <h2>{t('privacy.informationCollection')}</h2>
        <p>{t('privacy.informationCollectionText')}</p>
        
        <h3>{t('privacy.personalInformation')}</h3>
        <ul>
          <li>{t('privacy.personalInfoItem1')}</li>
          <li>{t('privacy.personalInfoItem2')}</li>
          <li>{t('privacy.personalInfoItem3')}</li>
        </ul>
        
        <h3>{t('privacy.nonPersonalInformation')}</h3>
        <p>{t('privacy.nonPersonalInfoText')}</p>
        
        <h2>{t('privacy.cookies')}</h2>
        <p>{t('privacy.cookiesText')}</p>
        
        <h2>{t('privacy.dataUsage')}</h2>
        <p>{t('privacy.dataUsageText')}</p>
        
        <h2>{t('privacy.dataProtection')}</h2>
        <p>{t('privacy.dataProtectionText')}</p>
        
        <h2>{t('privacy.thirdParty')}</h2>
        <p>{t('privacy.thirdPartyText')}</p>
        
        <h2>{t('privacy.policyChanges')}</h2>
        <p>{t('privacy.policyChangesText')}</p>
        
        <h2>{t('privacy.contact')}</h2>
        <p>{t('privacy.contactText')}</p>
      </div>
    </div>
  );
}