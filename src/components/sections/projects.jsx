"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { TaptickitIllustration } from "@/components/illustrations/taptickit-illustration";

const projectIllustrations = {
  taptickit: TaptickitIllustration,
}

const corners = [
  { position: "-top-[3px] -left-[3px]", border: "border-t border-l" },
  { position: "-top-[3px] -right-[3px]", border: "border-t border-r" },
  { position: "-bottom-[3px] -left-[3px]", border: "border-b border-l" },
  { position: "-bottom-[3px] -right-[3px]", border: "border-b border-r" },
]

const flickerKeyframes = {
  opacity: [0, 1, 0.3, 1, 0.6, 1],
}

const previewSizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

const Projects = ({
  category,
  title,
  description,
  techstacks,
  status,
  link,
  preview,
  previewDark,
  illustration,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const Illustration = illustration ? projectIllustrations[illustration] : null

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block min-w-0 border border-black/[0.06] bg-black/[0.02] transition-colors hover:bg-black/[0.04] dark:border-white/[0.06] dark:bg-white/[0.03] dark:hover:bg-white/[0.05]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.span
              className="pointer-events-none absolute -inset-[3px] border border-dashed border-black/50 dark:border-white/50"
              initial={{ opacity: 0 }}
              animate={flickerKeyframes}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            {corners.map(({ position, border }) => (
              <motion.span
                key={position}
                className={`pointer-events-none absolute ${position} h-[6px] w-[6px] ${border} border-black dark:border-white`}
                initial={{ opacity: 0 }}
                animate={flickerKeyframes}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {(preview || Illustration) && (
        <div>
          <div
            className={`border-b border-black/[0.06] dark:border-white/[0.06] ${Illustration ? "overflow-hidden bg-zinc-100 dark:bg-zinc-950" : "relative aspect-[8/5] w-full overflow-hidden bg-white dark:bg-black"}`}
          >
            {Illustration ? (
              <div className={`transition-[filter] duration-500 ${isHovered ? "grayscale-0" : "grayscale"}`}>
                <Illustration isCardHovered={isHovered} />
              </div>
            ) : previewDark ? (
              <>
                <Image
                  src={preview}
                  alt={`${title} preview`}
                  fill
                  sizes={previewSizes}
                  className={`object-cover transition-[filter] duration-500 dark:hidden ${isHovered ? "grayscale-0" : "grayscale"}`}
                />
                <Image
                  src={previewDark}
                  alt={`${title} preview`}
                  fill
                  sizes={previewSizes}
                  className={`hidden object-cover transition-[filter] duration-500 dark:block ${isHovered ? "grayscale-0" : "grayscale"}`}
                />
              </>
            ) : (
              <Image
                src={preview}
                alt={`${title} preview`}
                fill
                sizes={previewSizes}
                className={`object-cover transition-[filter] duration-500 ${isHovered ? "grayscale-0" : "grayscale"}`}
              />
            )}
          </div>
        </div>
      )}

      <div className="p-3 md:p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[10px] font-medium text-muted-foreground md:text-[11px]">{category}</p>
          <Badge variant={status} className="ml-2">
            {status === "active" ? "Active" : "Discontinued"}
          </Badge>
        </div>

        <h1 className="mb-1.5 text-sm font-semibold md:text-base">{title}</h1>
        <p className="mb-3 font-space-mono text-[11px] leading-relaxed text-muted-foreground md:text-xs">{description}</p>

        <div className="flex flex-wrap gap-1">
          {techstacks.map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] text-muted-foreground dark:bg-white/[0.06] md:px-2.5 md:text-[11px]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default Projects;
