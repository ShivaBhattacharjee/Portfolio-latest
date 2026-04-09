"use client";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { IoIosMail } from "react-icons/io";
import { Button } from "@/components/ui/button";
import ContactDialog from "@/components/layout/contact-dialog";
import { toast } from "sonner";
import Link from "next/link";
import { GeistPixelSquare } from "geist/font/pixel";
import GitHubContributionGraph from "./contribution-graph";
import ClipboardIcon from "@/components/icons/clipboard";
import { CornerBrackets } from "@/components/ui/corner-brackets";

const socialLinks = [
  {
    label: "Twitter",
    href: "https://x.com/sh17va",
    icon: <RiTwitterXLine size="13px" />,
    external: true,
  },
  {
    label: "Github",
    href: "https://github.com/shivabhattacharjee",
    icon: <FaGithub size="13px" />,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shiva-bhattacharjee/",
    icon: <FaLinkedin size="13px" />,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:hello@theshiva.xyz",
    icon: <IoIosMail size="14px" />,
    external: true,
  },
]

function SocialButton({ label, href, icon, external }) {
  return (
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
  )
}

const Hero = ({ contributionData = [] }) => {
  return (
    <div className="mx-auto flex flex-col gap-10 md:max-w-4xl">
      <div className="flex flex-col gap-6">

        <div className={GeistPixelSquare.className}>
          <p className="mb-3 text-xs font-doto text-muted-foreground md:text-sm">
           Hello I&apos;m 👋
          </p>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-3xl font-bold uppercase tracking-tight md:text-5xl">
              Shiva
            </h1>
            <a href="https://x.com/sh17va" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground md:text-base">
              / @sh17va
            </a>
          </div>

          <p className="mt-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground md:text-sm">
            Applied AI Engineer
          </p>
        </div>

        <div className={`flex flex-row items-center gap-3 ${GeistPixelSquare.className}`}>
          <ContactDialog />
          <span className="text-[10px] opacity-75 text-muted-foreground md:text-xs font-doto">OR</span>
          <CornerBrackets>
            <Button
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText("npx shivadev");
                toast.success("Copied to clipboard", {
                  description: "npx shivadev",
                });
              }}
            >
              <ClipboardIcon className="mr-1.5 h-3 w-3" /> npx shivadev
            </Button>
          </CornerBrackets>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h5 className="mb-4 font-cera text-2xl font-medium md:text-3xl font-doto">
            About Me
          </h5>
          <p className="text-xs md:text-base">
            Hi! I&apos;m Shiva Bhattacharjee  an Applied AI Engineer. I
            love development, making stuff, and experimenting with whatever
            catches my interest. Most of my work revolves around LLMs, agentic
            systems, and building developer tools on top of them. I&apos;ve
            spent time working on complex multi-model pipelines  orchestrating
            parallel image generation calls, chaining inference steps with
            memory-augmented context, and wiring up distributed task queues to
            keep everything running at scale. I&apos;ve won 5 hackathons and
            was a Smart India Hackathon finalist in my first semester. I enjoy
            the messy, behind-the-scenes infrastructure work just as much as
            shipping the final product.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs text-muted-foreground md:text-sm">
            My <span className="font-semibold text-foreground">social links</span> if you wish to connect with me
          </p>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map(({ label, href, icon, external }) => (
              <SocialButton key={label} label={label} href={href} icon={icon} external={external} />
            ))}
          </div>
        </div>

        
          <GitHubContributionGraph data={contributionData} />
       
      </div>
    </div>
  );
};

export default Hero;
