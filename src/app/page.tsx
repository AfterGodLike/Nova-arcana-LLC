"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  Repeat,
  ArrowRight,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  MonitorSmartphone,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookingDialog } from "@/components/booking-dialog";
import Image from "next/image";

/* ──────────────────── animation helpers ──────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ──────────────────── data ──────────────────── */
const services = [
  {
    icon: Sparkles,
    title: "Personalized Insight Sessions",
    description:
      "One-on-one virtual sessions tailored to your personal questions and areas of interest. Delivered via secure video call with a trained consultant.",
  },
  {
    icon: FileText,
    title: "Digital Reports",
    description:
      "Detailed written reports based on your submitted information, delivered to your email within 48 hours. Includes personalized analysis and actionable reflections.",
  },
  {
    icon: Repeat,
    title: "Subscription-Based Content",
    description:
      "Monthly curated content including guided reflections, seasonal insight packs, and exclusive educational materials — all accessible through our online platform.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose Your Service",
    description:
      "Browse our offerings and select the session, report, or subscription that fits your needs.",
  },
  {
    number: "02",
    title: "Submit Your Details",
    description:
      "Fill out a short intake form with your preferences and focus areas. This helps us personalize your experience.",
  },
  {
    number: "03",
    title: "Receive Your Insight",
    description:
      "Get matched with a consultant for a live session, or receive your digital report directly to your inbox.",
  },
];

/* ════════════════════════════════════════════════════════════ */
export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <Image
              src="/nova-arcana-logo.png"
              alt="Nova Arcana logo"
              width={36}
              height={36}
              className="rounded-md"
            />
            <span className="font-semibold tracking-tight text-lg group-hover:text-amber-700 transition-colors">
              Nova Arcana
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>

          <Button
            size="sm"
            className="hidden md:inline-flex bg-amber-700 hover:bg-amber-800 text-white"
            onClick={() => setBookingOpen(true)}
          >
            Book Session <ChevronRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="hero"
        className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden"
      >
        {/* bg image overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.h1
              variants={fadeUp}
              custom={0}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
            >
              Clarity Through
              <br />
              <span className="text-amber-700">Personal Insight</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={1}
              className="max-w-xl text-muted-foreground text-lg leading-relaxed"
            >
              Nova Arcana LLC provides spiritual guidance content, personal
              insight experiences, and entertainment-based consulting — available
              online to clients worldwide.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex flex-col sm:flex-row gap-3 mt-2"
            >
              <Button
                size="lg"
                className="bg-amber-700 hover:bg-amber-800 text-white"
                onClick={() => setBookingOpen(true)}
              >
                Book a Session <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#services">Explore Services</a>
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex items-center gap-6 mt-4 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <MonitorSmartphone className="h-4 w-4 text-amber-700" /> 100%
                Online
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-700" /> Flexible Scheduling
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-700" /> Secure
                Platform
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Badge
                variant="outline"
                className="text-amber-700 border-amber-300/60 mb-4"
              >
                About Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                A Modern Digital Services Company
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nova Arcana LLC is a US-registered digital services company
                specializing in spiritual guidance content, personal insight
                experiences, and entertainment-based consulting. We operate
                entirely online, serving clients across the globe.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our mission is to make reflective, insight-oriented content
                accessible through a professional digital platform. Every
                session, report, and piece of content we deliver is designed for
                personal entertainment and self-reflection purposes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are committed to transparency, professionalism, and the
                highest standards of digital service delivery.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Founded", value: "United States" },
                { label: "Delivery", value: "100% Online" },
                { label: "Clients", value: "Global Reach" },
                { label: "Focus", value: "Insight & Entertainment" },
              ].map((stat) => (
                <Card
                  key={stat.label}
                  className="bg-background border-border/60 shadow-sm"
                >
                  <CardContent className="p-5">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                      {stat.label}
                    </p>
                    <p className="text-lg font-semibold">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Badge
                variant="outline"
                className="text-amber-700 border-amber-300/60 mb-4"
              >
                Services
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            >
              What We Offer
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-lg mx-auto text-muted-foreground"
            >
              Three core digital services designed for personal insight,
              reflection, and entertainment.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {services.map((svc, i) => (
              <motion.div key={svc.title} variants={fadeUp} custom={i}>
                <Card className="h-full border-border/60 shadow-sm hover:shadow-md transition-shadow group">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="w-11 h-11 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                      <svc.icon className="h-5 w-5 text-amber-700" />
                    </div>
                    <h3 className="text-lg font-semibold">{svc.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {svc.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-auto w-full"
                      onClick={() => setBookingOpen(true)}
                    >
                      Book This Service
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Badge
                variant="outline"
                className="text-amber-700 border-amber-300/60 mb-4"
              >
                Process
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-lg mx-auto text-muted-foreground"
            >
              Getting started is simple. Three easy steps to your personalized
              insight experience.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                custom={i}
                className="relative text-center"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-lg mb-5">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                {/* connector line on desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── DISCLAIMER ─── */}
      <section id="disclaimer" className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0} className="text-center mb-8">
              <Badge
                variant="outline"
                className="text-amber-700 border-amber-300/60 mb-4"
              >
                Important Notice
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Disclaimer
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} custom={1}>
              <Card className="border-amber-200/60 bg-amber-50/40 shadow-sm">
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-amber-700 mt-0.5 shrink-0" />
                    <p className="text-sm leading-relaxed">
                      <strong>Entertainment Purposes Only.</strong> All
                      services, sessions, reports, and content provided by Nova
                      Arcana LLC are intended solely for personal entertainment
                      and self-reflection. They should not be used as a
                      substitute for professional advice of any kind.
                    </p>
                  </div>
                  <Separator className="bg-amber-200/50" />
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-amber-700 mt-0.5 shrink-0" />
                    <p className="text-sm leading-relaxed">
                      <strong>Not Professional Advice.</strong> Our services do
                      not constitute medical, legal, financial, or psychological
                      advice. Always consult a qualified professional for
                      matters related to your health, legal rights, or finances.
                    </p>
                  </div>
                  <Separator className="bg-amber-200/50" />
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-amber-700 mt-0.5 shrink-0" />
                    <p className="text-sm leading-relaxed">
                      <strong>Age Requirement.</strong> You must be 18 years of
                      age or older to use our services. By using our platform,
                      you confirm that you meet this requirement.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Badge
                variant="outline"
                className="text-amber-700 border-amber-300/60 mb-4"
              >
                Contact
              </Badge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
            >
              Get in Touch
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-lg mx-auto text-muted-foreground mb-10"
            >
              Have questions about our services? We&apos;d love to hear from
              you. Reach out through the channels below and our team will
              respond within one business day.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Card className="w-full sm:w-auto min-w-[260px] border-border/60 shadow-sm">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-sm font-medium">contact@novarcana.net</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full sm:w-auto min-w-[260px] border-border/60 shadow-sm">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-amber-700" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Business Address
                    </p>
                    <p className="text-sm font-medium">
                      8206 Louisiana Blvd Ne, Ste A #9080
                      <br />
                      Albuquerque, NM 87113, US
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="mt-auto border-t border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/nova-arcana-logo.png"
              alt="Nova Arcana logo"
              width={28}
              height={28}
              className="rounded"
            />
            <span className="text-sm font-medium">Nova Arcana LLC</span>
          </div>
          <p className="text-xs text-muted-foreground text-center sm:text-right">
            © {new Date().getFullYear()} Nova Arcana LLC. All rights reserved.
            For entertainment purposes only.
          </p>
        </div>
      </footer>

      {/* ─── BOOKING DIALOG ─── */}
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
}
