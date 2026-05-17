export function ControlsHint() {
  return (
    <p className="text-center text-sm text-slate-600 dark:text-slate-300">
      <span className="hidden sm:inline">Arrow keys or WASD to move</span>
      <span className="sm:hidden">Use the pad below or swipe keys</span>
      <span className="mx-2 text-slate-400">·</span>
      Space or P to pause
    </p>
  );
}
