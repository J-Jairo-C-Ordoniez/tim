export type GalleryPhoto = {
  src: string;
  alt: string;
};

export const lastShowData = {
  title: "AVICII",
  columnsBefore: [
    [
      { src: "/galleryPhoto1.webp", alt: "Avicii live on stage at Ushuaïa" },
      { src: "/galleryPhoto2.webp", alt: "Crowd hands raised at Ushuaïa" },
      { src: "/galleryPhoto3.webp", alt: "Vibrant stage lighting and energy" },
    ],
    [
      { src: "/galleryPhoto4.webp", alt: "Ibiza crowd celebrating the music" },
      { src: "/galleryPhoto5.jpg", alt: "Tim Bergling performing at the deck" },
      { src: "/galleryPhoto6.jpg", alt: "Spectacular stage atmosphere" },
    ],
    [
      { src: "/galleryPhoto7.webp", alt: "Golden hour sunset in Ibiza" },
      { src: "/galleryPhoto8.webp", alt: "DJ booth overlooking the festival" },
    ],
  ],
  centerpiece: {
    tag: "THE LAST SHOW",
    title: "USHUAÏA IBIZA",
    date: "/28 AUGUST",
    year: "2016 · FINAL PERFORMANCE",
    src: "/galleryPhotoMain.jpeg",
    alt: "Avicii's historic final live performance at Ushuaïa Ibiza",
    description:
      "On August 28, 2016, Tim Bergling played his farewell live set under the Mediterranean sky, closing a legendary touring era with unforgettable energy and gratitude.",
  },
  columnsAfter: [
    [
      { src: "/galleryPhoto9.webp", alt: "Laser production and visual celebration" },
      { src: "/galleryPhoto10.webp", alt: "Stage fireworks and grand finale" },
      { src: "/galleryPhoto11.webp", alt: "Emotional farewell moment with the crowd" },
    ],
    [
      { src: "/galleryPhoto12.webp", alt: "Friends and crew gathered on stage" },
      { src: "/galleryPhoto13.webp", alt: "Tim smiling at the audience" },
      { src: "/galleryPhoto14.webp", alt: "The final bow of a touring icon" },
    ],
  ],
  memorial: {
    kicker: "August 28, 2016 · Ushuaïa Ibiza",
    quote: "“I couldn’t have asked for a better last show.”",
    caption: "The music stopped. The legacy became eternal.",
  },
};
