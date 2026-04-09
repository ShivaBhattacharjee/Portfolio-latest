"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FaArrowRight, FaCalendar, FaBook } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { GiArchiveResearch } from "react-icons/gi";
const TruncatedTitle = ({ title, maxLength = 60 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTruncated = title.length > maxLength;
  const displayTitle = isExpanded ? title : title.slice(0, maxLength) + (isTruncated ? "..." : "");

  if (!isTruncated) {
    return <h2 className="text-sm font-bold md:text-xl">{title}</h2>;
  }

  return (
    <>
      <div className="hidden md:block">
        <Tooltip>
          <TooltipTrigger asChild>
            <h2 className="text-xl font-bold cursor-help">
              {title.slice(0, maxLength)}...
            </h2>
          </TooltipTrigger>
          <TooltipContent className="max-w-md dark:bg-black bg-white">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="md:hidden">
        <h2
          className="text-sm font-bold cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {displayTitle}
          {isTruncated && (
            <span className="text-[10px] text-muted-foreground ml-1.5">
              {isExpanded ? "(collapse)" : "(expand)"}
            </span>
          )}
        </h2>
      </div>
    </>
  );
};

const ExpandableAbstract = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-1.5 md:space-y-2">
      <h3 className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground md:text-sm md:normal-case md:tracking-normal md:text-foreground">Abstract</h3>

      <div className="hidden md:block">
        <p className="font-space-mono text-sm leading-relaxed md:text-base">
          {description}
        </p>
      </div>

      <div className="md:hidden">
        <div className="space-y-1.5">
          {isExpanded ? (
            <p className="font-space-mono text-xs leading-relaxed">
              {description}
            </p>
          ) : (
            <p className="font-space-mono text-xs leading-relaxed">
              {description.slice(0, 120)}...
            </p>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[10px] text-primary hover:text-primary/80 font-medium"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ResearchList = ({ research }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);



  return (
    <div suppressHydrationWarning>
      <TooltipProvider>
        <div className=" px-2 md:px-0">
          {research.map((item, index) => (
            <div
              key={index}
              className="border-b border-border py-6 first:pt-0 last:border-b-0"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-2">
                      <TruncatedTitle title={item.title} />
                      {item.status !== 'under-review' && (
                        <Badge
                          variant="outline"
                          className="flex-shrink-0 md:ml-5"
                        >
                          {item.status === 'active' ? 'Active' : 'Discontinued'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-[10px] font-medium text-muted-foreground md:text-sm">
                      {item.category}
                    </p>
                  </div>

                  <ExpandableAbstract description={item.description} />

                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground md:gap-4 md:text-sm">
                    <div className="flex items-center gap-1 min-w-0">
                      <FaBook size={10} className="flex-shrink-0" />
                      <span className="truncate w-48 md:w-72" title={item.journal}>{item.journal}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendar size={10} />
                      <span>{item.year}</span>
                    </div>
                    {item.collaboration && (
                      <div className="flex items-center gap-1">
                        <GiArchiveResearch size={10} />
                        <span>{item.collaboration}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.techstacks.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {item.status === 'under-review' ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button
                            size="sm"
                            disabled
                            className="cursor-not-allowed opacity-50"
                          >
                            Under Review <FaArrowRight className="ml-2" size="12px" />
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Research is being reviewed by journal</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm">
                        View Research <FaArrowRight className="ml-2" size="12px" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default ResearchList;