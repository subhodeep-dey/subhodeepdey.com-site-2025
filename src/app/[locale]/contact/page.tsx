import { useTranslations } from "next-intl"
import { ContactForm } from "@/components/ContactForm"

export default function Contact() {
  const t = useTranslations("common")

  return (
    <section className="py-12 md:py-20">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("home.formTitle")}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Feel free to reach out if you want to collaborate, have questions, or just want to connect.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
