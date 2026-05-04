"use client";
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  formatISO,
  getDay,
  getMonth,
  getYear,
  nextDay,
  parseISO,
  subWeeks,
} from "date-fns";
import { createContext, Fragment, useContext, useMemo } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DEFAULT_LABELS = {
  months: DEFAULT_MONTH_LABELS,
  weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  totalCount: "Total {{count}} contributions",
  legend: {
    less: "Less",
    more: "More",
  },
};

const ContributionGraphContext = createContext(null);

const useContributionGraph = () => {
  const context = useContext(ContributionGraphContext);

  if (!context) {
    throw new Error(
      "ContributionGraph components must be used within a ContributionGraph",
    );
  }

  return context;
};

const fillHoles = (activities) => {
  if (activities.length === 0) {
    return [];
  }

  // Sort activities by date to ensure correct date range
  const sortedActivities = [...activities].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  const calendar = new Map(activities.map((a) => [a.date, a]));

  const firstActivity = sortedActivities[0];
  const lastActivity = sortedActivities.at(-1);

  if (!lastActivity) {
    return [];
  }

  return eachDayOfInterval({
    start: parseISO(firstActivity.date),
    end: parseISO(lastActivity.date),
  }).map((day) => {
    const date = formatISO(day, { representation: "date" });

    if (calendar.has(date)) {
      return calendar.get(date);
    }

    return {
      date,
      count: 0,
      level: 0,
    };
  });
};

const groupByWeeks = (activities, weekStart = 0) => {
  if (activities.length === 0) {
    return [];
  }

  const normalizedActivities = fillHoles(activities);
  const firstActivity = normalizedActivities[0];
  const firstDate = parseISO(firstActivity.date);
  const firstCalendarDate =
    getDay(firstDate) === weekStart
      ? firstDate
      : subWeeks(nextDay(firstDate, weekStart), 1);

  const paddedActivities = [
    ...new Array(differenceInCalendarDays(firstDate, firstCalendarDate)).fill(
      undefined,
    ),
    ...normalizedActivities,
  ];

  const numberOfWeeks = Math.ceil(paddedActivities.length / 7);

  return new Array(numberOfWeeks)
    .fill(undefined)
    .map((_, weekIndex) =>
      paddedActivities.slice(weekIndex * 7, weekIndex * 7 + 7),
    );
};

const getMonthLabels = (weeks, monthNames = DEFAULT_MONTH_LABELS) => {
  return weeks
    .reduce((labels, week, weekIndex) => {
      const firstActivity = week.find((activity) => activity !== undefined);

      if (!firstActivity) {
        throw new Error(
          `Unexpected error: Week ${weekIndex + 1} is empty: [${week}].`,
        );
      }

      const month = monthNames[getMonth(parseISO(firstActivity.date))];

      if (!month) {
        const monthName = new Date(firstActivity.date).toLocaleString("en-US", {
          month: "short",
        });
        throw new Error(
          `Unexpected error: undefined month label for ${monthName}.`,
        );
      }

      const prevLabel = labels.at(-1);

      if (weekIndex === 0 || !prevLabel || prevLabel.label !== month) {
        return labels.concat({ weekIndex, label: month });
      }

      return labels;
    }, [])
    .filter(({ weekIndex }, index, labels) => {
      const minWeeks = 3;

      if (index === 0) {
        return labels[1] && labels[1].weekIndex - weekIndex >= minWeeks;
      }

      if (index === labels.length - 1) {
        return weeks.slice(weekIndex).length >= minWeeks;
      }

      return true;
    });
};

export const ContributionGraph = ({
  data,
  blockMargin = 4,
  blockRadius = 2,
  blockSize = 12,
  fontSize = 14,
  labels: labelsProp = undefined,
  maxLevel: maxLevelProp = 4,
  style = {},
  totalCount: totalCountProp = undefined,
  weekStart = 0,
  className,
  ...props
}) => {
  const maxLevel = Math.max(1, maxLevelProp);
  const weeks = useMemo(() => groupByWeeks(data, weekStart), [data, weekStart]);
  const LABEL_MARGIN = 8;

  const labels = { ...DEFAULT_LABELS, ...labelsProp };
  const labelHeight = fontSize + LABEL_MARGIN;

  const year =
    data.length > 0
      ? getYear(parseISO(data[0].date))
      : new Date().getFullYear();

  const totalCount =
    typeof totalCountProp === "number"
      ? totalCountProp
      : data.reduce((sum, activity) => sum + activity.count, 0);

  const width = weeks.length * (blockSize + blockMargin) - blockMargin;
  const height = labelHeight + (blockSize + blockMargin) * 7 - blockMargin;

  if (data.length === 0) {
    return null;
  }

  return (
    <ContributionGraphContext.Provider
      value={{
        data,
        weeks,
        blockMargin,
        blockRadius,
        blockSize,
        fontSize,
        labels,
        labelHeight,
        maxLevel,
        totalCount,
        weekStart,
        year,
        width,
        height,
      }}
    >
      <div
        className={cn("flex w-full flex-col gap-2", className)}
        style={{ fontSize, ...style }}
        {...props}
      />
    </ContributionGraphContext.Provider>
  );
};

