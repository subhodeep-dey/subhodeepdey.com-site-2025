"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import Script from "next/script"
import { isValidEmail, isValidName, isValidMessage } from "@/utils/validation"
import { AlertCircle } from "lucide-react"

// Define the hCaptcha global type
declare global {
  interface Window {
    hcaptcha: {
      render: (container: string, params: any) => string;
      reset: (widgetId?: string) => void;
      execute: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}

export function ContactForm() {
  const t = useTranslations("common")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const [captchaToken, setCaptchaToken] = useState("")
  const [hCaptchaLoaded, setHCaptchaLoaded] = useState(false)
  const [remainingSubmissions, setRemainingSubmissions] = useState(10)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [rateLimitResetTime, setRateLimitResetTime] = useState(0)
  const captchaRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>("")

  // Initialize hCaptcha when the script is loaded or when component is mounted
  useEffect(() => {
    // Function to initialize hCaptcha
    const initHCaptcha = () => {
      if (!window.hcaptcha || !captchaRef.current) return;

      try {
        // Clean up any existing widget first
        if (widgetIdRef.current) {
          try {
            window.hcaptcha.reset(widgetIdRef.current);
          } catch (e) {
            console.log("Reset failed, continuing with render");
          }
        }

        // Detect dark mode
        const isDarkMode = document.documentElement.classList.contains('dark');

        // Clear the container before rendering
        if (captchaRef.current.innerHTML !== '') {
          captchaRef.current.innerHTML = '';
        }

        widgetIdRef.current = window.hcaptcha.render(captchaRef.current.id, {
          sitekey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
          theme: isDarkMode ? "dark" : "light",
          callback: (token: string) => {
            setCaptchaToken(token)
          },
          "expired-callback": () => {
            setCaptchaToken("")
          },
          "error-callback": () => {
            setCaptchaToken("")
          }
        });

        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (
              mutation.type === 'attributes' &&
              mutation.attributeName === 'class' &&
              mutation.target === document.documentElement
            ) {
              // Theme has changed, reset captcha to apply new theme
              const newIsDarkMode = document.documentElement.classList.contains('dark');
              try {
                window.hcaptcha.reset(widgetIdRef.current);
                widgetIdRef.current = window.hcaptcha.render(captchaRef.current!.id, {
                  sitekey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
                  theme: newIsDarkMode ? "dark" : "light",
                  callback: (token: string) => {
                    setCaptchaToken(token)
                  },
                  "expired-callback": () => {
                    setCaptchaToken("")
                  },
                  "error-callback": () => {
                    setCaptchaToken("")
                  }
                });
              } catch (error) {
                console.error("Error updating hCaptcha theme:", error);
              }
            }
          });
        });

        observer.observe(document.documentElement, { attributes: true });

        return observer;
      } catch (error) {
        console.error("Error rendering hCaptcha:", error);
        return null;
      }
    };

    let observer: MutationObserver | null = null;

    // Initialize when hCaptcha is loaded
    if (hCaptchaLoaded) {
      observer = initHCaptcha() || null;
    }

    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect();
      }

      if (widgetIdRef.current) {
        try {
          window.hcaptcha.reset(widgetIdRef.current);
        } catch (error) {
          console.error("Error resetting hCaptcha:", error);
        }
      }
    };
  }, [hCaptchaLoaded]);

  // Re-initialize hCaptcha when the component becomes visible
  useEffect(() => {
    // Check if the component is visible in the viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hCaptchaLoaded && window.hcaptcha) {
          // Component is visible, reinitialize hCaptcha if needed
          try {
            if (widgetIdRef.current) {
              window.hcaptcha.reset(widgetIdRef.current);
            } else if (captchaRef.current) {
              const isDarkMode = document.documentElement.classList.contains('dark');
              widgetIdRef.current = window.hcaptcha.render(captchaRef.current.id, {
                sitekey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
                theme: isDarkMode ? "dark" : "light",
                callback: (token: string) => {
                  setCaptchaToken(token)
                },
                "expired-callback": () => {
                  setCaptchaToken("")
                },
                "error-callback": () => {
                  setCaptchaToken("")
                }
              });
            }
          } catch (error) {
            console.error("Error reinitializing hCaptcha:", error);
          }
        }
      });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the component is visible

    // Start observing the captcha container
    if (captchaRef.current) {
      observer.observe(captchaRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hCaptchaLoaded]);

  // Validate form fields on change
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        return !value.trim()
          ? 'First name is required'
          : !isValidName(value)
            ? 'First name must be at least 2 characters and contain only letters, spaces, hyphens, and apostrophes'
            : '';
      case 'lastName':
        return !value.trim()
          ? 'Last name is required'
          : !isValidName(value)
            ? 'Last name must be at least 2 characters and contain only letters, spaces, hyphens, and apostrophes'
            : '';
      case 'email':
        return !value.trim()
          ? 'Email is required'
          : !isValidEmail(value)
            ? 'Please enter a valid email address'
            : '';
      case 'message':
        return !value.trim()
          ? 'Message is required'
          : !isValidMessage(value)
            ? 'Message must be at least 10 characters'
            : '';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Validate field on change
    const error = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  }

  const validateForm = (): boolean => {
    const errors = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setFormErrors(errors);

    // Form is valid if no errors
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if rate limited
    if (isRateLimited) {
      toast.error(`Rate limit exceeded. Please try again in ${Math.ceil(rateLimitResetTime / 60)} minutes.`);
      return;
    }

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true)

    // Validate captcha
    if (!captchaToken) {
      toast.error("Please complete the captcha verification")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          message: formData.message,
          captchaToken,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429 && data.rateLimited) {
          setIsRateLimited(true);
          setRateLimitResetTime(data.resetTime * 60); // Convert minutes to seconds

          // Start countdown timer
          const timer = setInterval(() => {
            setRateLimitResetTime(prev => {
              if (prev <= 1) {
                clearInterval(timer);
                setIsRateLimited(false);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          throw new Error(data.error || "Rate limit exceeded");
        }

        throw new Error(data.error || "Failed to send message")
      }

      // Update remaining submissions
      if (data.remainingRequests !== undefined) {
        setRemainingSubmissions(data.remainingRequests);
      }

      toast.success(t("contactForm.success"))
      setFormData({ firstName: "", lastName: "", email: "", message: "" })

      // Reset captcha after successful submission
      if (hCaptchaLoaded && widgetIdRef.current) {
        window.hcaptcha.reset(widgetIdRef.current)
        setCaptchaToken("")
      }
    } catch (error: any) {
      console.error("Form submission error:", error)
      toast.error(error.message || t("contactForm.error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format the rate limit reset time
  const formatRateLimitTime = (): string => {
    const minutes = Math.floor(rateLimitResetTime / 60);
    const seconds = rateLimitResetTime % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <Script
        src={`https://js.hcaptcha.com/1/api.js`}
        strategy="lazyOnload"
        onLoad={() => setHCaptchaLoaded(true)}
      />

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">{t("home.formTitle")}</CardTitle>
          <CardDescription>
            Fill out the form below to send me a message.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-sm font-medium mb-1">Name (required)</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className={formErrors.firstName ? "text-red-500" : ""}>
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={formErrors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}
                  aria-invalid={!!formErrors.firstName}
                  aria-describedby={formErrors.firstName ? "firstName-error" : undefined}
                />
                {formErrors.firstName && (
                  <p id="firstName-error" className="text-sm text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className={formErrors.lastName ? "text-red-500" : ""}>
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={formErrors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}
                  aria-invalid={!!formErrors.lastName}
                  aria-describedby={formErrors.lastName ? "lastName-error" : undefined}
                />
                {formErrors.lastName && (
                  <p id="lastName-error" className="text-sm text-red-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className={formErrors.email ? "text-red-500" : ""}>
                Email (required)
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("contactForm.email")}
                value={formData.email}
                onChange={handleChange}
                required
                className={formErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "email-error" : undefined}
              />
              {formErrors.email && (
                <p id="email-error" className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-4 w-4" />
                  {formErrors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className={formErrors.message ? "text-red-500" : ""}>
                Message (required)
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder={t("contactForm.message")}
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className={formErrors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
                aria-invalid={!!formErrors.message}
                aria-describedby={formErrors.message ? "message-error" : undefined}
              />
              {formErrors.message && (
                <p id="message-error" className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-4 w-4" />
                  {formErrors.message}
                </p>
              )}
            </div>

            {/* hCaptcha container */}
            <div className="my-4">
              <div id="h-captcha" ref={captchaRef}></div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !captchaToken || isRateLimited}
            >
              {isSubmitting ? "Sending..." : isRateLimited ? `Try again in ${formatRateLimitTime()}` : t("contactForm.submit")}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-zinc-500 dark:text-zinc-400">
          {isRateLimited ? (
            <p>Rate limit exceeded. Please try again later.</p>
          ) : (
            <p>
              <button
                type="button"
                onClick={() => {
                  try {
                    // Check if hCaptcha is loaded
                    if (!window.hcaptcha) {
                      console.error("hCaptcha is not loaded yet");
                      return;
                    }

                    // First, try the simple reset approach
                    if (widgetIdRef.current) {
                      window.hcaptcha.reset(widgetIdRef.current);
                      setCaptchaToken("");
                      return; // Exit after successful reset
                    }

                    // If we don't have a widget ID, we need to re-render
                    if (captchaRef.current) {
                      // Clear the container first
                      captchaRef.current.innerHTML = '';

                      try {
                        // Re-render the CAPTCHA
                        const isDarkMode = document.documentElement.classList.contains('dark');
                        widgetIdRef.current = window.hcaptcha.render("h-captcha", {
                          sitekey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
                          theme: isDarkMode ? "dark" : "light",
                          callback: (token: string) => setCaptchaToken(token),
                          "expired-callback": () => setCaptchaToken(""),
                          "error-callback": () => setCaptchaToken("")
                        });
                        return; // Exit after successful re-render
                      } catch (renderError) {
                        console.error("Error rendering CAPTCHA:", renderError);
                        // Continue to last resort approach
                      }
                    } else {
                      console.error("CAPTCHA container not found");
                      return; // Exit if container not found
                    }

                    // Last resort: force a complete re-render with a new container
                    if (captchaRef.current) {
                      // Clear the container again
                      captchaRef.current.innerHTML = '';

                      // Create a new container to force a fresh render
                      const newContainer = document.createElement('div');
                      newContainer.id = 'h-captcha';
                      captchaRef.current.appendChild(newContainer);

                      // Re-render in the new container
                      const isDarkMode = document.documentElement.classList.contains('dark');
                      widgetIdRef.current = window.hcaptcha.render("h-captcha", {
                        sitekey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
                        theme: isDarkMode ? "dark" : "light",
                        callback: (token: string) => setCaptchaToken(token),
                        "expired-callback": () => setCaptchaToken(""),
                        "error-callback": () => setCaptchaToken("")
                      });
                    }
                  } catch (error) {
                    console.error("Error reloading CAPTCHA:", error);
                  }
                }}
                className="text-blue-500 hover:text-blue-700 hover:underline focus:outline-none"
              >
                Reload CAPTCHA
              </button>
            </p>
          )}
        </CardFooter>
      </Card>
    </>
  )
}
