"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const siteRoutes = [
  "/",
  "/projects",
  "/experience",
  "/hackathons",
  "/research",
  "/docs/api",
];

function createEmptySchema() {
  return {
    type: "object",
    properties: {},
    additionalProperties: false,
  };
}

export default function WebMcpProvider() {
  const router = useRouter();

  useEffect(() => {
    const modelContext = navigator.modelContext;

    if (!modelContext) {
      return undefined;
    }

    const tools = [
      {
        name: "navigate_site_section",
        description:
          "Navigate to a public section of the portfolio site such as projects, experience, hackathons, research, or API docs.",
        inputSchema: {
          type: "object",
          properties: {
            path: {
              type: "string",
              enum: siteRoutes,
              description: "The site path to navigate to.",
            },
          },
          required: ["path"],
          additionalProperties: false,
        },
        execute: async ({ path }) => {
          router.push(path);

          return {
            ok: true,
            path,
            url: new URL(path, window.location.origin).toString(),
          };
        },
      },
      {
        name: "get_social_profiles",
        description:
          "Fetch the site's public social and contact profile data, including GitHub, X/Twitter, LinkedIn, Discord, and email details.",
        inputSchema: createEmptySchema(),
        execute: async () => {
          const response = await fetch("/api/socials", {
            headers: { Accept: "application/json" },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch social profile data.");
          }

          return response.json();
        },
      },
      {
        name: "get_location_snapshot",
        description:
          "Fetch the request-derived location and current weather snapshot shown in the site footer when available.",
        inputSchema: createEmptySchema(),
        execute: async () => {
          const response = await fetch("/api/location", {
            headers: { Accept: "application/json" },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch location snapshot.");
          }

          return response.json();
        },
      },
      {
        name: "get_visitor_count",
        description:
          "Fetch the current visitor count exposed by the portfolio site.",
        inputSchema: createEmptySchema(),
        execute: async () => {
          const response = await fetch("/api/visitors", {
            headers: { Accept: "application/json" },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch visitor count.");
          }

          return response.json();
        },
      },
    ];

    const cleanup = [];
    const abortController = new AbortController();

    if (typeof modelContext.registerTool === "function") {
      for (const tool of tools) {
        try {
          const result = modelContext.registerTool(tool, {
            signal: abortController.signal,
          });

          cleanup.push(result);
        } catch (error) {
          console.error(`Failed to register WebMCP tool: ${tool.name}`, error);
        }
      }
    } else if (typeof modelContext.provideContext === "function") {
      try {
        const result = modelContext.provideContext({
          tools,
          signal: abortController.signal,
        });

        cleanup.push(result);
      } catch (error) {
        console.error("Failed to provide WebMCP context.", error);
      }
    }

    return () => {
      abortController.abort();

      for (const entry of cleanup) {
        if (typeof entry === "function") {
          entry();
          continue;
        }

        if (entry && typeof entry.unregister === "function") {
          entry.unregister();
        }
      }
    };
  }, [router]);

  return null;
}
