# TIM — Interactive Narrative Experience
TIM es una experiencia web inmersiva de **scroll narrativo** inspirada en la historia humana y creativa de **Avicii**, basada en la narrativa de su biografía oficial.

El proyecto no busca presentar información ni una biografía tradicional, sino **traducir emociones, etapas y tensiones internas** a través de interacción, movimiento y lenguaje visual.

TIM es una exploración de **UX storytelling**, arquitectura frontend y diseño emocional aplicado a la web.

## Concepto
TIM plantea una narrativa dividida en **actos**, donde cada acto representa una etapa emocional distinta de la vida de Tim Bergling.

El scroll funciona como eje narrativo:
* Controla el tiempo
* Activa escenas
* Modula el ritmo emocional

La interfaz prioriza:
* Gráficos
* Movimiento
* Profundidad
* Silencio visual

## Estructura narrativa
La experiencia está compuesta por **7 secciones**:
1. **Intro** – Entrada al mundo
2. **Acto I** – Sensibilidad / Origen
3. **Acto II** – Descubrimiento creativo
4. **Acto III** – Ascenso y exposición
5. **Acto IV** – Presión y quiebre
6. **Acto V** – Silencio y retirada
7. **Acto VI** – Legado

Cada acto tiene:
* Una emoción dominante
* Un ritmo visual propio
* Elementos gráficos específicos
* Comportamiento de scroll controlado

## Objetivos del proyecto
* Explorar el **scroll como herramienta narrativa**
* Profundizar en **arquitectura frontend aplicada a experiencias inmersivas**
* Aplicar principios reales de **UX/UI** en un contexto creativo
* Construir un proyecto conceptual sólido para portafolio
* Traducir emociones humanas a interacción digital

## Nota personal
TIM nace de una conexión profunda con la música y la historia humana detrás de ella.
No es un homenaje literal, sino una interpretación emocional construida desde el diseño y la tecnología.

## Capas del proyecto

### Capas conceptuales finales
1. **Capa Global (World / Engine)**
2. **Capa de Actos (Narrative)**
3. **Capa de Elementos (Scene Objects)**
4. **Capa de Pinceles (Render Primitives)**

## Capa Global
Se encarga de tener el control. No el contenido.

### Responsabilidad
* Canvas global (Three.js)
* Scroll (Lenis)
* Timeline maestro (GSAP / ScrollTrigger)
* Estado global del “mundo” (acto actual, progreso)
* Postprocessing
* Audio (Howler)

### Ejemplo de responsabilidades
* Inicializar `<Canvas />`
* Conectar scroll → tiempo
* Decidir **cuándo empieza y termina cada acto**
* No dibuja nada

## Capa de Actos
Aquí se cuenta la historia.

### Responsabilidad
* Cada Acto es un módulo independiente
* Orquesta sus elementos internos
* Define:
  * cuándo aparecen
  * cómo se mueven
  * cómo reaccionan al scroll
* Un acto solo conoce:
  * su timeline
  * sus elementos
  * su rango de scroll

## Capa de Elementos
Aquí viven los elementos indepenientes de cada acto

### Responsabilidad
* Representar entidades visuales concretas
* Tener su propio estado interno
* Exponer hooks para animación

### Ejemplo
* Barco
* Lluvia
* Nubes
* Fondo
* Luz / Sol

## Capa de Pinceles
Aquí viven los pinceles que se usan para dibujar los elementos

### Responsabilidad
* Funciones reutilizables de dibujo
* Shaders
* Trazos
* Arcos
* Ruido
* Coloreado
* Distorsión

## Arquitectura
* Modular
* Declarativa

```
src/
│
├── app/
│   └── page.tsx
│
├── world/                # Capa Global
│   ├── World.tsx
│   ├── ScrollManager.ts
│   ├── Timeline.ts
│   ├── AudioManager.ts
│   └── PostProcessing.tsx
│
├── acts/                 # Capa de Actos
│   ├── Intro/
│   │   ├── IntroAct.tsx
│   │   └── intro.timeline.ts
│   ├── Act01/
│   ├── Act02/
│   └── ...
│
├── elements/             # Capa de Elementos
│   ├── Boat.tsx
│   ├── Rain.tsx
│   ├── Clouds.tsx
│   ├── Sun.tsx
│   └── Background.tsx
│
├── brushes/              # Capa de Pinceles
│   ├── useStroke.ts
│   ├── useArc.ts
│   ├── useNoise.ts
│   ├── useColor.ts
│   └── shaders/
│
├── hooks/
│   ├── useScroll.ts
│   ├── useActProgress.ts
│   └── useTimeline.ts
│
└── config/
    ├── acts.config.ts
    └── world.config.ts
```
## Relación con las librerías

### GSAP + ScrollTrigger
* Vive en **World**
* Los actos solo **registran timelines**
* ScrollTrigger nunca toca elementos directamente

### @react-three/fiber + drei
* Canvas único
* Elementos como componentes declarativos
* Pinceles encapsulan la complejidad de Three

### Lenis
* Controla el tiempo, no el scroll real
* Scroll → progreso → GSAP

### Howler
* Audio sincronizado por acto
* No mezclado con UI

### Postprocessing
* Global
* Afecta al mundo, no a los actos

## Flujo de trabajo
1. El scroll controla el tiempo.
2. El tiempo controla los actos.
3. Los actos controlan los elementos.
4. Los elementos usan pinceles.