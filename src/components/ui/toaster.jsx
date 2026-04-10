"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()
  const [position, setPosition] = useState("top-right")

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const update = (e) => setPosition(e.matches ? "top-center" : "top-right")
    update(mq)
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return (
    <Sonner
      theme={theme}
      position={position}
      expand={false}
      richColors={false}
      style={{ fontFamily: "inherit" }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-start gap-3 w-[356px] p-4 border border-border bg-background text-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]",
          icon: "mt-0.5 shrink-0",
          content: "flex flex-col gap-0.5 flex-1 min-w-0",
          title: "text-[13px] font-bold leading-tight font-doto",
          description: "text-[12px] text-muted-foreground leading-snug",
          actionButton:
            "mt-2 border border-border text-[12px] h-6 px-2 bg-black/[0.04] dark:bg-white/[0.06] text-foreground shrink-0 font-semibold font-doto",
          cancelButton:
            "mt-2 border border-border text-[12px] h-6 px-2 bg-transparent text-foreground shrink-0",
          closeButton:
            "absolute top-2 right-2 border border-border bg-background text-foreground",
          error:
            "!border-destructive/30 !bg-destructive/10 !text-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
