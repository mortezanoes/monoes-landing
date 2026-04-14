const techs = [
  { name: "Go", color: "#00ADD8", projects: "Agent" },
  { name: "Rust", color: "#DEA584", projects: "Clip · Task" },
  { name: "TS", color: "#3178C6", projects: "Brain" },
  { name: "Svelte", color: "#FF3E00", projects: "Clip UI" },
  { name: "React", color: "#61DAFB", projects: "Agent UI" },
  { name: "SQLite", color: "#8B7355", projects: "All" },
];

export function TechStack() {
  return (
    <section className="bg-ivory-warm px-8 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-8 text-center text-xs uppercase tracking-label text-gold">The Stack</p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {techs.map((tech) => (
            <div key={tech.name} className="group text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl border border-ivory-linen bg-white text-sm font-semibold shadow-soft transition-shadow group-hover:shadow-soft-lg" style={{ color: tech.color }}>
                {tech.name}
              </div>
              <p className="text-[10px] text-gold-bronze">{tech.projects}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
