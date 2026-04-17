"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import GithubIcon from "../icons/github";

const accentColor = {
  "1st Place":     "text-yellow-500 dark:text-yellow-400",
  "2nd Place":     "text-violet-500 dark:text-violet-300",
  "2nd Position":  "text-violet-500 dark:text-violet-300",
  "3rd Place":     "text-orange-500 dark:text-orange-400",
  "Bounty Winner": "text-emerald-500 dark:text-emerald-400",
  "Qualifier":     "text-sky-500 dark:text-sky-400",
};

const accentLine = {
  "1st Place":     "bg-yellow-500 dark:bg-yellow-400",
  "2nd Place":     "bg-violet-500 dark:bg-violet-300",
  "2nd Position":  "bg-violet-500 dark:bg-violet-300",
  "3rd Place":     "bg-orange-500 dark:bg-orange-400",
  "Bounty Winner": "bg-emerald-500 dark:bg-emerald-400",
  "Qualifier":     "bg-sky-500 dark:bg-sky-400",
};

const HackathonEntry = ({ title, event, year, placement, college, body, techstacks, link, index }) => {
  const [hovered, setHovered] = useState(false);
  const color = accentColor[placement] ?? "text-foreground";
  const line = accentLine[placement] ?? "bg-foreground/20";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Placement — pixel font, b&w by default, colour on hover */}
      <p className={` font-doto text-xl cursor-cell font-bold uppercase leading-none md:text-3xl transition-colors duration-300 ${hovered ? color : "text-foreground"}`}>
        {placement}
      </p>

      {/* Accent line — neutral by default, colour on hover */}
      <div className={`mt-2.5 h-px w-12 md:w-16 transition-colors duration-300 ${hovered ? line : "bg-foreground/20"}`} />

      {/* Event metadata */}
      <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground md:text-xs">
        {event} · {year}{college ? ` · ${college}` : ""}
      </p>

      {/* Title */}
      <h2 className="mt-1.5 text-sm font-semibold md:text-base">{title}</h2>

      {/* Description */}
      <p className="mt-2 font-space-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
        {Array.isArray(body)
          ? body.map((seg, i) =>
              seg.bold ? (
                <strong key={i} className="font-semibold text-foreground">{seg.text}</strong>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )
          : body}
      </p>

      {/* Tech — inline, editorial style */}
      <p className="mt-2.5 text-[10px] text-muted-foreground/60 md:text-xs">
        {techstacks.join(" · ")}
      </p>

      {/* Link */}
      {link && (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex gap-2 items-center inline-block text-xs text-foreground/60 underline underline-offset-[3px] decoration-foreground/20 transition-colors hover:text-foreground hover:decoration-foreground/50 md:text-sm"
        >
        <GithubIcon className={"w-4 h-4"} /> GitHub
        </Link>
      )}
    </motion.article>
  );
};

const HackathonList = ({ hackathons }) => (
  <div className="space-y-12 px-2 md:space-y-16 md:px-0">
    {hackathons.map((h, i) => (
      <HackathonEntry key={i} index={i} {...h} />
    ))}
  </div>
);

export default HackathonList;
