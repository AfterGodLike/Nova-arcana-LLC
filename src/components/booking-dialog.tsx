"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";

type Purpose = "inquiry" | "insights" | "session" | "";
type InsightFormat = "pdf" | "audio" | "";
type SessionPlatform = "whatsapp" | "zoom" | "meet" | "";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ─── SVG Logos for session platforms ─── */
function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      <path
        d="M23.328 8.616a9.56 9.56 0 00-6.776-2.808c-5.296 0-9.6 4.304-9.6 9.6 0 1.693.442 3.344 1.28 4.8L7 25.016l4.528-1.186A9.56 9.56 0 0016.552 25.4c5.296 0 9.6-4.304 9.6-9.6a9.56 9.56 0 00-2.824-6.184zM16.552 23.6a7.95 7.95 0 01-4.056-1.112l-.288-.172-2.984.782.796-2.912-.188-.3A7.932 7.932 0 018.552 15.4c0-4.412 3.588-8 8-8s8 3.588 8 8-3.588 8-8 8zm4.384-5.976c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.012-.372-1.928-1.188-.712-.634-1.192-1.416-1.332-1.656-.14-.24-.016-.37.104-.49.108-.108.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.196-.468-.394-.404-.54-.412-.14-.008-.3-.008-.46-.008s-.42.06-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.594 4.12 3.636.576.248 1.026.396 1.376.508.578.184 1.104.158 1.52.096.464-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"
        fill="white"
      />
    </svg>
  );
}

function ZoomLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <rect width="32" height="32" rx="8" fill="#2D8CFF" />
      <path
        d="M7 11.5a2.5 2.5 0 012.5-2.5h8a2.5 2.5 0 012.5 2.5v5a2.5 2.5 0 01-2.5 2.5h-8A2.5 2.5 0 017 16.5v-5zm15.3-.6l3.2-2.4a.8.8 0 011.3.64v8.72a.8.8 0 01-1.3.64l-3.2-2.4V10.9z"
        fill="white"
      />
    </svg>
  );
}

function MeetLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <rect width="32" height="32" rx="8" fill="#00897B" />
      <path
        d="M7 12a3 3 0 013-3h6a3 3 0 013 3v8a3 3 0 01-3 3h-6a3 3 0 01-3-3v-8zm14.5 1.5l4-3a1 1 0 011.5.86v9.28a1 1 0 01-1.5.86l-4-3v-5z"
        fill="white"
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════ */
export function BookingDialog({ open, onOpenChange }: BookingDialogProps) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("");
  const [purpose, setPurpose] = useState<Purpose>("");

  // Inquiry fields
  const [inquiryText, setInquiryText] = useState("");

  // Insights fields
  const [insightFormat, setInsightFormat] = useState<InsightFormat>("");
  const [insightComment, setInsightComment] = useState("");

  // Session fields
  const [sessionPlatform, setSessionPlatform] = useState<SessionPlatform>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sessionComment, setSessionComment] = useState("");

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function resetForm() {
    setName("");
    setDob("");
    setCountry("");
    setPurpose("");
    setInquiryText("");
    setInsightFormat("");
    setInsightComment("");
    setSessionPlatform("");
    setPhoneNumber("");
    setSessionComment("");
    setSubmitting(false);
    setSubmitStatus("idle");
    setErrorMessage("");
  }

  function handleClose(open: boolean) {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  }

  const isValid = () => {
    if (!name.trim() || !dob || !country.trim() || !purpose) return false;
    if (purpose === "inquiry" && !inquiryText.trim()) return false;
    if (purpose === "insights" && !insightFormat) return false;
    if (purpose === "session" && !sessionPlatform) return false;
    if (purpose === "session" && sessionPlatform === "whatsapp" && !phoneNumber.trim())
      return false;
    return true;
  };

  const getPurposeLabel = () => {
    switch (purpose) {
      case "inquiry":
        return "Professional Inquiry";
      case "insights":
        return "Personalized Insights";
      case "session":
        return "Private Session";
      default:
        return "";
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid()) return;

    setSubmitting(true);
    setSubmitStatus("idle");

    try {
      const body: Record<string, string> = {
        name: name.trim(),
        dateOfBirth: dob,
        country: country.trim(),
        purpose,
      };

      if (purpose === "inquiry") {
        body.inquiryText = inquiryText.trim();
      }
      if (purpose === "insights") {
        body.insightFormat = insightFormat;
        if (insightComment.trim()) body.insightComment = insightComment.trim();
      }
      if (purpose === "session") {
        body.sessionPlatform = sessionPlatform;
        if (phoneNumber.trim()) body.phoneNumber = phoneNumber.trim();
        if (sessionComment.trim()) body.sessionComment = sessionComment.trim();
      }

      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSubmitStatus("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setSubmitStatus("error");
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  }

  /* ─── Success view ─── */
  if (submitStatus === "success") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-center">
              Submission Successful
            </h3>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Thank you, {name.split(" ")[0]}! Your booking request has been
              received. We&apos;ll get back to you shortly.
            </p>
            <Button
              onClick={() => handleClose(false)}
              className="mt-2 bg-amber-700 hover:bg-amber-800 text-white"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  /* ─── Main form ─── */
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Book a Service</DialogTitle>
          <DialogDescription>
            Fill out the form below and we&apos;ll get back to you within one
            business day.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* ── Error banner ── */}
          {submitStatus === "error" && (
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">
                  Submission Failed
                </p>
                <p className="text-xs text-red-600 mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* ── Name ── */}
          <div className="space-y-1.5">
            <Label htmlFor="booking-name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="booking-name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* ── Date of Birth ── */}
          <div className="space-y-1.5">
            <Label htmlFor="booking-dob">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <Input
              id="booking-dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          {/* ── Country ── */}
          <div className="space-y-1.5">
            <Label htmlFor="booking-country">
              Country <span className="text-red-500">*</span>
            </Label>
            <Input
              id="booking-country"
              placeholder="e.g. United States"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          {/* ── Purpose ── */}
          <div className="space-y-1.5">
            <Label>
              Purpose of Booking <span className="text-red-500">*</span>
            </Label>
            <Select
              value={purpose}
              onValueChange={(val) => {
                setPurpose(val as Purpose);
                // Reset conditional fields when purpose changes
                setInquiryText("");
                setInsightFormat("");
                setInsightComment("");
                setSessionPlatform("");
                setPhoneNumber("");
                setSessionComment("");
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a purpose..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inquiry">Professional Inquiry</SelectItem>
                <SelectItem value="insights">Personalized Insights</SelectItem>
                <SelectItem value="session">Private Session</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ── Conditional: Inquiry ── */}
          {purpose === "inquiry" && (
            <div className="space-y-1.5 animate-in fade-in-0 slide-in-from-top-2 duration-300">
              <Label htmlFor="inquiry-text">
                What would you like to know or discover?{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="inquiry-text"
                placeholder="Describe your inquiry in detail..."
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                className="min-h-[100px]"
                required
              />
            </div>
          )}

          {/* ── Conditional: Personalized Insights ── */}
          {purpose === "insights" && (
            <div className="space-y-4 animate-in fade-in-0 slide-in-from-top-2 duration-300">
              <div className="space-y-2">
                <Label>
                  Choose your format <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={insightFormat}
                  onValueChange={(val) => setInsightFormat(val as InsightFormat)}
                  className="flex gap-4"
                >
                  <Label
                    htmlFor="fmt-pdf"
                    className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                      insightFormat === "pdf"
                        ? "border-amber-400 bg-amber-50 shadow-sm"
                        : "border-border hover:border-amber-300"
                    }`}
                  >
                    <RadioGroupItem value="pdf" id="fmt-pdf" />
                    <div>
                      <p className="text-sm font-medium">PDF Report</p>
                      <p className="text-xs text-muted-foreground">
                        Written document delivered to your email
                      </p>
                    </div>
                  </Label>

                  <Label
                    htmlFor="fmt-audio"
                    className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                      insightFormat === "audio"
                        ? "border-amber-400 bg-amber-50 shadow-sm"
                        : "border-border hover:border-amber-300"
                    }`}
                  >
                    <RadioGroupItem value="audio" id="fmt-audio" />
                    <div>
                      <p className="text-sm font-medium">Audio Report</p>
                      <p className="text-xs text-muted-foreground">
                        Voice recording sent via email
                      </p>
                    </div>
                  </Label>
                </RadioGroup>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="insight-comment">
                  Specifications or comments{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="insight-comment"
                  placeholder="Any preferences, focus areas, or special requests..."
                  value={insightComment}
                  onChange={(e) => setInsightComment(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          )}

          {/* ── Conditional: Private Session ── */}
          {purpose === "session" && (
            <div className="space-y-4 animate-in fade-in-0 slide-in-from-top-2 duration-300">
              <div className="space-y-2">
                <Label>
                  Choose your platform <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {/* WhatsApp */}
                  <button
                    type="button"
                    onClick={() => setSessionPlatform("whatsapp")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-3 cursor-pointer transition-all ${
                      sessionPlatform === "whatsapp"
                        ? "border-green-400 bg-green-50 shadow-sm"
                        : "border-border hover:border-green-300"
                    }`}
                  >
                    <WhatsAppLogo className="h-8 w-8" />
                    <span className="text-xs font-medium">WhatsApp</span>
                    {sessionPlatform === "whatsapp" && (
                      <Badge className="bg-green-600 text-white text-[10px] px-1.5 py-0">
                        Selected
                      </Badge>
                    )}
                  </button>

                  {/* Zoom */}
                  <button
                    type="button"
                    onClick={() => setSessionPlatform("zoom")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-3 cursor-pointer transition-all ${
                      sessionPlatform === "zoom"
                        ? "border-blue-400 bg-blue-50 shadow-sm"
                        : "border-border hover:border-blue-300"
                    }`}
                  >
                    <ZoomLogo className="h-8 w-8" />
                    <span className="text-xs font-medium">Zoom</span>
                    {sessionPlatform === "zoom" && (
                      <Badge className="bg-blue-600 text-white text-[10px] px-1.5 py-0">
                        Selected
                      </Badge>
                    )}
                  </button>

                  {/* Google Meet */}
                  <button
                    type="button"
                    onClick={() => setSessionPlatform("meet")}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-3 cursor-pointer transition-all ${
                      sessionPlatform === "meet"
                        ? "border-teal-400 bg-teal-50 shadow-sm"
                        : "border-border hover:border-teal-300"
                    }`}
                  >
                    <MeetLogo className="h-8 w-8" />
                    <span className="text-xs font-medium">Meet</span>
                    {sessionPlatform === "meet" && (
                      <Badge className="bg-teal-600 text-white text-[10px] px-1.5 py-0">
                        Selected
                      </Badge>
                    )}
                  </button>
                </div>
              </div>

              {/* Phone number for WhatsApp */}
              {sessionPlatform === "whatsapp" && (
                <div className="space-y-1.5 animate-in fade-in-0 slide-in-from-top-2 duration-200">
                  <Label htmlFor="session-phone">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="session-phone"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="session-comment">
                  Additional comments{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="session-comment"
                  placeholder="Any preferences or topics you'd like to discuss..."
                  value={sessionComment}
                  onChange={(e) => setSessionComment(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>
          )}

          {/* ── Submit ── */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={submitting}
              className="gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid() || submitting}
              className="flex-1 bg-amber-700 hover:bg-amber-800 text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                `Submit ${getPurposeLabel() ? `— ${getPurposeLabel()}` : ""}`
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
