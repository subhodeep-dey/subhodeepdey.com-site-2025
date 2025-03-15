"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";

function AboutPage() {
  const t = useTranslations("common");
  const locale = useLocale();
  const [openSpeciality, setOpenSpeciality] = useState<number | null>(null);
  const [openResearch, setOpenResearch] = useState<number | null>(null);

  const resumeUrl = `/downloads/${locale}/subhodeep_dey_resume_${locale === 'en' ? 'english' : locale === 'ko' ? 'korean' : 'japanese'}.pdf`;

  const toggleSpeciality = (index: number) => {
    setOpenSpeciality(openSpeciality === index ? null : index);
  };

  const toggleResearch = (index: number) => {
    setOpenResearch(openResearch === index ? null : index);
  };

  return (
    <section className="py-12 md:py-20">
      <div className="space-y-0">
        {/* About Me Section - Light */}
        <div className="container max-w-5xl">
          <div className="mb-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Me</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
                I build highly effective remote teams, harmonize business objectives with the creative journey, and serve as a translator between those formulating strategy and the creators executing.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                I'm skilled at channeling innovative ideas into practical, growth-focused strategies that drive meaningful progress. I bring transformational value to project teams across events, advertising, content and branding.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                I propel teams forward with authentic interpersonal connection and meaningful collaboration.
              </p>

              <a
                href={resumeUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-800 dark:bg-zinc-700 text-white rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors mb-6 md:mb-0"
              >
                <Download className="h-4 w-4" />
                <span>Resume</span>
              </a>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/path/to/image.jpg"
                alt="Profile"
                width={300}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Education Section - Dark */}
        <div className="bg-zinc-200 dark:bg-zinc-800 py-16">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 flex items-center">
                <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
              </div>
              <div className="col-span-3 space-y-16">
                <div className="relative pb-8">
                  <h3 className="text-xl font-semibold mb-2">School Name</h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">Description of the school.</p>
                  <div className="absolute bottom-0 left-0 right-0 border-b border-zinc-300/50 dark:border-zinc-600/50"></div>
                </div>
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-2">University Name</h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400">Description of the university.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialities Section - Light */}
        <div className="bg-zinc-50 dark:bg-zinc-900 py-16">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 flex items-center">
                <h2 className="text-3xl md:text-4xl font-bold">Specialities</h2>
              </div>
              <div className="col-span-3 space-y-8">
                {["Creative Operations", "Event Design + Production", "Brand System Development", "Other Speciality"].map((speciality, index) => (
                  <div key={index} className="relative">
                    <button
                      className="w-full flex justify-between items-center py-4"
                      onClick={() => toggleSpeciality(index)}
                    >
                      <span className="text-lg font-semibold">{speciality}</span>
                      {openSpeciality === index ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {openSpeciality === index && (
                      <div className="py-4 mb-6">
                        <p className="text-lg text-zinc-600 dark:text-zinc-400">Description of {speciality}.</p>
                      </div>
                    )}
                    {index < 3 && (
                      <div className="absolute -bottom-4 left-0 right-0 border-b border-zinc-300/50 dark:border-zinc-700/50"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Research Interest Section - Dark */}
        <div className="bg-zinc-200 dark:bg-zinc-800 py-16">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 flex items-center">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Research<br />Interest
                </h2>
              </div>
              <div className="col-span-3 space-y-8">
                {["Research Area 1", "Research Area 2", "Research Area 3", "Research Area 4"].map((research, index) => (
                  <div key={index} className="relative">
                    <button
                      className="w-full flex justify-between items-center py-4"
                      onClick={() => toggleResearch(index)}
                    >
                      <span className="text-lg font-semibold">{research}</span>
                      {openResearch === index ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {openResearch === index && (
                      <div className="py-4 mb-6">
                        <p className="text-lg text-zinc-600 dark:text-zinc-400">Description of {research}.</p>
                      </div>
                    )}
                    {index < 3 && (
                      <div className="absolute -bottom-4 left-0 right-0 border-b border-zinc-300/50 dark:border-zinc-600/50"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Songs Section - Light */}
        <div className="bg-zinc-50 dark:bg-zinc-900 py-16">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Songs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <iframe
                  src="https://open.spotify.com/embed/playlist/your_playlist_id_1"
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="encrypted-media"
                ></iframe>
              </div>
              <div>
                <iframe
                  src="https://open.spotify.com/embed/playlist/your_playlist_id_2"
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="encrypted-media"
                ></iframe>
              </div>
              <div>
                <iframe
                  src="https://open.spotify.com/embed/playlist/your_playlist_id_3"
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allow="encrypted-media"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Art Section - Dark */}
        <div className="bg-zinc-200 dark:bg-zinc-800 py-16">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Art</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <iframe
                  src="https://www.instagram.com/p/your_post_id_1/embed"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  allow="encrypted-media"
                ></iframe>
              </div>
              <div>
                <iframe
                  src="https://www.instagram.com/p/your_post_id_2/embed"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  allow="encrypted-media"
                ></iframe>
              </div>
              <div>
                <iframe
                  src="https://www.instagram.com/p/your_post_id_3/embed"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  allow="encrypted-media"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Workout Section - Light */}
        <div className="bg-zinc-50 dark:bg-zinc-900 py-16">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Workout</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <iframe
                  src="https://www.strava.com/activities/your_activity_id_1/embed"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  allow="encrypted-media"
                ></iframe>
              </div>
              <div>
                <iframe
                  src="https://www.strava.com/activities/your_activity_id_2/embed"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  allow="encrypted-media"
                ></iframe>
              </div>
              <div>
                <iframe
                  src="https://www.strava.com/activities/your_activity_id_3/embed"
                  width="100%"
                  height="450"
                  frameBorder="0"
                  allow="encrypted-media"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Misc Section - Dark */}
        <div className="py-16">
          <div className="container max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Misc</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Some demo text for the Misc section. This can include any additional information or content you want to share.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;