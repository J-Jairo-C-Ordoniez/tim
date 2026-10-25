export type InspirationContent = {
  introStatement: string;
  inspirations: string[];
  moreLabel: string;
  closing: {
    quote: string;
    name: string;
    dates: string;
  };
};

export const inspirationData: InspirationContent = {
  introStatement: "It begins again in the hands, hearts, and minds of others.",
  inspirations: [
    "Melodies that cross every boundary.",
    "The courage to create honestly.",
    "A more human music industry.",
    "Communities that keep each other close.",
    "New creators finding their own voice.",
  ],
  moreLabel: "And so much more.",
  closing: {
    quote:
      "“The greatest tribute to a creator is not to build them a static monument to look back at, but to light a blank canvas for whatever you choose to create today.”",
    name: "TIM BERGLING",
    dates: "1989 — 2018",
  },
};
