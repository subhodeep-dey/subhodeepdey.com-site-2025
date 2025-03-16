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
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{t("contactPage.title")}</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">{t("contactPage.description")}</p>
        </div>
        
        {/* Contact Form and Info Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-3xl mx-auto w-full">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
          
          {/* Contact Info and Map */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-semibold mb-4">{t("contactPage.contactInfo")}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-zinc-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{t("contactPage.address.title")}</p>
                    <p className="text-zinc-600 dark:text-zinc-400">{t("contactPage.address.line1")}</p>
                    <p className="text-zinc-600 dark:text-zinc-400">{t("contactPage.address.line2")}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t("contactPage.viewLargerMap")}
                  <ExternalLink className="h-3 w-3" />
                </Link>
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
          <div className="max-w-3xl mx-auto w-full">
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
