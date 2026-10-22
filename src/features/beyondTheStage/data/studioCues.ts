export type StudioQuote = {
  id: string;
  lead?: string;
  quote: string;
};

const studioQuotes: StudioQuote[] = [
  {
    id: "guitar",
    quote: "“I love the sound of that guitar.”",
  },
  {
    id: "lamppost",
    lead: "“Under an old lamppost, I spoke your name.”",
    quote: "I like that part of “I spoke your name.” Although I'm not sold on the lamppost; I don't like how it sounds when singing it.",
  },
  {
    id: "better-day",
    lead: "“Wow! That sounds great. I also like the part about ‘for a better day’.”",
    quote: "“You know? I like that ‘it’s time for a better day.’ Yeah, that feels right...”",
  },
  {
    id: "stories",
    lead: "“On Stories, I’m exploring a lot more...”",
    quote: "“I’m stepping a bit out of the ordinary, trying new things I’ve never done before or experimented with. That’s why I do this.”",
  },
];

export default studioQuotes;
