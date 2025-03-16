import { useTranslations } from "next-intl";
import { getTranslations } from 'next-intl/server';
import LegalPageLayout from '@/components/LegalPageLayout';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  // Ensure params is fully resolved
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    title: t('moral.title'),
    description: t('moral.moralIntro'),
  };
}

export default function MoralCodePage() {
  const t = useTranslations("common");
  const lastUpdated = "February 10, 2024";

  return (
    <LegalPageLayout title={t("moral.title")} lastUpdated={lastUpdated}>
      <div className="space-y-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
          <p className="text-lg text-blue-800 dark:text-blue-300 italic">
            "{t("moral.moralIntro")}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
            <div className="h-1 w-20 bg-amber-500 mb-4 rounded"></div>
            <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">{t('moral.principle1Title')}</h2>
            <p className="text-zinc-700 dark:text-zinc-300">{t('moral.principle1Text')}</p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
            <div className="h-1 w-20 bg-emerald-500 mb-4 rounded"></div>
            <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">{t('moral.principle2Title')}</h2>
            <p className="text-zinc-700 dark:text-zinc-300">{t('moral.principle2Text')}</p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
            <div className="h-1 w-20 bg-blue-500 mb-4 rounded"></div>
            <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">{t('moral.principle3Title')}</h2>
            <p className="text-zinc-700 dark:text-zinc-300">{t('moral.principle3Text')}</p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
            <div className="h-1 w-20 bg-purple-500 mb-4 rounded"></div>
            <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">{t('moral.principle4Title')}</h2>
            <p className="text-zinc-700 dark:text-zinc-300">{t('moral.principle4Text')}</p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow md:col-span-2">
            <div className="h-1 w-20 bg-rose-500 mb-4 rounded"></div>
            <h2 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">{t('moral.principle5Title')}</h2>
            <p className="text-zinc-700 dark:text-zinc-300">{t('moral.principle5Text')}</p>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-lg border border-zinc-200 dark:border-zinc-800 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-zinc-900 dark:text-zinc-100">{t('moral.conclusion')}</h2>
          <p className="text-zinc-700 dark:text-zinc-300 text-center max-w-2xl mx-auto">{t('moral.conclusionText')}</p>
        </div>
      </div>
    </LegalPageLayout>
  );
}