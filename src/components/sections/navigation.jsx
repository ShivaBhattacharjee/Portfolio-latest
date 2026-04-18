"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { navLinks } from "@/constants";
import MoonIcon from "@/components/icons/moon";
import SunIcon from "@/components/icons/sun";
import HouseIcon from "@/components/icons/house";
import CodeEditorIcon from "@/components/icons/sparkles";
import SuitcaseIcon from "@/components/icons/briefcase";
import MagnifierIcon from "@/components/icons/beaker";
import StarSparkleIcon from "@/components/icons/star-sparkle";
import {
  Tabs,
  TabsList,
  TabsHighlight,
  TabsHighlightItem,
  TabsTrigger,
} from "@/components/animate-ui/primitives/animate/tabs";
import { vibrate, vibrateSelection, playClickSound } from "@/lib/haptics";

const iconMap = {
  "/": HouseIcon,
  "/projects": CodeEditorIcon,
  "/experience": SuitcaseIcon,
  "/hackathons": StarSparkleIcon,
  "/research": MagnifierIcon,
};

function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(pathname);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  const handleNavigation = (val) => {
    vibrateSelection();
    setActiveTab(val);
    router.push(val);
  };

  const toggleMode = () => {
    vibrate();
    playClickSound();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:bottom-auto md:top-6">
      <div className="flex items-center rounded-full border border-black/[0.08] bg-black/[0.05] px-1 py-1 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.05] md:px-2">
        <Tabs value={activeTab} onValueChange={handleNavigation}>
          <TabsHighlight
            className="absolute z-0 inset-0 rounded-full bg-black/[0.08] dark:bg-white/[0.08]"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <TabsList className="flex items-center">
              {navLinks.map((link) => {
                const Icon = iconMap[link.path];

                return (
                  <TabsHighlightItem key={link.path} value={link.path}>
                    <TabsTrigger
                      value={link.path}
                      className="flex flex-col items-center gap-0.5 rounded-full px-3.5 py-1.5 text-black/40 transition-colors duration-200 data-[state=active]:text-black dark:text-white/40 dark:data-[state=active]:text-white md:flex-row md:gap-2 md:px-5 md:py-2"
                    >
                      {Icon && <Icon className="h-[18px] w-[18px] md:h-[18px] md:w-[18px]" strokeWidth={1.5} />}
                      <span className="text-[9px] font-medium tracking-wide md:text-[11px]">
                        {link.name}
                      </span>
                    </TabsTrigger>
                  </TabsHighlightItem>
                );
              })}
            </TabsList>
          </TabsHighlight>
        </Tabs>

        <div className="mx-0.5 h-8 w-px bg-black/[0.1] dark:bg-white/[0.1] md:mx-1" />

        <button
          onClick={toggleMode}
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-black/40 transition-colors duration-200 hover:text-black/70 dark:text-white/40 dark:hover:text-white/70"
        >
          <SunIcon className="h-[18px] w-[18px] rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-90 dark:scale-0 md:h-[22px] md:w-[22px]" />
          <MoonIcon className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100 md:h-[22px] md:w-[22px]" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    </nav>
  );
}

export default NavigationBar;
