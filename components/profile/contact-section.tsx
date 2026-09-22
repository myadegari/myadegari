"use client";

import { useState } from "react";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { SendIcon } from "@hugeicons/core-free-icons";
import { SectionCard } from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/components/providers/i18n-provider";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactSection() {
  const { t, data } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = t.errName;
    if (!email.trim()) nextErrors.email = t.errEmail;
    else if (!isValidEmail(email.trim())) nextErrors.email = t.errEmailFormat;
    if (message.trim().length < 10) nextErrors.message = t.errMessage;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus(null);
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name.trim()}`);
    const body = encodeURIComponent(
      `${message.trim()}\n\n--\n${name.trim()}\n${email.trim()}`
    );
    window.location.href = `mailto:${data.profile.email}?subject=${subject}&body=${body}`;
    setStatus(t.formSuccess);
  };

  return (
    <SectionCard id="contact" title={t.contactTitle}>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {t.contactLead}
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name">{t.nameLabel}</Label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className="h-10"
            />
            {errors.name && (
              <p id="contact-name-error" className="text-xs font-medium text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">{t.emailLabel}</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className="h-10"
            />
            {errors.email && (
              <p id="contact-email-error" className="text-xs font-medium text-destructive">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message">{t.messageLabel}</Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder={t.messagePlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className="min-h-28"
          />
          {errors.message && (
            <p id="contact-message-error" className="text-xs font-medium text-destructive">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{t.sendingNote}</p>
          <Button type="submit" size="lg" className="self-start sm:self-auto">
            <Icon icon={SendIcon} data-icon="inline-start" />
            {t.sendButton}
          </Button>
        </div>

        {status && (
          <p
            role="status"
            className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary"
          >
            {status}
          </p>
        )}
      </form>
    </SectionCard>
  );
}
