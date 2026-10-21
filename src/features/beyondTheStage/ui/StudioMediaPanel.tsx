type StudioMediaPanelProps = {
  timestamp: string;
  label: string;
  description: string;
};

export default function StudioMediaPanel({ timestamp, label, description }: StudioMediaPanelProps) {
  return (
    <figure data-studio-panel className="relative flex h-svh w-svw shrink-0 items-center justify-center overflow-hidden bg-[#090a0c] px-6 sm:px-12">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(242,242,243,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(242,242,243,0.08)_1px,transparent_1px)] [background-size:2.25rem_2.25rem]" aria-hidden="true" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-foreground/30" aria-hidden="true" />
      <div className="relative max-w-2xl border border-foreground/20 bg-background/70 p-7 backdrop-blur-sm sm:p-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-foreground-muted">Archivo de estudio · {timestamp}</p>
        <h3 className="text-2xl font-normal uppercase tracking-wide text-foreground sm:text-3xl">{label}</h3>
        <p className="mt-4 max-w-lg leading-relaxed text-foreground-muted">{description}</p>
      </div>
      <figcaption className="sr-only">Espacio reservado para un fragmento o una captura acreditada del proceso de estudio.</figcaption>
    </figure>
  );
}
