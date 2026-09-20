import type { RoadmapStep } from "../../types/roadmap.types";

interface RoadmapStepCardProps {
  step: RoadmapStep;
}

export default function RoadmapStepCard({ step }: RoadmapStepCardProps) {
  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
      <h3 className="text-lg font-semibold text-zinc-900 sm:text-xl">{step.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">{step.description}</p>

      {step.skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {step.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-zinc-200 bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-medium text-[color:var(--accent)]"
            >
              {skill} 
            </span>
          ))}
        </div>
      )}
    </div>
  );
}