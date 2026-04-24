"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import XTwitterIcon from "@/components/icons/x-twitter";
import GithubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";
import DiscordIcon from "@/components/icons/discord";
import { IoIosMail } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { GeistPixelSquare } from "geist/font/pixel";
import GitHubContributionGraph from "./contribution-graph";
import ClipboardIcon from "@/components/icons/clipboard";
import { CornerBrackets } from "@/components/ui/corner-brackets";
import { notableAchievements } from "@/constants";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LocationIcon from "@/components/icons/location";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
});

const socialLinks = [
  {
    label: "Twitter",
    href: "https://x.com/sh17va",
    icon: <XTwitterIcon className="h-3.5 w-3.5" />,
    external: true,
    platform: "twitter",
    username: "sh17va",
  },
  {
    label: "Github",
    href: "https://github.com/shivabhattacharjee",
    icon: <GithubIcon className="h-3.5 w-3.5" />,
    external: true,
    platform: "github",
    username: "shivabhattacharjee",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shiva-bhattacharjee/",
    icon: <LinkedinIcon className="h-3.5 w-3.5" />,
    external: true,
    platform: "linkedin",
    username: "shiva-bhattacharjee",
  },
  {
    label: "Discord",
    href: "https://discordapp.com/users/503152077824851968",
    icon: <DiscordIcon className="h-3.5 w-3.5" />,
    external: true,
    platform: "discord",
    username: "503152077824851968",
  },
  {
    label: "Email",
    href: "mailto:hello@theshiva.xyz",
    icon: <IoIosMail size="14px" />,
    external: true,
  },
];

