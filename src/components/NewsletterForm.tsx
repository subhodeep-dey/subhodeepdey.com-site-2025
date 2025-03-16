"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { isValidEmail } from "@/utils/validation"
import { AlertCircle, Mail, CheckCircle, Loader2 } from "lucide-react"

export function NewsletterForm({ className = "" }: { className?: string }) {
  const t = useTranslations("common")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const validateEmail = (value: string): string => {
    return !value.trim()
      ? 'Email is required'
      : !isValidEmail(value)
        ? 'Please enter a valid email address'
        : '';
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setEmailError(validateEmail(value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    const error = validateEmail(email)
    setEmailError(error)
    if (error) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe to newsletter")
      }

      toast.success(data.message || "Successfully subscribed to the newsletter!")
      setEmail("")
      setIsSuccess(true)

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    } catch (error: unknown) {
      console.error("Newsletter subscription error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to subscribe to newsletter")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`w-full rounded-lg ${className}`}>
      <div className="bg-gradient-to-br from-zinc-100/90 to-zinc-200 dark:from-zinc-800/90 dark:to-zinc-900 p-6 rounded-lg text-zinc-800 dark:text-white">
        <div className="flex items-start mb-4">
          <Mail className="h-6 w-6 mr-3 mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Subscribe to Newsletter</h3>
            <p className="text-zinc-700/90 dark:text-white/80 text-sm">
              Get the latest updates and news delivered to your inbox
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="bg-zinc-800/10 dark:bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center space-x-3 text-zinc-800 dark:text-white">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p>Thank you for subscribing!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                id="newsletter-email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={handleChange}
                required
                className={`bg-zinc-800/10 dark:bg-white/10 backdrop-blur-sm border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-white/60 h-12 pl-4 pr-32 ${
                  emailError ? "border-red-500 dark:border-red-400 focus-visible:ring-red-500 dark:focus-visible:ring-red-400" : "focus-visible:ring-zinc-500 dark:focus-visible:ring-zinc-400"
                }`}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1.5 top-1.5 h-9 bg-zinc-800 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-white/90 hover:text-white dark:hover:text-zinc-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>

            {emailError && (
              <p id="email-error" className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 mt-1 pl-1">
                <AlertCircle className="h-4 w-4" />
                {emailError}
              </p>
            )}

            <p className="text-xs text-zinc-600 dark:text-white/70 mt-4 pl-1">
              By subscribing, you agree to receive email newsletters. You can unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}