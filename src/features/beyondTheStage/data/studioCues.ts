const studioPanels = [
  {
    id: "guitar",
    type: "cue",
    timestamp: "0:30",
    lines: ["Me encanta el sonido de esa guitarra."],
  },
  {
    id: "guitar-clip",
    type: "media",
    timestamp: "0:30",
    label: "El hallazgo",
    description: "Clip o captura del momento en que la guitarra entra en la sesión.",
  },
  {
    id: "lamppost",
    type: "cue",
    timestamp: "0:34",
    lines: [
      "«Bajo una vieja farola, pronuncié tu nombre».",
      "Me gusta esa parte de «pronuncié tu nombre». Aunque no me convence lo de la farola; no me gusta cómo suena al cantarlo.",
    ],
  },
  {
    id: "better-day",
    type: "cue",
    timestamp: "1:08 — 1:27",
    lines: [
      "¡Guau! Eso suena genial. También me gusta la parte de «por un día mejor».",
      "¿Sabes? Me gusta eso de «es hora de un día mejor». Sí, eso está bien...",
    ],
  },
  {
    id: "better-day-clip",
    type: "media",
    timestamp: "1:08 — 1:27",
    label: "Una frase encuentra su sitio",
    description: "Clip o captura de la conversación que termina de fijar “for a better day”.",
  },
  {
    id: "stories",
    type: "cue",
    timestamp: "1:42 — 1:54",
    lines: [
      "En Stories estoy explorando mucho más...",
      "Me estoy saliendo un poco de lo habitual, probando cosas nuevas.",
    ],
  },
] as const;

export default studioPanels;