export const ContributionGraphBlock = ({
  activity,
  dayIndex,
  weekIndex,
  className,
  ...props
}) => {
  const { blockSize, blockMargin, blockRadius, labelHeight, maxLevel } =
    useContributionGraph();

  if (activity.level < 0 || activity.level > maxLevel) {
    throw new RangeError(
      `Provided activity level ${activity.level} for ${activity.date} is out of range. It must be between 0 and ${maxLevel}.`,
    );
  }

  return (
    <rect
      className={cn(
        'data-[level="0"]:fill-black/[0.05] dark:data-[level="0"]:fill-white/[0.06]',
        'data-[level="1"]:fill-black/[0.16] dark:data-[level="1"]:fill-white/[0.18]',
        'data-[level="2"]:fill-black/[0.28] dark:data-[level="2"]:fill-white/[0.32]',
        'data-[level="3"]:fill-black/[0.44] dark:data-[level="3"]:fill-white/[0.5]',
        'data-[level="4"]:fill-black/[0.64] dark:data-[level="4"]:fill-white/[0.72]',
        className,
      )}
      data-count={activity.count}
      data-date={activity.date}
      data-level={activity.level}
      height={blockSize}
      rx={blockRadius}
      ry={blockRadius}
      width={blockSize}
      x={(blockSize + blockMargin) * weekIndex}
      y={labelHeight + (blockSize + blockMargin) * dayIndex}
      {...props}
    />
  );
};

export const ContributionGraphCalendar = ({
  hideMonthLabels = false,
  className,
  children,
  ...props
}) => {
  const { weeks, width, height, blockSize, blockMargin, labels } =
    useContributionGraph();

  const monthLabels = useMemo(
    () => getMonthLabels(weeks, labels.months),
    [weeks, labels.months],
  );

  return (
    <div className={cn("w-full overflow-hidden", className)} {...props}>
      <svg
        className="block h-auto w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <title>Contribution Graph</title>
        {!hideMonthLabels && (
          <g className="fill-current">
            {monthLabels.map(({ label, weekIndex }) => (
              <text
                dominantBaseline="hanging"
                key={weekIndex}
                x={(blockSize + blockMargin) * weekIndex}
              >
                {label}
              </text>
            ))}
          </g>
        )}
        {weeks.map((week, weekIndex) =>
          week.map((activity, dayIndex) => {
            if (!activity) {
              return null;
            }

            return (
              <Fragment key={`${weekIndex}-${dayIndex}`}>
                {children({ activity, dayIndex, weekIndex })}
              </Fragment>
            );
          }),
        )}
      </svg>
    </div>
  );
};

export const ContributionGraphFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-wrap gap-1 whitespace-nowrap sm:gap-x-4",
      className,
    )}
    {...props}
  />
);

export const ContributionGraphTotalCount = ({
  className,
  children,
  ...props
}) => {
  const { totalCount, year, labels } = useContributionGraph();

  if (children) {
    return <>{children({ totalCount, year })}</>;
  }

  return (
    <div className={cn("text-muted-foreground", className)} {...props}>
      {labels.totalCount
        ? labels.totalCount
            .replace("{{count}}", String(totalCount))
            .replace("{{year}}", String(year))
        : `Total ${totalCount} contributions in lifetime`}
    </div>
  );
};

export const ContributionGraphLegend = ({ className, children, ...props }) => {
  const { labels, maxLevel, blockSize, blockRadius } = useContributionGraph();

  return (
    <div
      className={cn("ml-auto flex items-center gap-[3px]", className)}
      {...props}
    >
      <span className="mr-1 text-muted-foreground">
        {labels.legend?.less || "Less"}
      </span>
      {new Array(maxLevel + 1).fill(undefined).map((_, level) =>
        children ? (
          <Fragment key={level}>{children({ level })}</Fragment>
        ) : (
          <svg height={blockSize} key={level} width={blockSize}>
            <title>{`${level} contributions`}</title>
            <rect
              className={cn(
                "stroke-border stroke-[1px]",
                'data-[level="0"]:fill-black/[0.05] dark:data-[level="0"]:fill-white/[0.06]',
                'data-[level="1"]:fill-black/[0.16] dark:data-[level="1"]:fill-white/[0.18]',
                'data-[level="2"]:fill-black/[0.28] dark:data-[level="2"]:fill-white/[0.32]',
                'data-[level="3"]:fill-black/[0.44] dark:data-[level="3"]:fill-white/[0.5]',
                'data-[level="4"]:fill-black/[0.64] dark:data-[level="4"]:fill-white/[0.72]',
              )}
              data-level={level}
              height={blockSize}
              rx={blockRadius}
              ry={blockRadius}
              width={blockSize}
            />
          </svg>
        ),
      )}
      <span className="ml-1 text-muted-foreground">
        {labels.legend?.more || "More"}
      </span>
    </div>
  );
};
