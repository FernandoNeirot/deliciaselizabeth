"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      className={cn(
        "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary/10 hover:text-primary",
        modifiers.selected &&
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        modifiers.today &&
          !modifiers.selected &&
          "bg-primary/20 text-primary font-semibold",
        defaultClassNames.day_button,
        className,
      )}
      {...props}
    />
  );
}

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "outline",
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn("p-3", className)}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 sm:flex-row sm:gap-4",
          defaultClassNames.months,
        ),
        month: cn("space-y-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex justify-center pt-1 relative items-center",
          defaultClassNames.month_caption,
        ),
        caption_label: cn("text-sm font-medium", defaultClassNames.caption_label),
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground w-9 rounded-md font-normal text-[0.8rem]",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        day: cn(
          "relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected].range-end)]:rounded-r-md [&:has([aria-selected].outside)]:bg-primary/50 [&:has([aria-selected])]:bg-primary/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
          defaultClassNames.day,
        ),
        range_start: cn("rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md", defaultClassNames.range_end),
        selected: cn(
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          defaultClassNames.selected,
        ),
        today: cn("bg-primary/20 text-primary font-semibold", defaultClassNames.today),
        outside: cn(
          "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          defaultClassNames.outside,
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName, ...chevronProps }) => {
          if (orientation === "left") {
            return (
              <ChevronLeft className={cn("h-4 w-4", chevronClassName)} {...chevronProps} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRight className={cn("h-4 w-4", chevronClassName)} {...chevronProps} />
            );
          }

          return <ChevronRight className={cn("h-4 w-4", chevronClassName)} {...chevronProps} />;
        },
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar, CalendarDayButton };
