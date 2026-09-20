interface RoadmapConnectorProps {
  stepNumber: number;
  isLast: boolean;
}

/**
 * Renders the left-hand rail for a single roadmap row: a numbered node and,
 * unless this is the final step, a vertical line leading to the next node.
 * The line is a plain sibling flex item set to grow (`flex-1`), so it always
 * matches the height of whatever step card sits next to it.
 */
export default function RoadmapConnector({ stepNumber, isLast }: RoadmapConnectorProps) {
  return (
    <div className="flex w-10 shrink-0 flex-col items-center" aria-hidden="true">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-sm font-semibold text-[color:var(--accent)]">
        {String(stepNumber).padStart(2, "0")}
      </div>
      {!isLast && <div className="mt-1 w-px flex-1 bg-zinc-200" />}
    </div>
  );
}