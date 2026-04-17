"use client";
import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

const Timeline = ({ role, company, year, type, location, logo, logoPadding, invertLogo, responsibility, techstacks, index = 0 }) => {
  return (
    <motion.ol
      className="relative border-s border-black/[0.1] dark:border-white/[0.1]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <li className="ms-4 p-3 md:ms-6 md:p-5">
        <span className="absolute mt-1.5 -start-[5px] rounded-full w-2.5 h-2.5 bg-black/20 dark:bg-white/30" />

        <div className="mb-3 flex items-start justify-between gap-2 md:mb-4 md:gap-4">
          <div className="flex min-w-0 items-center gap-2 md:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/[0.08] bg-black/[0.03] dark:border-white/[0.08] dark:bg-white/[0.05] md:h-10 md:w-10 md:rounded-xl">
              {logo ? (
                <Image
                  src={logo}
                  alt={`${company} logo`}
                  width={40}
                  height={40}
                  className={`h-full w-full object-contain ${logoPadding ? "p-1.5" : ""} ${invertLogo ? "dark:invert" : ""}`}
                />
              ) : (
                <span className="text-[10px] font-bold text-muted-foreground">
                  {company?.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="truncate text-xs font-semibold md:text-sm">{company}</span>
                {type && (
                  <span className="shrink-0 rounded-full  px-1.5 py-px text-[8px] bg-black/[0.08] font-medium text-muted-foreground dark:bg-white/[0.08] md:text-[9px]">
                    {type}
                  </span>
                )}
              </div>
              <p className="truncate text-[10px] text-muted-foreground md:text-xs  mt-1">{role}</p>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-[10px] font-medium text-muted-foreground md:text-xs">{year}</p>
            {location && (
              <p className="text-[10px] text-muted-foreground/60 md:text-xs">{location}</p>
            )}
          </div>
        </div>

        <div className="mb-3 space-y-1 md:mb-4">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground md:mb-2 md:text-sm">Key Responsibilities</p>
          <ul className="list-disc space-y-1.5 pl-4 marker:text-muted-foreground/40 md:space-y-2">
            {responsibility.map((bullet, i) => (
              <li key={i} className="font-space-mono text-xs leading-relaxed break-words text-muted-foreground md:text-sm">
                {Array.isArray(bullet)
                  ? bullet.map((seg, j) =>
                      seg.bold ? (
                        <strong key={j} className="font-semibold text-foreground">{seg.text}</strong>
                      ) : (
                        <span key={j}>{seg.text}</span>
                      )
                    )
                  : bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-1.5 md:space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground md:text-sm">Technology Used</p>
          <div className="flex flex-wrap gap-1">
            {techstacks.map((tech, i) => (
              <span
                key={i}
                className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] text-muted-foreground dark:bg-white/[0.06] md:px-2.5 md:text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </li>
    </motion.ol>
  );
};

export default Timeline;
