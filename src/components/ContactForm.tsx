"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function ContactForm() {
  const t = useTranslations("common")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // This would be replaced with actual form submission logic
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success(t("contactForm.success"))
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      toast.error(t("contactForm.error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">{t("home.formTitle")}</CardTitle>
        <CardDescription>
          Fill out the form below to send me a message.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("contactForm.name")}</Label>
            <Input
              id="name"
              name="name"
              placeholder={t("contactForm.name")}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("contactForm.email")}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t("contactForm.email")}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t("contactForm.message")}</Label>
            <Textarea
              id="message"
              name="message"
              placeholder={t("contactForm.message")}
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : t("contactForm.submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
