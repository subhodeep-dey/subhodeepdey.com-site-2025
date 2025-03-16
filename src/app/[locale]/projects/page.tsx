"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Github, Globe, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
import { ProjectsPageSkeleton } from "@/components/ui/skeleton";
import { LazyLoad } from "@/components/LazyLoad";

// Sample project data
const PROJECTS = [
  {
    id: 1,
    title: "roadmap.sh",
    description: "Learning paths for different roles and skills. Also features an AI roadmap generator, custom roadmap editor, teams usage and more.",
    logo: "https://ext.same-assets.com/1040507461/3957466420.svg+xml",
    website: "https://roadmap.sh",
    github: "https://github.com/SubhodeepDeyse/developer-roadmap",
    stats: [
      { label: "Visitors / Mo", value: "1.3m+" },
      { label: "GitHub Stars", value: "268k+" },
      { label: "Reg. Accounts", value: "850k+" },
      { label: "Reg. Teams", value: "10k+" },
    ],
    screenshots: [
      { url: "/roadmap.png", alt: "Roadmap.sh Dashboard" },
      { url: "/roadmap.png", alt: "Roadmap Generator" },
      { url: "/roadmap.png", alt: "Team Management" },
      { url: "/roadmap.png", alt: "Custom Roadmap Editor" },
    ]
  },
  {
    id: 2,
    title: "driver.js",
    description: "Lightweight, no-dependency, vanilla JS plugin to introduce new features, guide users through an interface, highlight things, show tooltips and more.",
    logo: "https://ext.same-assets.com/3242123441/1684627576.svg+xml",
    website: "https://driverjs.com",
    github: "https://github.com/SubhodeepDeyse/driver.js",
    stats: [
      { label: "Downloads", value: "2.2m" },
      { label: "GitHub Stars", value: "20.3k" },
      { label: "Website", value: "25k / mo" },
    ],
    screenshots: [
      { url: "/roadmap.png", alt: "Driver.js Demo" },
      { url: "/roadmap.png", alt: "Feature Highlighting" },
      { url: "/roadmap.png", alt: "User Onboarding" },
    ]
  },
  {
    id: 3,
    title: "time.fyi",
    description: "A fun project that I tinker with every now and then when I am bored. It features a timezone converter, daily planner, stop watch, timer and more.",
    logo: "https://ext.same-assets.com/1987611618/2416477917.svg+xml",
    website: "https://time.fyi",
    github: null,
    stats: [
      { label: "Hacker News", value: "758+ ups" },
      { label: "Website", value: "50k / mo" },
    ],
    screenshots: [
      { url: "/roadmap.png", alt: "Time.fyi Dashboard" },
      { url: "/roadmap.png", alt: "Timezone Converter" },
      { url: "/roadmap.png", alt: "Daily Planner" },
      { url: "/roadmap.png", alt: "Stopwatch Feature" },
    ]
  },
]

// Define the type for the selected image
interface SelectedImage {
  url: string;
  alt: string;
}

function ProjectsContent() {
  const t = useTranslations("common");
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  const toggleProjectHighlights = (projectId: number) => {
    setExpandedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const openImageModal = (image: SelectedImage) => {
    setSelectedImage(image);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="py-12 md:py-20">
      <div className="container max-w-5xl">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("projects.title")}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
            {t("projects.intro")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {PROJECTS.map((project) => (
            <Card key={project.id} className="overflow-hidden bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  {project.logo && (
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-200/70 dark:border-zinc-700/70">
                      <Image
                        src={project.logo}
                        alt={project.title}
                        width={36}
                        height={36}
                      />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-2xl text-zinc-800 dark:text-zinc-100">{project.title}</CardTitle>
                    <CardDescription className="text-base mt-1 text-zinc-600 dark:text-zinc-400">
                      {project.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {project.stats.map((stat, index) => (
                    <div key={index} className="bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-md border border-zinc-200/70 dark:border-zinc-700/70">
                      <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                        {stat.label}
                      </div>
                      <div className="font-semibold text-zinc-800 dark:text-zinc-200">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.website && (
                    <Button variant="outline" asChild className="bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700">
                      <a href={project.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {t("projects.visitWebsite")}
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button variant="outline" asChild className="bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        {t("projects.visitGitHub")}
                      </a>
                    </Button>
                  )}
                  {project.screenshots && project.screenshots.length > 0 && (
                    <Button
                      variant="outline"
                      className="bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 inline-flex items-center gap-2"
                      onClick={() => toggleProjectHighlights(project.id)}
                    >
                      <ImageIcon className="h-4 w-4" />
                      Highlights
                      {expandedProjects.includes(project.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Expandable Screenshots Section */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedProjects.includes(project.id) ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  {project.screenshots && (
                    <div className="mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-6">
                      <h3 className="text-lg font-medium mb-3 text-zinc-800 dark:text-zinc-200">Project Highlights</h3>
                      <div className="relative">
                        <div className="overflow-x-auto pb-4 scrollbar-thin">
                          <div className="flex gap-4 min-w-max pb-2">
                          {project.screenshots.map((screenshot, index) => (
                            <div
                              key={index}
                              className="relative min-w-[280px] sm:min-w-[320px] h-[200px] bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm group cursor-pointer"
                              onClick={() => openImageModal(screenshot)}
                            >
                              <Image
                                src={screenshot.url}
                                alt={screenshot.alt}
                                fill
                                className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                                {screenshot.alt}
                              </div>
                            </div>
                          ))}
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 "
          onClick={closeImageModal}
        >
          <div className="relative w-full max-w-4xl mx-auto animate-fadeIn">
            <div className="relative w-full pb-[56.25%] bg-zinc-900 rounded-lg overflow-hidden">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-base md:text-lg font-medium px-4">
              {selectedImage.alt}
            </div>
            <button
              className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                closeImageModal();
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default function Projects() {
  // Projects page doesn't need to fetch data, so we can render it directly
  return <ProjectsContent />;
}
