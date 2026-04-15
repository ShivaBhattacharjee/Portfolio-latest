"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import HouseIcon from "@/components/icons/house";

const AsciiCosmos = dynamic(() => import("@/components/AsciiCosmos"), {
  ssr: false,
});

export default function NotFound() {
  return (
    <div className="relative -mx-6 flex min-h-[80vh] items-center justify-center md:-mx-0">
      <div className="fixed inset-0 z-0">
        <AsciiCosmos />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <p className="font-[Doto] text-[8rem] font-black leading-none tracking-tighter md:text-[12rem]">
          404
        </p>

        <div className="flex max-w-md flex-col gap-3 px-4">
          <p className="font-[Doto] text-lg font-bold tracking-wide md:text-xl">
            Houston, we have a problem.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            You&apos;ve drifted into uncharted cosmos. This page either
            doesn&apos;t exist, got sucked into a black hole, or the aliens took
            it. We&apos;re not sure which.
          </p>
        </div>

        <Link
          href="/"
          className="mt-2 inline-flex items-center gap-2 rounded-md border border-foreground/20 bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/80"
        >
          <HouseIcon className="size-4" />
          Beam me home
        </Link>

        <p className="mt-4 max-w-xs text-xs text-muted-foreground/60">
          Fun fact: there are more stars in the universe than grains of sand on
          Earth, yet you managed to land on the one page that doesn&apos;t
          exist.
        </p>
      </div>
    </div>
  );
}
