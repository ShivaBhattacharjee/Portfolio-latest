"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SeikoWatchIllustration } from "@/components/illustrations/watch-illustration";

export default function SeikoWatchModal({ children }) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(null);
  const [tz, setTz] = useState("");

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const tick = () => setTime(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onekoCatElement = document.querySelector('[data-oneko-cat="true"]');
    if (!(onekoCatElement instanceof HTMLElement)) return;

    onekoCatElement.style.opacity = open ? "0" : "1";

    return () => {
      onekoCatElement.style.opacity = "1";
    };
  }, [open]);

  const timeLabel = time
    ? time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "";
  const dateLabel = time
    ? time.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!left-0 !top-0 flex h-screen !max-w-none !translate-x-0 !translate-y-0 flex-col items-center justify-center gap-6 rounded-none border-none bg-background p-6 shadow-none data-[state=closed]:duration-300 data-[state=open]:duration-500 sm:w-screen">
        <DialogTitle className="sr-only">Seiko watch view</DialogTitle>
        <DialogDescription className="sr-only">
          Shows the current local date, time, and timezone.
        </DialogDescription>
        <SeikoWatchIllustration />
        <div className="flex flex-col items-center gap-1 font-doto text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span>{dateLabel}</span>
          <span>{timeLabel}</span>
          <span className="text-[10px] normal-case tracking-normal text-muted-foreground/60">
            {tz}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
