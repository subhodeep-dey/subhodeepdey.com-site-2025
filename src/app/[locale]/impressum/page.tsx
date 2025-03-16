import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import LegalPageLayout from '@/components/LegalPageLayout';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  // Ensure params is fully resolved
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('impressum.title'),
    description: t('impressum.description'),
  };
}

export default function ImpressumPage() {
  const t = useTranslations('common');
  const lastUpdated = "January 15, 2024";

  return (
    <LegalPageLayout title={t('impressum.title')} lastUpdated={lastUpdated}>
      <div className="space-y-8">
        <section className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">{t('impressum.responsible')}</h2>
          <div className="flex flex-col space-y-1 text-zinc-700 dark:text-zinc-300">
            <p className="font-medium">{t('impressum.name')}</p>
            <p>{t('impressum.address')}</p>
            <p>{t('impressum.country')}</p>
          </div>
        </section>

        <section className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">{t('impressum.contact')}</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="font-medium w-24">{t('impressum.email')}:</span>
              <a href="mailto:contact@example.com" className="text-blue-600 dark:text-blue-400 hover:underline">contact@example.com</a>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24">{t('impressum.website')}:</span>
              <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">www.example.com</a>
            </div>
          </div>
        </section>

        <section className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">{t('impressum.businessRegistration')}</h2>
          <p className="text-zinc-700 dark:text-zinc-300">{t('impressum.registrationInfo')}</p>
        </section>

        <section className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">{t('impressum.vatId')}</h2>
          <p className="text-zinc-700 dark:text-zinc-300">{t('impressum.vatIdNumber')}</p>
        </section>

        <section className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">{t('impressum.disclaimer')}</h2>
          <p className="text-zinc-700 dark:text-zinc-300">{t('impressum.disclaimerContent')}</p>
        </section>
      </div>
    </LegalPageLayout>
  );
}