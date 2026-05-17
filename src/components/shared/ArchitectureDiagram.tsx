interface ArchitectureDiagramProps {
  diagram: string;
  title?: string;
}

const ArchitectureDiagram = ({ diagram, title = 'Architecture (conceptual)' }: ArchitectureDiagramProps) => {
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-950 dark:border-slate-700">
      <figcaption className="border-b border-slate-700 px-4 py-2 font-mono text-xs text-slate-400">
        {title}
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-emerald-400/90">
        {diagram}
      </pre>
    </figure>
  );
};

export default ArchitectureDiagram;
