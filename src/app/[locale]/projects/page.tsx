"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Github, Globe } from "lucide-react";
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
  },
]

function ProjectsContent() {
  const t = useTranslations("common");

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
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  {project.logo && (
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                      <Image
                        src={project.logo}
                        alt={project.title}
                        width={36}
                        height={36}
                      />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {project.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.stats.map((stat, index) => (
                    <div key={index} className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-md">
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        {stat.label}
                      </div>
                      <div className="font-semibold">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.website && (
                    <Button variant="outline" asChild>
                      <a href={project.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {t("projects.visitWebsite")}
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        {t("projects.visitGitHub")}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Projects() {
  // Projects page doesn't need to fetch data, so we can render it directly
  return <ProjectsContent />;
}
