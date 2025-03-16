import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import LegalPageLayout from '@/components/LegalPageLayout';
import TableOfContents from '@/components/TableOfContents';
import { Shield, User, Cookie, Database, ExternalLink, Bell, Mail } from 'lucide-react';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  // Ensure params is fully resolved
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('privacy.title'),
    description: t('privacy.description'),
  };
}

export default function PrivacyPolicyPage() {
  const t = useTranslations('common');
  const lastUpdated = "March 16, 2024";

  const tableOfContents = [
    { id: 'information-collection', title: t('privacy.informationCollection') },
    { id: 'cookies', title: t('privacy.cookies') },
    { id: 'data-usage', title: t('privacy.dataUsage') },
    { id: 'data-protection', title: t('privacy.dataProtection') },
    { id: 'third-party', title: t('privacy.thirdParty') },
    { id: 'policy-changes', title: t('privacy.policyChanges') },
    { id: 'contact', title: t('privacy.contact') }
  ];

  return (
    <LegalPageLayout title={t('privacy.title')} lastUpdated={lastUpdated}>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="md:sticky md:top-24">
            <TableOfContents items={tableOfContents} />
          </div>
        </div>

        <div className="md:w-3/4 space-y-8">
          <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {t('privacy.introText')}
          </p>

          <section id="information-collection" className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 scroll-mt-24">
            <div className="flex items-start">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('privacy.informationCollection')}</h2>
                <p className="mb-4 text-zinc-700 dark:text-zinc-300">{t('privacy.informationCollectionText')}</p>

                <h3 className="text-lg font-medium mb-2 text-zinc-800 dark:text-zinc-200">{t('privacy.personalInformation')}</h3>
                <ul className="list-disc pl-5 mb-4 space-y-1 text-zinc-700 dark:text-zinc-300">
                  <li>{t('privacy.personalInfoItem1')}</li>
                  <li>{t('privacy.personalInfoItem2')}</li>
                  <li>{t('privacy.personalInfoItem3')}</li>
                </ul>

                <h3 className="text-lg font-medium mb-2 text-zinc-800 dark:text-zinc-200">{t('privacy.nonPersonalInformation')}</h3>
                <p className="text-zinc-700 dark:text-zinc-300">{t('privacy.nonPersonalInfoText')}</p>
              </div>
            </div>
          </section>

          <section id="cookies" className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 scroll-mt-24">
            <div className="flex items-start">
              <Cookie className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('privacy.cookies')}</h2>
                <p className="text-zinc-700 dark:text-zinc-300">{t('privacy.cookiesText')}</p>
              </div>
            </div>
          </section>

          <section id="data-usage" className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 scroll-mt-24">
            <div className="flex items-start">
              <Database className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('privacy.dataUsage')}</h2>
                <p className="text-zinc-700 dark:text-zinc-300">{t('privacy.dataUsageText')}</p>
              </div>
            </div>
          </section>

          <section id="data-protection" className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 scroll-mt-24">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('privacy.dataProtection')}</h2>
                <p className="text-zinc-700 dark:text-zinc-300">{t('privacy.dataProtectionText')}</p>
              </div>
            </div>
          </section>

          <section id="third-party" className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 scroll-mt-24">
            <div className="flex items-start">
              <ExternalLink className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('privacy.thirdParty')}</h2>
                <p className="text-zinc-700 dark:text-zinc-300">{t('privacy.thirdPartyText')}</p>
              </div>
            </div>
          </section>

          <section id="policy-changes" className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 scroll-mt-24">
            <div className="flex items-start">
              <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('privacy.policyChanges')}</h2>
                <p className="text-zinc-700 dark:text-zinc-300">{t('privacy.policyChangesText')}</p>
              </div>
            </div>
          </section>

          <section id="contact" className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 scroll-mt-24">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-4">{t('privacy.contact')}</h2>
                <p className="text-zinc-700 dark:text-zinc-300">{t('privacy.contactText')}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </LegalPageLayout>
  );
}