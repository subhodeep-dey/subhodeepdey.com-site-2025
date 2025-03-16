"use client";

import { useTranslations } from "next-intl"
import { ContactForm } from "@/components/ContactForm"
import { NewsletterForm } from "@/components/NewsletterForm"
import { ContactPageSkeleton } from "@/components/ui/skeleton"
import { LazyLoad } from "@/components/LazyLoad"
import { MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"

function ContactContent() {
  const t = useTranslations("common")
  const mapUrl = process.env.NEXT_PUBLIC_MAP_URL || "https://master.apis.dev.openstreetmap.org/?mlat=12.97142&mlon=79.16036#map=16/12.97141/79.16036"
  const mapEmbedUrl = "https://www.openstreetmap.org/export/embed.html?bbox=79.15536,12.96641,79.16536,12.97641&layer=mapnik&marker=12.97142,79.16036"

  return (
    <section className="py-8 md:py-16">
      <div className="container max-w-4xl px-4 md:px-6">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            {t("home.formTitle")}
          </h1>
          <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            I'd love to hear from you! Whether you have a project in mind, want to collaborate, or just want to chat, feel free to drop me a message!
          </p>
          <p className="mt-3 text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            You can also <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline">book 30 minutes of time with me here</Link>!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="order-1">
            <ContactForm />
          </div>
          <div className="flex flex-col justify-start space-y-6 order-2">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-5 md:p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-zinc-600 dark:text-zinc-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      VIT University<br />
                      Vellore, Tamil Nadu<br />
                      India
                    </p>
                  </div>
                </div>

                <div>
                  <Link
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mt-2"
                  >
                    <span>View on map</span>
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="rounded-lg overflow-hidden h-[250px] md:h-[300px] w-full border border-zinc-200 dark:border-zinc-700">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                title="Location Map"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16">
          <div className="max-w-3xl mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Contact() {
  return (
    <LazyLoad skeleton={<ContactPageSkeleton />} isLoading={false}>
      <ContactContent />
    </LazyLoad>
  );
}
