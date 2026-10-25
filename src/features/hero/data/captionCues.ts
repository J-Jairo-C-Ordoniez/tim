const captionCues = [
  {
    id: "slow-down",
    start: 0,
    end: 8,
    text: "I didn't believe I could actually slow down. I didn't believe that I could tour any differently than this.",
    segments: [
      { text: "I didn't believe ", tone: "context" },
      { text: "I could actually slow down.", tone: "emotional" },
      { text: " I didn't believe that I could tour ", tone: "context" },
      { text: "any differently than this.", tone: "emotional" },
    ],
  },
  {
    id: "everyone-else",
    start: 8,
    end: 17,
    text: "I looked around and saw everyone else doing what I was doing. They seemed to be doing fine.",
    segments: [
      { text: "I looked around and saw ", tone: "context" },
      { text: "everyone else doing what I was doing. ", tone: "emotional" },
      { text: "They seemed to be doing fine.", tone: "emotional" },
    ],
  },
  {
    id: "feel-crazy",
    start: 17,
    end: 25,
    text: "I can't read minds, but they looked like they were doing fine. Then I started to feel crazy.",
    segments: [
      { text: "I can't read minds, but they looked like ", tone: "context" },
      { text: "they were doing fine. ", tone: "emotional" },
      { text: "Then I started to feel crazy.", tone: "emotional" },
    ],
  },
  {
    id: "happy",
    start: 25,
    end: 30,
    text: "Everything on the checklist is there, so I should be happy.",
    segments: [
      { text: "Everything on the checklist is there, ", tone: "context" },
      { text: "so I should be happy.", tone: "emotional" },
    ],
  },
  {
    id: "properly-stop",
    start: 33,
    end: 43,
    text: "I didn't have time to properly stop. What I should have done was stop.",
    segments: [
      { text: "I didn't have time ", tone: "context" },
      { text: "to properly stop. ", tone: "emotional" },
      { text: "What I should have done was stop.", tone: "emotional" },
    ],
  },
  {
    id: "recover-time",
    start: 43,
    end: 51,
    text: "Four months. Five months. Half a year. Recover.",
    segments: [
      { text: "Four months. Five months. Half a year. ", tone: "context" },
      { text: "Recover.", tone: "emotional" },
    ],
  },
  {
    id: "recover-all",
    start: 51,
    end: 58,
    text: "Recover from the pain. Recover from the illnesses. Recover from all of it.",
    segments: [
      { text: "Recover from the ", tone: "context" },
      { text: "pain. ", tone: "emotional" },
      { text: "Recover from the ", tone: "context" },
      { text: "illnesses. ", tone: "emotional" },
      { text: "Recover from ", tone: "context" },
      { text: "all of it.", tone: "emotional" },
    ],
  },
  {
    id: "kept-going",
    start: 58,
    end: 65,
    text: "All those years of touring. All this stress. But I kept going.",
    segments: [
      { text: "All those years of touring. ", tone: "context" },
      { text: "All this stress. ", tone: "emotional" },
      { text: "But I kept going.", tone: "emotional" },
    ],
  },
] as const;

export default captionCues;
