
export interface Track {
    id: string;
    name: string;
    album: {
      name: string;
      images: { url: string }[];
    };
    artists: { name: string }[];
    duration_ms: number;
    image?: string; // Optional, as album images are already present
  }
  
  export const dummyTracks: Track[] = [
    {
      id: "1",
      name: "Song Title 1",
      album: {
        name: "Album Name 1",
        images: [{ url: "https://placehold.co/400x400/EEE/31343C?Text=Album+1" }],
      },
      artists: [{ name: "Artist 1" }],
      duration_ms: 180000, // 3 minutes in milliseconds
    },
    {
      id: "2",
      name: "Another Song 2",
      album: {
        name: "The Second Album",
        images: [{ url: "https://placehold.co/400x400/DDA/31343C?Text=Album+2" }],
      },
      artists: [{ name: "Singer Two" }, { name: "Band Name" }],
      duration_ms: 210500, // 3 minutes and 30.5 seconds
    },
    {
      id: "3",
      name: "Track Number Three",
      album: {
        name: "Third Time's the Charm",
        images: [{ url: "https://placehold.co/400x400/AAB/31343C?Text=Album+3" }],
      },
      artists: [{ name: "The Solo Artist" }],
      duration_ms: 245900, // 4 minutes and 5.9 seconds
    },
    {
      id: "4",
      name: "A Long One 4",
      album: {
        name: "Long Play Album",
        images: [{ url: "https://placehold.co/400x400/BCC/31343C?Text=Album+4" }],
      },
      artists: [{ name: "A Group of Musicians" }],
      duration_ms: 312100, // 5 minutes and 12.1 seconds
    },
    {
      id: "5",
      name: "Short Song 5",
      album: {
        name: "EP Number One",
        images: [{ url: "https://placehold.co/400x400/F0F/31343C?Text=Album+5" }],
      },
      artists: [{ name: "One Person" }],
      duration_ms: 95300, // 1 minute and 35.3 seconds
    },
  ];
