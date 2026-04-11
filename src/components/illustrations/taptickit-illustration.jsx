"use client"

import { motion, useReducedMotion } from "motion/react"

function IsoFace({
  className,
  style,
  children,
}) {
  return (
    <div className={`absolute ${className}`} style={style}>
      {children}
    </div>
  )
}

function IsoSlab({
  left,
  top,
  width: w,
  height: h,
  depth,
  z,
  topClassName,
  bottomClassName,
  rightClassName,
  children,
}) {
  return (
    <IsoFace
      className="[transform-style:preserve-3d]"
      style={{ left, top, width: w, height: h, transform: `translateZ(${z}px)` }}
    >
      <IsoFace
        className={`inset-0 ${topClassName}`}
        style={{ transform: `translateZ(${depth}px)` }}
      />
      <IsoFace
        className={bottomClassName}
        style={{
          left: 0,
          top: h,
          width: w,
          height: depth,
          transformOrigin: "top",
          transform: "rotateX(90deg)",
        }}
      />
      <IsoFace
        className={rightClassName}
        style={{
          left: w,
          top: 0,
          width: depth,
          height: h,
          transformOrigin: "left",
          transform: "rotateY(-90deg)",
        }}
      />
      {children}
    </IsoFace>
  )
}

export function TaptickitIllustration({ isCardHovered = false }) {
  const prefersReducedMotion = useReducedMotion()

  const layerSpring = prefersReducedMotion
    ? { duration: 0.12, ease: "easeOut" }
    : { type: "spring", stiffness: 400, damping: 28, mass: 0.72 }

  return (
    <div className="relative flex h-[200px] w-full min-w-0 max-w-full items-center justify-center overflow-hidden bg-zinc-100 dark:bg-black">
      <div className="origin-center translate-y-4 scale-[1.06] md:scale-[0.98]">
        <div
          className="relative [transform-style:preserve-3d] [transform:rotateX(60deg)_rotateZ(45deg)]"
          style={{ width: 200, height: 130 }}
        >
          <IsoSlab
            left={0}
            top={0}
            width={200}
            height={140}
            depth={4}
            z={0}
            topClassName="border-[0.5px] border-zinc-100 bg-zinc-50 transition-all duration-200 dark:border-zinc-700 dark:bg-zinc-950 group-hover:border-dotted group-hover:border-black/50 group-hover:bg-black/[0.04] group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.09),0_0_0_1px_rgba(0,0,0,0.12),0_0_14px_rgba(0,0,0,0.1),0_0_38px_rgba(0,0,0,0.05)] dark:group-hover:border-solid dark:group-hover:border-white/40 dark:group-hover:bg-white/[0.07] dark:group-hover:shadow-[0_0_14px_rgba(255,255,255,0.2),0_0_36px_rgba(255,255,255,0.07)]"
            bottomClassName="border-[0.5px] border-transparent bg-zinc-100 dark:bg-zinc-900 transition-all duration-200 group-hover:border-dotted group-hover:border-black/50 group-hover:bg-black/[0.04] group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.09),0_0_0_1px_rgba(0,0,0,0.12),0_0_14px_rgba(0,0,0,0.1),0_0_38px_rgba(0,0,0,0.05)] dark:group-hover:border-solid dark:group-hover:border-white/40 dark:group-hover:bg-white/[0.07] dark:group-hover:shadow-[0_0_14px_rgba(255,255,255,0.2),0_0_36px_rgba(255,255,255,0.07)]"
            rightClassName="border-[0.5px] border-transparent bg-zinc-200 dark:bg-zinc-800 transition-all duration-200 group-hover:border-dotted group-hover:border-black/50 group-hover:bg-black/[0.045] group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.09),0_0_0_1px_rgba(0,0,0,0.12),0_0_14px_rgba(0,0,0,0.1),0_0_38px_rgba(0,0,0,0.05)] dark:group-hover:border-solid dark:group-hover:border-white/40 dark:group-hover:bg-white/[0.08] dark:group-hover:shadow-[0_0_14px_rgba(255,255,255,0.2),0_0_36px_rgba(255,255,255,0.07)]"
          />

          <motion.div
            className="absolute [transform-style:preserve-3d]"
            style={{ left: 41, top: 29, width: 122, height: 82 }}
            initial={false}
            animate={{ translateZ: isCardHovered ? 10 : 4 }}
            transition={layerSpring}
          >
            <IsoSlab
              left={0}
              top={0}
              width={122}
              height={82}
              depth={4}
              z={0}
              topClassName="border-[0.5px] border-zinc-200/90 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_0_0_1px_rgba(0,0,0,0.05)] transition-all duration-200 dark:border-zinc-400/70 dark:bg-zinc-950 dark:shadow-none group-hover:border-dotted group-hover:border-black/55 group-hover:bg-black/[0.04] group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.14),0_0_12px_rgba(0,0,0,0.11),0_0_32px_rgba(0,0,0,0.05)] dark:group-hover:border-solid dark:group-hover:border-white/45 dark:group-hover:bg-white/[0.08] dark:group-hover:shadow-[0_0_12px_rgba(255,255,255,0.22),0_0_30px_rgba(255,255,255,0.08)]"
              bottomClassName="border-[0.5px] border-zinc-300/80 bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-900 transition-all duration-200 group-hover:border-dotted group-hover:border-black/55 group-hover:bg-black/[0.04] group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.14),0_0_12px_rgba(0,0,0,0.11),0_0_32px_rgba(0,0,0,0.05)] dark:group-hover:border-solid dark:group-hover:border-white/45 dark:group-hover:bg-white/[0.08] dark:group-hover:shadow-[0_0_12px_rgba(255,255,255,0.22),0_0_30px_rgba(255,255,255,0.08)]"
              rightClassName="border-[0.5px] border-zinc-300/80 bg-zinc-300 dark:border-zinc-600 dark:bg-zinc-800 transition-all duration-200 group-hover:border-dotted group-hover:border-black/55 group-hover:bg-black/[0.045] group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.14),0_0_12px_rgba(0,0,0,0.11),0_0_32px_rgba(0,0,0,0.05)] dark:group-hover:border-solid dark:group-hover:border-white/45 dark:group-hover:bg-white/[0.09] dark:group-hover:shadow-[0_0_12px_rgba(255,255,255,0.22),0_0_30px_rgba(255,255,255,0.08)]"
            >
              <motion.div
                className="pointer-events-none absolute [transform-style:preserve-3d]"
                style={{ left: 6, top: 6, width: 110, height: 70 }}
                initial={false}
                animate={{ translateZ: isCardHovered ? 15 : 5 }}
                transition={layerSpring}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[5px] border border-solid border-zinc-400/90 bg-gradient-to-b from-zinc-100 via-zinc-100 to-zinc-200/95 shadow-[inset_0_2px_6px_rgba(0,0,0,0.06),inset_0_0_0_1px_rgba(255,255,255,0.65)] dark:border-zinc-300/75 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-950 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <div className="absolute inset-x-2 top-1.5 flex items-center justify-between gap-2">
                    <div className="h-px w-4 bg-zinc-500/85 dark:bg-zinc-200/80" />
                    <div className="flex items-center gap-1.5">
                      <div className="h-px w-2.5 bg-zinc-500/75 dark:bg-zinc-200/72" />
                      <div className="h-px w-1 bg-zinc-500/70 dark:bg-zinc-200/65" />
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-2 h-2 w-8 -translate-x-1/2 rounded-full border border-solid border-zinc-500/75 bg-transparent dark:border-zinc-200/78" />
                  <div className="absolute left-2 right-2 top-6 flex flex-col items-start gap-2">
                    <div className="h-px w-full bg-zinc-500/90 dark:bg-zinc-200/88" />
                    <div className="h-px w-[88%] bg-zinc-500/80 dark:bg-zinc-300/85" />
                    <div className="h-px w-[72%] bg-zinc-500/72 dark:bg-zinc-300/78" />
                  </div>
                  <div className="absolute bottom-2 left-1/2 h-px w-8 -translate-x-1/2 bg-zinc-500/75 dark:bg-zinc-200/75" />
                </div>
              </motion.div>
            </IsoSlab>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
