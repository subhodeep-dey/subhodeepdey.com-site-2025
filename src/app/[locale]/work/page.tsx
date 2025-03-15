"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

// Sample work experience data
const WORK_EXPERIENCE = [
  {
    id: 1,
    position: "Head of Engineering",
    company: "Insight Partners",
    badge: "via acquisition",
    location: "England, UK",
    period: "Dec 2021 — Present",
    description: "Insight Partners is a leading global venture capital and private equity firm investing in high-growth technology and software companies. The company has invested in more than 400 companies worldwide and has 90+ billion in assets under management.",
    details: "I joined the company after the acquisition of roadmap.sh which I have been running as a solo founder since 2017. I am now working full-time on the product and responsible for everything from content to engineering to product to marketing and growth.",
    skills: ["TypeScript", "React.js", "Node.js", "Astro", "RESTful APIs", "Tailwind", "GitHub", "Git", "AWS", "Terraform", "Ansible", "Docker", "CI/CD", "SEO", "Content Writing"],
    contributions: [
      "Designed and developed https://roadmap.sh",
      "Launched teams functionality used by +5k teams",
      "Launched user accounts and learning features used by +800k developers.",
      "Launched a custom roadmap builder generating +30k custom roadmaps",
      "Built an in-house tool for sending newsletters to +1m subscribers",
      "Developed a backoffice tool for reporting, managing the content and users",
      "Automated all things related to infrastructure",
      "Reporting infrastructure setup to keep an eye on everything",
      "Made it to the 6th most starred project on GitHub with 200k+ GitHub Stars",
      "Grew the traffic to +1m monthly visitors",
      "Grew the newsletter to +1m subscribers",
      "Grew the project's YouTube channel from 0 to +200K subscribers",
      "Created Visual guides with millions of page views",
      "Lead the community of +800k developers"
    ]
  },
  {
    id: 2,
    position: "Sr. Software Engineer",
    company: "Zalando",
    badge: "Why I Left Early?",
    location: "Berlin, Germany",
    period: "Jul 2021 — Dec 2021",
    description: "Zalando is the biggest online retailer of shoes, fashion and beauty across Europe.",
    details: "I worked in the Zalon team which is a personal shopping service where customers get styled by professional stylists. I mainly helped with the CRM and the migration of the legacy product to a new architecture.",
    skills: ["Scala", "AWS", "PostgreSQL", "Redis", "RESTful APIs", "Git", "Docker"],
    contributions: [
      "Helped migrate the CRM from Leanplum to Braze having +40m users data",
      "Refactored CRM pipelines to reduce the indexing times from 40min to 1min",
      "Prepared the architectural migration plan for legacy 'Zalon' product",
      "Collaborated with different teams to get the buy-in for the new architecture",
      "Refactor and implement features to support existing Zalon product",
      "Worked closely with the product teams on refinements and feasibility analysis",
      "Code reviews, mentoring, hiring, planning and so on."
    ]
  },
  {
    id: 3,
    position: "Engineering Manager",
    company: "Tradeling",
    badge: "Founding Engineer",
    location: "Dubai, UAE",
    period: "Dec 2019 — Jun 2021",
    description: "Tradeling is the UAE Government backed biggest B2B e-commerce platform that connects business buyers and sellers in the MENA region.",
    details: "I was the employee #3 and helped build, launch and scale the platform to millions of products, hundreds of sellers and thousands of buyers.",
    skills: ["Node.js", "React.js", "TypeScript", "Redux", "Jest", "ElasticSearch", "MongoDB", "Redis", "SOA", "RESTful APIs", "CI/CD", "GitHub", "DevOps", "AWS", "Docker"],
    contributions: [
      "Helped build and launch the B2B commerce platform within 3 months",
      "Built the engineering team from scratch to 50+ engineers within 1.5 years",
      "Achieve +1M products, thousands of buyers and sellers, and millions in revenue",
      "Lead 3 different teams, 'Buyer Center', 'Seller Center', and 'Catalog PIM'",
      "Proposed & led several product initiatives, including negotiated orders, & RFQs",
      "'Negotiated Orders' feature helped increase the conversion rate by 100x.",
      "'RFQs' feature helped increase the average order value by 10x.",
      "Helped implement CI/CD, feature flags, distributed tracing, monitoring, & so on.",
      "Skilling up the junior members by introducing mob/pair programming sessions",
      "Helped build the engineering culture, hiring, mentoring, and so on."
    ]
  }
]

export default function Work() {
  const t = useTranslations("common")
  const [expandedJobs, setExpandedJobs] = useState<number[]>([])

  const toggleJobDetails = (jobId: number) => {
    setExpandedJobs(prev =>
      prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container max-w-5xl">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t("work.title")}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
            {t("work.intro")}
          </p>
        </div>

        <div className="space-y-8">
          {WORK_EXPERIENCE.map((job) => (
            <Card key={job.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      {job.position}
                      <span className="text-zinc-500 dark:text-zinc-400">at</span>
                      {job.company}
                      {job.badge && (
                        <Badge variant="outline" className="ml-2 text-xs py-0 h-5">
                          {job.badge}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-base mt-1">
                      {job.location} <span className="mx-2">•</span> {job.period}
                    </CardDescription>
                  </div>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400">
                  {job.description}
                </p>
                <p className="text-zinc-800 dark:text-zinc-200">
                  {job.details}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-2 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <Button
                  variant="ghost"
                  className="w-full flex justify-center items-center gap-2 text-zinc-600 dark:text-zinc-400"
                  onClick={() => toggleJobDetails(job.id)}
                >
                  {expandedJobs.includes(job.id) ? (
                    <>
                      {t("work.hideDetails")}
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      {t("work.showDetails")}
                      <ChevronDown size={16} />
                    </>
                  )}
                </Button>

                {expandedJobs.includes(job.id) && (
                  <div className="mt-4 border-t pt-4 border-zinc-200 dark:border-zinc-800">
                    <ul className="space-y-2 list-disc list-inside text-zinc-600 dark:text-zinc-400">
                      {job.contributions.map((contribution, index) => (
                        <li key={index}>{contribution}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
