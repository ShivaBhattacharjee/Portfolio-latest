"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      expand={false}
      richColors={false}
      style={{ fontFamily: "inherit" }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-start gap-3 w-[356px] p-4 border-2 border-foreground bg-background text-foreground rounded-[4px] shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff]",
          icon: "mt-0.5 shrink-0",
          content: "flex flex-col gap-0.5 flex-1 min-w-0",
          title: "text-[13px] font-bold leading-tight",
          description: "text-[12px] text-muted-foreground leading-snug",
          actionButton:
            "mt-2 border-2 border-foreground text-[12px] h-6 px-2 bg-foreground text-background rounded-[4px] shrink-0 font-semibold",
          cancelButton:
            "mt-2 border-2 border-foreground text-[12px] h-6 px-2 bg-background text-foreground rounded-[4px] shrink-0",
          closeButton:
            "absolute top-2 right-2 border-2 border-foreground rounded-[4px] bg-background text-foreground",
          error:
            "!bg-foreground !text-background !border-foreground !shadow-[4px_4px_0px_0px_hsl(var(--destructive))] dark:!shadow-[4px_4px_0px_0px_hsl(var(--destructive))]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
