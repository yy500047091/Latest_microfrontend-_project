export interface Artist {
  name: string;
}

export interface Album {
  name: string;
  images: { url: string }[];
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  duration_ms: number;
}

export const dummyTracks: Track[] = [
  {
    id: "1",
    name: "Bohemian Rhapsody",
    album: { name: "A Night at the Opera", images: [{ url: "https://placehold.co/400x400/444/FFF?Text=Night+at+the+Opera" }] },
    artists: [{ name: "Queen" }],
    duration_ms: 355000,
  },
  {
    id: "2",
    name: "Smells Like Teen Spirit",
    album: { name: "Nevermind", images: [{ url: "https://placehold.co/400x400/333/FFF?Text=Nevermind" }] },
    artists: [{ name: "Nirvana" }],
    duration_ms: 301000,
  },
  {
    id: "3",
    name: "Hotel California",
    album: { name: "Hotel California", images: [{ url: "https://placehold.co/400x400/222/FFF?Text=Hotel+California" }] },
    artists: [{ name: "Eagles" }],
    duration_ms: 390000,
  },
  {
    id: "4",
    name: "Like a Rolling Stone",
    album: { name: "Highway 61 Revisited", images: [{ url: "https://placehold.co/400x400/111/FFF?Text=Highway+61" }] },
    artists: [{ name: "Bob Dylan" }],
    duration_ms: 369000,
  },
  {
    id: "5",
    name: "Imagine",
    album: { name: "Imagine", images: [{ url: "https://placehold.co/400x400/555/FFF?Text=Imagine" }] },
    artists: [{ name: "John Lennon" }],
    duration_ms: 181000,
  },
  {
    id: "6",
    name: "Stairway to Heaven",
    album: { name: "Led Zeppelin IV", images: [{ url: "https://placehold.co/400x400/666/FFF?Text=Led+Zeppelin+IV" }] },
    artists: [{ name: "Led Zeppelin" }],
    duration_ms: 482000,
  },
  {
    id: "7",
    name: "Billie Jean",
    album: { name: "Thriller", images: [{ url: "https://placehold.co/400x400/777/FFF?Text=Thriller" }] },
    artists: [{ name: "Michael Jackson" }],
    duration_ms: 294000,
  },
  {
    id: "8",
    name: "Yesterday",
    album: { name: "Help!", images: [{ url: "https://placehold.co/400x400/888/FFF?Text=Help!" }] },
    artists: [{ name: "The Beatles" }],
    duration_ms: 125000,
  },
  {
    id: "9",
    name: "Good Vibrations",
    album: { name: "Smiley Smile", images: [{ url: "https://placehold.co/400x400/999/FFF?Text=Smiley+Smile" }] },
    artists: [{ name: "The Beach Boys" }],
    duration_ms: 217000,
  },
  {
    id: "10",
    name: "Johnny B. Goode",
    album: { name: "Chuck Berry's Golden Hits", images: [{ url: "https://placehold.co/400x400/aaa/FFF?Text=Golden+Hits" }] },
    artists: [{ name: "Chuck Berry" }],
    duration_ms: 161000,
  },
  {
    id: "11",
    name: "Sweet Child o' Mine",
    album: { name: "Appetite for Destruction", images: [{ url: "https://placehold.co/400x400/bbb/FFF?Text=Appetite" }] },
    artists: [{ name: "Guns N' Roses" }],
    duration_ms: 355000,
  },
  {
    id: "12",
    name: "Hey Jude",
    album: { name: "Hey Jude", images: [{ url: "https://placehold.co/400x400/ccc/FFF?Text=Hey+Jude" }] },
    artists: [{ name: "The Beatles" }],
    duration_ms: 431000,
  },
  {
    id: "13",
    name: "Like a Prayer",
    album: { name: "Like a Prayer", images: [{ url: "https://placehold.co/400x400/ddd/FFF?Text=Like+a+Prayer" }] },
    artists: [{ name: "Madonna" }],
    duration_ms: 339000,
  },
  {
    id: "14",
    name: "Born to Run",
    album: { name: "Born to Run", images: [{ url: "https://placehold.co/400x400/eee/FFF?Text=Born+to+Run" }] },
    artists: [{ name: "Bruce Springsteen" }],
    duration_ms: 271000,
  },
  {
    id: "15",
    name: "Hound Dog",
    album: { name: "Elvis' Golden Records", images: [{ url: "https://placehold.co/400x400/fff/000?Text=Golden+Records" }] },
    artists: [{ name: "Elvis Presley" }],
    duration_ms: 136000,
  },
  {
    id: "16",
    name: "I Want to Hold Your Hand",
    album: { name: "Meet the Beatles!", images: [{ url: "https://placehold.co/400x400/a00/FFF?Text=Meet+Beatles" }] },
    artists: [{ name: "The Beatles" }],
    duration_ms: 146000,
  },
  {
    id: "17",
    name: "Yesterday Once More",
    album: { name: "The Singles 1969–1973", images: [{ url: "https://placehold.co/400x400/b00/FFF?Text=Singles+1969" }] },
    artists: [{ name: "Carpenters" }],
    duration_ms: 235000,
  },
  {
    id: "18",
    name: "No Woman No Cry",
    album: { name: "Natty Dread", images: [{ url: "https://placehold.co/400x400/c00/FFF?Text=Natty+Dread" }] },
    artists: [{ name: "Bob Marley & The Wailers" }],
    duration_ms: 435000,
  },
  {
    id: "19",
    name: "Wonderwall",
    album: { name: "(What's the Story) Morning Glory?", images: [{ url: "https://placehold.co/400x400/d00/FFF?Text=Morning+Glory" }] },
    artists: [{ name: "Oasis" }],
    duration_ms: 258000,
  },
  {
    id: "20",
    name: "Dancing Queen",
    album: { name: "Arrival", images: [{ url: "https://placehold.co/400x400/e00/FFF?Text=Arrival" }] },
    artists: [{ name: "ABBA" }],
    duration_ms: 230000,
  },
  // Adding a lot more mock data
  ...Array.from({ length: 980 }, (_, i) => ({
    id: `song-${i + 21}`,
    name: `Song Title ${i + 21}`,
    album: { name: `Album ${Math.floor((i + 21) / 5)}`, images: [{ url: `https://placehold.co/400x400/${(i + 21) % 256}/${255 - ((i + 21) % 256)}?Text=Album+${Math.floor((i + 21) / 5)}` }] },
    artists: [{ name: `Artist ${Math.floor((i + 21) / 10)}` }],
    duration_ms: Math.floor(Math.random() * 300000) + 120000, // Random duration
  })),
];