function SocialPreviewCard({ loading, data, platform, username }) {


  if (loading) {
    return (
      <div className="flex w-[320px] flex-col gap-4 font-space-mono animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-full bg-muted"></div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 rounded bg-muted"></div>
            <div className="h-3 w-20 rounded bg-muted"></div>
          </div>
        </div>
        <div className="h-10 w-full rounded bg-muted"></div>
        <div className="h-4 w-24 rounded bg-muted"></div>
        <div className="mt-2 flex gap-4">
          <div className="h-4 w-16 rounded bg-muted"></div>
          <div className="h-4 w-16 rounded bg-muted"></div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex w-[320px] flex-col gap-2 font-space-mono text-left">
      {data.banner && (
        <div className="-mx-4 -mt-4 mb-2 h-20 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.banner} alt="Banner" className="h-full w-full object-cover" />
        </div>
      )}
      <div className={`flex gap-3 relative z-10 ${data.banner ? "flex-col items-start -mt-12" : "items-center"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data.avatar || "https://github.com/shivabhattacharjee.png"}
          alt={data.name}
          className={`rounded-full object-cover bg-background ${data.banner ? "h-[68px] w-[68px] border-[3px] border-card" : "h-14 w-14 border border-border"}`}
        />
        <div className={`flex flex-col ${data.banner ? "-mt-1" : ""}`}>
          <span className="font-doto text-base font-bold text-foreground">
            {data.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {data.username}
          </span>
        </div>
      </div>
      {data.bio && (
        <p className="text-sm text-foreground line-clamp-3">
          {data.bio}
        </p>
      )}
      {data.location && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <LocationIcon className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{data.location}</span>
        </div>
      )}
      {data.stats && data.stats.length > 0 && (
        <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
          {data.stats.map((stat, i) => (
            <span key={i}>
              <strong className="font-doto font-semibold text-foreground">
                {stat.value}
              </strong>{" "}
              {stat.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SocialButton({ label, href, icon, external, platform, username, data, loading }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    x.set(e.clientX - 160);
    y.set(e.clientY + 12);
  };

  const handleMouseEnter = (e) => {
    x.set(e.clientX - 160);
    y.set(e.clientY + 12);
    springX.jump(e.clientX - 160);
    springY.jump(e.clientY + 12);
    setIsHovered(true);
  };

  const content = (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <CornerBrackets>
        <Button size="sm" variant="noShadow">
          {icon}
          <span className="ml-1.5">{label}</span>
        </Button>
      </CornerBrackets>
    </Link>
  );

  if (platform && username) {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative"
      >
        {content}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex w-[320px] flex-col gap-3 rounded-xl overflow-hidden bg-background/30 backdrop-blur-2xl backdrop-saturate-150 p-4 shadow-2xl border border-white/20 dark:border-white/10"
              style={{
                position: "fixed",
                left: springX,
                top: springY,
                zIndex: 9999,
                pointerEvents: "none",
              }}
            >
              <SocialPreviewCard platform={platform} username={username} data={data} loading={loading} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return content;
}

const WaveEmoji = () => {
  const [phase, setPhase] = useState("idle");
  const [key, setKey] = useState(0);

  useEffect(() => {
    setPhase("waving");
    const timer = setTimeout(() => setPhase("grayscale"), 700);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setKey((k) => k + 1);
    setPhase("hover-wave");
  };

  const handleMouseLeave = () => {
    setPhase("grayscale");
  };

  const isWaving = phase === "waving" || phase === "hover-wave";
  const isGrayscale = phase === "grayscale";

  return (
    <span
      key={key}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block origin-[70%_70%] cursor-default transition-all duration-500 ${isWaving ? "animate-wave-slow" : ""} ${isGrayscale ? "grayscale" : ""}`}
    >
      👋🏻
    </span>
  );
};

const Hero = ({ contributionData = [], lifetimeTotal = 0 }) => {
  const [socialData, setSocialData] = useState(null);
  const [socialsLoading, setSocialsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/socials")
      .then((res) => res.json())
      .then((data) => {
        if (mounted && !data.error) {
          setSocialData(data);
        }
        if (mounted) setSocialsLoading(false);
      })
      .catch(() => {
        if (mounted) setSocialsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="mx-auto flex flex-col gap-10 md:max-w-4xl">
      <motion.div className="flex flex-col gap-6" {...fadeUp(0)}>
        <div className={GeistPixelSquare.className}>
          <p className="mb-3 font-doto text-xs text-muted-foreground md:text-sm">
            Hola I&apos;m <WaveEmoji />
          </p>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-2xl font-bold uppercase tracking-tight md:text-4xl">
              Shiva Bhattacharjee
            </h1>
          </div>

          <p className="mt-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground md:text-sm">
            I work on AI, LLMs, and building developer tools on top of them
          </p>
        </div>

        <motion.div
          className={`flex flex-row items-end gap-4 p-1 ${GeistPixelSquare.className}`}
          {...fadeUp(0.08)}
        >
          <CornerBrackets>
            <Button
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText("npx shivadev");
                toast.success("Copied to clipboard", {
                  description: "You can now paste it in your terminal to see the cli version of my portfolio",
                  icon: <ClipboardIcon className="h-4 w-4" />,
                  classNames: { description: "font-space-mono" },
                });
              }}
            >
              <ClipboardIcon className="mr-1.5 h-3 w-3" /> npx shivadev
            </Button>
          </CornerBrackets>
          <div className="relative -ml-1 flex items-center">
            <svg
              className="pointer-events-none size-5 shrink-0 rotate-[190deg] text-muted-foreground/40"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 323.057 323.057"
              xmlSpace="preserve"
              fill="currentColor"
            >
              <path d="M281.442 256.312c-47.124 59.364-139.536 44.676-160.956-29.376-1.224-3.672-1.836-7.956-2.448-11.628 49.572-11.016 97.92-47.124 102.204-90.576 3.672-39.168-36.108-50.796-62.424-28.764-31.212 26.316-53.244 64.872-55.08 105.875-31.824 4.284-63.036-4.284-80.172-35.496-28.764-52.631 9.792-123.624 61.2-144.432 5.508-1.836 3.06-10.404-2.448-8.568C10.326 33.544-26.394 132.688 21.954 191.439c18.972 22.645 49.572 29.988 81.396 26.316 4.284 41.616 36.72 74.664 75.275 87.516 44.676 14.688 85.68-6.731 111.996-41.616 4.285-5.508-4.896-12.239-9.179-7.343M144.354 132.688c9.792-13.464 22.644-28.764 39.168-34.272 15.911-5.508 21.42 16.524 22.031 26.316.612 12.24-7.956 23.256-15.912 31.824-16.523 18.971-44.063 35.496-72.215 42.839 1.836-23.868 13.464-47.123 26.928-66.707" />
              <path d="M315.713 233.668c-17.136 0-34.884 1.224-51.408 5.508-6.731 1.836-3.672 11.016 3.061 9.792 13.464-2.448 27.54-1.836 41.004-1.224-.612 7.955-1.224 16.523-2.448 24.479-1.224 6.12-5.508 15.3-1.836 21.42 1.836 3.061 4.896 3.061 7.956 1.836 7.344-3.06 7.344-15.912 8.568-22.644 1.836-11.017 2.447-21.42 2.447-32.437 0-3.67-3.672-6.73-7.344-6.73" />
            </svg>
            <span className="ml-2 -rotate-[8deg] whitespace-nowrap text-[10px] text-muted-foreground/50 md:text-xs">
              try this in <br /> your terminal
            </span>
          </div>
        </motion.div>
      </motion.div>

      <div className="space-y-8">
        <motion.div {...fadeUp(0.15)}>
          <h5 className="mb-4 font-doto text-2xl font-medium md:text-3xl">
            About Me
          </h5>
          <p className="text-xs font-space-mono md:text-base md:leading-relaxed text-muted-foreground">
            I&apos;m Shiva, an <strong className="font-semibold text-foreground">Applied AI Engineer</strong>. Got into coding in 9th grade, spent a few years doing freelance work with PHP and jQuery before landing on React. The project that taught me the most was <strong className="font-semibold text-foreground"><a href="https://github.com/shivabhattacharjee/animetrix-next" target="_blank" className="underline">Animetrix</a></strong>, an anime streaming site I built in college that hit <strong className="font-semibold text-foreground">15k users and 200 GitHub stars </strong>. It was technically piracy (I was naive), broke constantly under traffic, which taught me about scalability. I rewrote the infra from scratch and got it to handle <strong className="font-semibold text-foreground">20k users</strong>, picking up <strong className="font-semibold text-foreground">Redis, Docker, horizontal scaling, and YAML </strong> along the way. Eventually got DMCA&apos;d. Worth it.
          </p>
          <p className="mt-4 text-xs font-space-mono md:text-base md:leading-relaxed text-muted-foreground">
            Won <strong className="font-semibold text-foreground">5 hackathons</strong>, including qualifying for <strong className="font-semibold text-foreground">Smart India Hackathon 2023</strong> in my first semester, first from my college with roughly a ~1% selection rate. Since then I&apos;ve shipped production AI systems at a few early-stage startups. One of them I joined as a founding engineer, where I got deep into <strong className="font-semibold text-foreground">fine-tuning LLMs on low-resource Indian languages</strong> using <strong className="font-semibold text-foreground">Unsloth</strong>, containerizing models with <strong className="font-semibold text-foreground">Docker</strong>, self-hosting on servers, and exposing them as public APIs. Right now I&apos;m working at <strong className="font-semibold text-foreground"><a href="https://www.usebez.ai" target="_blank" className="underline">Bez</a></strong>, building an <strong className="font-semibold text-foreground">AI copilot for jewellery designers</strong> — where I get to work with <strong className="font-semibold text-foreground">AI agent workflows</strong>, <strong className="font-semibold text-foreground">vector search</strong>, <strong className="font-semibold text-foreground">RAG-based memory</strong>, and <strong className="font-semibold text-foreground">multimodal image pipelines</strong>.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.25)}>
          <p className="mb-3 text-xs text-muted-foreground md:text-sm">
            My{" "}
            <span className="font-semibold text-foreground">social links</span>{" "}
            if you wish to connect with me
          </p>
          <div className="flex flex-wrap gap-2 p-1">
            {socialLinks.map(({ label, href, icon, external, platform, username }) => (
              <SocialButton
                key={label}
                label={label}
                href={href}
                icon={icon}
                external={external}
                platform={platform}
                username={username}
                data={socialData?.[platform]}
                loading={socialsLoading}
              />
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.35)}>
          <GitHubContributionGraph
            data={contributionData}
            lifetimeTotal={lifetimeTotal}
          />
        </motion.div>

        <motion.div {...fadeUp(0.45)}>
          <h5 className="mb-4 font-doto text-2xl font-medium md:text-3xl">
            Notable achievements
          </h5>
          <ul className="space-y-6">
            {notableAchievements.map(({ title, body, link, linkLabel }) => (
              <li
                key={title}
                className="border-l-2 border-muted-foreground/25 pl-4"
              >
                <span className="text-sm font-semibold text-foreground md:text-base">
                  {title}.{" "}
                </span>
                <span className="font-space-mono text-sm leading-relaxed text-muted-foreground md:text-base">
                  {Array.isArray(body)
                    ? body.map((seg, i) =>
                        seg.href ? (
                          <Link
                            key={i}
                            href={seg.href}
                            className="font-semibold text-foreground underline underline-offset-2 transition-colors hover:text-foreground/70"
                          >
                            {seg.text}
                          </Link>
                        ) : seg.bold ? (
                          <strong key={i} className="font-semibold text-foreground">
                            {seg.text}
                          </strong>
                        ) : (
                          <span key={i}>{seg.text}</span>
                        )
                      )
                    : body}
                </span>
                {link && (
                  <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-sm text-foreground/70 underline underline-offset-2 transition-colors hover:text-foreground md:text-base"
                  >
                    {linkLabel}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

    </div>
  );
};

export default Hero;
