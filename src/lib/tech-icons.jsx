import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPrisma,
  SiSupabase,
  SiOpenai,
  SiRedis,
  SiFirebase,
  SiGooglecloud,
  SiDocker,
  SiVercel,
  SiFramer,
  SiThreedotjs,
  SiLangchain,
  SiDrizzle,
  SiNodedotjs,
  SiMongodb,
  SiGooglemaps,
  SiPython,
  SiExpress,
  SiOpencv,
  SiSocketdotio,
  SiSolidity,
  SiEthereum,
  SiGooglegemini,
  SiNasa,
  SiVite,
} from "react-icons/si";
import { Database, Sparkles, Brain, Boxes, Network, Activity, Code2, Flame, Cpu, Eye, Cloud, Link2, Rocket, Volume2 } from "lucide-react";

// adaptive => use currentColor (good for monochrome brands so they stay visible in dark/light)
const TECH_META = {
  ReactJS: { Icon: SiReact, color: "#61DAFB" },
  React: { Icon: SiReact, color: "#61DAFB" },
  NextJS: { Icon: SiNextdotjs, adaptive: true },
  "Next.js": { Icon: SiNextdotjs, adaptive: true },
  "Next.js 14": { Icon: SiNextdotjs, adaptive: true },
  Tailwindcss: { Icon: SiTailwindcss, color: "#06B6D4" },
  Prisma: { Icon: SiPrisma, adaptive: true },
  Supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  OpenAI: { Icon: SiOpenai, adaptive: true },
  Redis: { Icon: SiRedis, color: "#DC382D" },
  Firebase: { Icon: SiFirebase, color: "#F57C00" },
  GCP: { Icon: SiGooglecloud, color: "#4285F4" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  "Vercel AI SDK": { Icon: SiVercel, adaptive: true },
  "Frame Motion": { Icon: SiFramer, color: "#3B82F6" },
  Motion: { Icon: SiFramer, color: "#3B82F6" },
  ThreeJS: { Icon: SiThreedotjs, adaptive: true },
  "Three.js": { Icon: SiThreedotjs, adaptive: true },
  Langchain: { Icon: SiLangchain, color: "#1C8A6B" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  NodeJS: { Icon: SiNodedotjs, color: "#5FA04E" },

  // fallbacks — no Simple Icons entry, pick a thematic lucide icon + brand-ish color
  Pinecone: { Icon: Database, color: "#6366F1" },
  RAG: { Icon: Sparkles, color: "#A855F7" },
  Mistral: { Icon: Brain, color: "#FA520F" },
  LlamaIndex: { Icon: Boxes, color: "#6E57E0" },
  XYFlow: { Icon: Network, color: "#FF0072" },
  Langfuse: { Icon: Activity, color: "#0EA5E9" },
  Unsloth: { Icon: Cpu, color: "#10B981" },
  Drizzle: { Icon: SiDrizzle, color: "#84CC16" },

  // hackathon-era stack
  "React JS": { Icon: SiReact, color: "#61DAFB" },
  "React Native": { Icon: SiReact, color: "#61DAFB" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  "Google Maps API": { Icon: SiGooglemaps, color: "#4285F4" },
  Python: { Icon: SiPython, color: "#3776AB" },
  Express: { Icon: SiExpress, adaptive: true },
  OpenCV: { Icon: SiOpencv, color: "#5C3EE8" },
  "Socket.IO": { Icon: SiSocketdotio, adaptive: true },
  Solidity: { Icon: SiSolidity, adaptive: true },
  Ethereum: { Icon: SiEthereum, adaptive: true },
  "Gemini 1.5 Pro": { Icon: SiGooglegemini, color: "#8B5CF6" },
  "NASA Open APIs": { Icon: SiNasa, color: "#E03C31" },
  Vite: { Icon: SiVite, color: "#646CFF" },

  // no Simple Icons entry
  YOLO: { Icon: Eye, color: "#00BFFF" },
  "Serverless Functions": { Icon: Cloud, color: "#F59E0B" },
  Hardhat: { Icon: Flame, color: "#F0B90B" },
  "Web3.js": { Icon: Link2, color: "#F16822" },
  "Web Audio API": { Icon: Volume2, color: "#8B5CF6" },
};

const DEFAULT = { Icon: Code2, adaptive: true };

const hexToRgba = (hex, alpha) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const TechBadge = ({ name }) => {
  const meta = TECH_META[name] ?? DEFAULT;
  const { Icon, color, adaptive } = meta;

  if (adaptive) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-black/[0.15] bg-black/[0.04] px-2 py-0.5 text-[10px] text-foreground/80 dark:border-white/[0.18] dark:bg-white/[0.06] md:px-2.5 md:py-1 md:text-[11px]">
        <Icon className="h-3 w-3 md:h-3.5 md:w-3.5" />
        {name}
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md border border-dashed px-2 py-0.5 text-[10px] font-medium md:px-2.5 md:py-1 md:text-[11px]"
      style={{
        backgroundColor: hexToRgba(color, 0.12),
        borderColor: hexToRgba(color, 0.35),
        color,
      }}
    >
      <Icon className="h-3 w-3 md:h-3.5 md:w-3.5" style={{ color }} />
      {name}
    </span>
  );
};
