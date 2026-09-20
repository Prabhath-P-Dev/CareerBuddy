import type { CSSProperties } from "react";
import { useLocation } from "react-router-dom";
import type { CareerRoadmap } from "../types/roadmap.types";
import { getCareerTheme } from "../lib/career-theme";
import RoadmapConnector from "../components/roadmap/RoadmapConnector";
import RoadmapStepCard from "../components/roadmap/RoadmapStepCard";

export default function Roadmap() {
  const location = useLocation();
  const roadmap = location.state as CareerRoadmap | null;

  if (!roadmap) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-semibold text-zinc-900">No roadmap found</h1>
        <p className="mt-2 max-w-sm text-sm text-zinc-500">
          Generate a career roadmap first to see your personalized plan here.
        </p>
      </div>
    );
  }

  const theme = getCareerTheme(roadmap.career);
  const ThemeIcon = theme.icon;

  // Expose the theme as CSS custom properties so every child component can
  // reference `var(--accent)` / `var(--accent-soft)` without prop drilling
  // or generating per-career Tailwind classes.
  const themeStyle = {
    "--accent": theme.accent,
    "--accent-soft": theme.soft,
  } as CSSProperties;

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-12 sm:py-16" style={themeStyle}>
      <header className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--accent-soft)]">
          <ThemeIcon className="h-6 w-6 text-[color:var(--accent)]" strokeWidth={1.75} aria-hidden="true" />
        </div>
        <p className="text-sm font-medium text-zinc-500">Your career path</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          {roadmap.career}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">{roadmap.overview}</p>
      </header>

      <main className="mx-auto mt-14 max-w-2xl">
        {roadmap.steps.map((step, index) => {
          const isLast = index === roadmap.steps.length - 1;
          return (
            <div
              key={`${step.title}-${index}`}
              className={`flex gap-4 sm:gap-6 ${isLast ? "" : "mb-6"}`}
            >
              <RoadmapConnector stepNumber={index + 1} isLast={isLast} />
              <div className="min-w-0 flex-1">
                <RoadmapStepCard step={step} />
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}