// App.tsx

import "./App.css";
import List from "./components/List";
import { dummyTracks, type Track } from "./components/dummydata";
import { Box, Typography } from '@mui/material';
import SongDetails from "./components/SongDetails";
import { useState } from "react";

function App() {
  const [filterValue, setFilterValue] = useState("");
  const [filteredTracks, setFilteredTracks] = useState<Track[]>(dummyTracks);
  const [selectedSong, setSelectedSong] = useState<Track | null>(null);

  const handleFilterChange = (newValue: string) => {
    setFilterValue(newValue);
    applyFilter(newValue);
  };

  const applyFilter = (value: string) => {
    const filterValueLower = value.toLowerCase();
    const filtered = dummyTracks.filter((track) => {
      return (
        track.name.toLowerCase().includes(filterValueLower) ||
        track.artists.some((artist) => artist.name.toLowerCase().includes(filterValueLower)) ||
        track.album.name.toLowerCase().includes(filterValueLower)
      );
    });
    setFilteredTracks(filtered);
  };

  const handleSelectSong = (song: Track) => {
    setSelectedSong(song);
  };

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <input
        type="text"
        placeholder="Search songs by name, artist, or album"
        value={filterValue}
        onChange={(e) => handleFilterChange(e.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <SongDetails song={selectedSong} />
      <Typography variant="h4" component="h1" gutterBottom>
        List of Songs
      </Typography>
      <List items={filteredTracks} onSelect={handleSelectSong} />
    </Box>
  );
}

export default App;