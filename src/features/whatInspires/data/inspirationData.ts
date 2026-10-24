export type InspirationItem = {
  id: string;
  category: string;
  badge: string;
  title: string;
  subtitle: string;
  excerpt: string;
  quote: string;
  quoteAuthor: string;
  fullStory: string[];
  metrics?: { label: string; value: string };
  gradient: string;
  accentBorder: string;
};

export type InspirationContent = {
  sectionTitle: string;
  sectionSubtitle: string;
  introPhrases: {
    phrase1: string;
    phrase2: string;
    phrase3: string;
  };
  items: InspirationItem[];
  closing: {
    quote: string;
    author: string;
    callout: string;
    signature: string;
  };
};

export const inspirationData: InspirationContent = {
  sectionTitle: "Lo Que Inspira",
  sectionSubtitle: "The Living Echo of Avicii",
  introPhrases: {
    phrase1: "A melody does not end when the sound fades.",
    phrase2: "It begins again in the hands, hearts, and minds of others.",
    phrase3: "The spark that ignited an entire creative generation.",
  },
  items: [
    {
      id: "video-games",
      category: "Videojuegos & Sinestesia",
      badge: "AVICII Invector",
      title: "Volar a través del Ritmo",
      subtitle: "La música convertida en trayectorias de luz interactiva",
      excerpt:
        "Tim co-diseñó experiencias interactivas donde cada acorde se convierte en un acelerador gravitatorio, permitiendo a los jugadores pilotar naves espaciales guiadas por la melodía pura.",
      quote: "Queríamos que cualquiera pudiera sentir físicamente cómo se ensambla una melodía mientras viaja por el espacio.",
      quoteAuthor: "Hello There Games · Co-desarrolladores de Invector",
      fullStory: [
        "Antes de su partida, Tim Bergling colaboró estrechamente con el estudio sueco Hello There Games durante más de dos años para desarrollar AVICII Invector. Su visión no era crear un simple juego rítmico, sino una traducción sinestésica: que sentir los compases fuera equivalente a pilotar una nave a través de nebulosas de color.",
        "El juego dona una parte sustancial de sus ingresos directamente a la Tim Bergling Foundation, convirtiendo el entretenimiento y la música interactiva en una herramienta de apoyo para la salud mental juvenil en todo el planeta.",
        "Jugadores de más de sesenta países han reportado haber encontrado en sus pistas espaciales un espacio de meditación activa, catarsis emocional y conexión con la euforia compositiva de Tim.",
      ],
      metrics: { label: "Impacto Global", value: "25+ Pistas Jugables" },
      gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
      accentBorder: "border-cyan-500/30",
    },
    {
      id: "visual-arts",
      category: "Arte Visual & Muralismo",
      badge: "Tributos Gráficos",
      title: "Lienzos de Luz y Duelo",
      subtitle: "De las calles de Estocolmo a galerías digitales de todo el mundo",
      excerpt:
        "Ilustradores, muralistas urbanos y creadores de arte 3D transformaron la tristeza de su partida en murales monumentales, portadas conceptuales y obras que celebran la vida.",
      quote: "Pintar su rostro no fue una despedida, sino una forma de asegurarnos de que su mirada siga acompañando las mañanas de la ciudad.",
      quoteAuthor: "Colectivo de Arte Urbano de Sergels Torg",
      fullStory: [
        "En Estocolmo, Londres, Ámsterdam y Tokio, muros enteros se cubrieron espontáneamente con la silueta icónica de Tim con su gorra hacia atrás y una mano en los auriculares. El arte callejero sirvió como un santuario abierto y descentralizado para millones de personas.",
        "En plataformas digitales, ilustradores de todo el mundo reimaginaron las historias visuales de temas como 'The Nights', 'Levels' y 'Hey Brother', fusionando estética nórdica, caligrafía japonesa y cyberpunk contemporáneo.",
        "Cada trazo refleja una idea compartida: Tim nunca buscó ser un ídolo inaccesible, sino un joven auténtico que tradujo la vulnerabilidad humana en arte eterno.",
      ],
      metrics: { label: "Murales Registrados", value: "40+ Ciudades" },
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      accentBorder: "border-amber-500/30",
    },
    {
      id: "symphonic-sound",
      category: "Música & Reinterpretaciones",
      badge: "Tributo Sinfónico",
      title: "Acordes que No Envejecen",
      subtitle: "Orquestas filarmónicas, cuartetos de cuerda y nuevos productores",
      excerpt:
        "Las complejas progresiones armónicas de Tim han sido analizadas y ejecutadas por orquestas sinfónicas de primer nivel, revelando que detrás del beat electrónico yacían estructuras dignas de la música clásica.",
      quote: "Cuando desnudas sus temas y los tocas únicamente con violines y piano, descubres composiciones que habrían conmovido en cualquier siglo.",
      quoteAuthor: "Royal Stockholm Philharmonic Orchestra",
      fullStory: [
        "En los macro-conciertos conmemorativos organizados en el Friends Arena, una orquesta de más de cincuenta músicos clásicos unió sus instrumentos con sintetizadores analógicos, demostrando la riqueza tonal y la arquitectura musical que Tim concebía en su portátil.",
        "Al mismo tiempo, en millones de dormitorios de adolescentes, jóvenes compositores desglosan sus acordes de séptima y sus polirritmias folk-dance para aprender a producir sus propias canciones desde cero.",
        "Avicii democratizó la producción musical: demostró que una melodía capaz de dar la vuelta al planeta puede nacer en una habitación modesta con pasión y constancia.",
      ],
      metrics: { label: "Músicos en Escena", value: "58 Instrumentistas" },
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      accentBorder: "border-emerald-500/30",
    },
    {
      id: "virtual-worlds",
      category: "Mundos Virtuales & Comunidad",
      badge: "Espacios Compartidos",
      title: "Santuarios Digitales",
      subtitle: "Conciertos en VR, monumentos en Minecraft y comunidades globales",
      excerpt:
        "La juventud que creció con sus himnos creó réplicas de sus escenarios en entornos virtuales, festivales benéficos en streaming y tributos interactivos donde miles de personas bailan al unísono.",
      quote: "No pudimos despedirnos en persona en un festival físico, así que construimos el escenario nosotros mismos y reunimos a amigos de cinco continentes.",
      quoteAuthor: "Comunidad Virtual Avicii Memorial",
      fullStory: [
        "Cuando las distancias físicas impedían reunirse, comunidades globales en videojuegos y mundos virtuales construyeron homenajes colosales bloque a bloque, reproduciendo con precisión milimétrica los escenarios del Ultra Music Festival y Tomorrowland.",
        "Se organizaron maratones de streaming y festivales en realidad virtual donde los usuarios compartían micrófonos abiertos para relatar cómo canciones como 'Waiting For Love' les ayudaron a superar pérdidas personales o etapas de aislamiento.",
        "Estas manifestaciones demostraron que el legado de un creador no vive en un archivo estático, sino en el espacio vivo que su comunidad sigue habitando.",
      ],
      metrics: { label: "Asistentes Conectados", value: "100K+ Participantes" },
      gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
      accentBorder: "border-purple-500/30",
    },
    {
      id: "social-impact",
      category: "Conciencia & Movimiento",
      badge: "Tim Bergling Foundation",
      title: "Transformar el Silencio",
      subtitle: "Romper el estigma de la salud mental en las artes creativas",
      excerpt:
        "La honestidad y la fragilidad que Tim plasmó en sus documentales inspiraron un cambio radical en la industria musical, promoviendo el cuidado psicológico de DJs, técnicos y artistas jóvenes.",
      quote: "Tim quería marcar una diferencia. La mejor manera de honrarle es cuidar de los que hoy sienten la misma soledad que él conoció.",
      quoteAuthor: "Klas Bergling · Padre de Tim",
      fullStory: [
        "Tras su fallecimiento en 2018, la familia de Tim creó la Tim Bergling Foundation para abogar activamente por el reconocimiento del suicidio como una emergencia de salud global y financiar programas de prevención y escucha para jóvenes.",
        "La fundación impulsó la reconversión del emblemático Ericsson Globe de Estocolmo en el 'Avicii Arena', un símbolo internacional de apoyo a la juventud y un centro neurálgico para eventos contra el estigma de la salud mental.",
        "Hoy, festivales de todo el mundo han implementado zonas de descompresión sensorial, protocolos de descanso y asesoramiento psicológico obligatorio para artistas en gira gracias al precedente de Tim.",
      ],
      metrics: { label: "Fondos Movilizados", value: "Millones en Apoyo" },
      gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
      accentBorder: "border-rose-500/30",
    },
    {
      id: "perpetual-spark",
      category: "El Futuro Creativo",
      badge: "Semilla Abierta",
      title: "La Chispa que Continúa",
      subtitle: "Cada nueva creación es una continuación de su impulso",
      excerpt:
        "Nuevas generaciones de productores de EDM, compositores de bandas sonoras y vocalistas encuentran en su atrevimiento melódico la valentía para cruzar géneros sin pedir permiso.",
      quote: "Él mezcló folk acústico con sintetizadores cuando todos le dijeron que fracasaría. Eso me enseñó a no tener miedo de mis propias ideas.",
      quoteAuthor: "Productora Indie de 21 años",
      fullStory: [
        "Cuando Avicii estrenó 'Wake Me Up' en Miami en 2013 con una banda de country en vivo, parte del público le abucheó por considerarlo ajeno a la música dance. Tres meses después, el tema se convirtió en uno de los himnos más cantados de la historia moderna.",
        "Esa audacia sin complejos sigue siendo la brújula para miles de creadores emergentes que desafían los algoritmos y las etiquetas comerciales para seguir únicamente su instinto melódico.",
        "Su legado final no es una lista de éxitos pasados, sino una invitación permanente: atreverse a crear algo sincero, humano y conmovedor.",
      ],
      metrics: { label: "Inspiración", value: "Generación Futura" },
      gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
      accentBorder: "border-yellow-500/30",
    },
  ],
  closing: {
    quote:
      "“El mayor homenaje a un creador no es construirle un monumento estático para mirarlo hacia atrás, sino encender un lienzo en blanco para lo que tú decidas crear hoy.”",
    author: "El Legado en Movimiento",
    callout: "Crear · Recordar · Compartir",
    signature: "TIM BERGLING · 1989 — FOREVER",
  },
};
